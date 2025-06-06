<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
	public function showAll(Request $request)
	{
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = strtolower($request->get('search', ''));

		$conditions = [
			'is:verified' => fn($query) => $query->whereNotNull('email_verified_at'),
			'-is:verified' => fn($query) => $query->whereNull('email_verified_at'),
			'has:sessions' => fn($query) => $query->whereHas('sessions'),
			'-has:sessions' => fn($query) => $query->whereDoesntHave('sessions'),
		];

		$specialCases = [
			'role:' => function ($query, $value) {
				if ($value !== '') $query->role($value);
			},
		];

		$query = User::select()->withCount('sessions');

		// Verificar si es un caso especial
		$isSpecialCase = false;
		foreach ($specialCases as $prefix => $handler) {
			if (str_starts_with($search, $prefix)) {
				$value = trim(substr($search, strlen($prefix)));
				$handler($query, $value);
				$isSpecialCase = true;
				break;
			}
		}

		// Si no es un caso especial, aplicar condiciones normales
		if (!$isSpecialCase) {
			if (array_key_exists($search, $conditions)) {
				$conditions[$search]($query);
			} elseif ($search != '') {
				$query->where(function ($q) use ($search) {
					$q->where("email", 'like', "%$search%")
						->orWhere("name", 'like', "%$search%");
				});
			}
		}

		try {
			$usersPaginated = $query
				->orderBy('name')
				->paginate($perPage, ['*'], 'page', $page);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
		}
		return Inertia::render('admin/users/users-page/users-page', ['usersPaginated' => $usersPaginated]);
	}

	public function show($id)
	{
		try {
			$user = User::with('roles:id,name,description')
				->withCount('sessions')
				->find($id);

			$roles = Role::select('id', 'name', 'description')->get();

			return Inertia::render('admin/users/user-page/user-page', [
				'user' => $user,
				'roles' => $roles
			]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar el usuario']);
		}
	}

	public function create(Request $request)
	{
		$request->validate([
			'name' => ['required', 'string', 'min:1', 'max:25'],
			'email' => ['required', 'string', 'min:1', 'max:25', 'email'],
			'password' => ['required', 'string']
		]);
		$sendMessageError = false;

		$passwordValidation = [
			[
				'message' => 'La contraseña debe tener al menos 8 caracteres',
				'isValid' => strlen($request->password) >= 8
			],
			[
				'message' => 'La contraseña debe iniciar con una letra',
				'isValid' => preg_match('/^[A-Za-z]/', $request->password)
			],
			[
				'message' => 'La contraseña debe contener al menos una mayúscula',
				'isValid' => preg_match('/[A-Z]/', $request->password)
			],
			[
				'message' => 'La contraseña debe contener al menos un símbolo especial',
				'isValid' => preg_match('/[^A-Za-z0-9]/', $request->password)
			],
			[
				'message' => 'Las contraseñas no coinciden',
				'isValid' => $request->password === $request->password_confirmation
			]
		];

		$failedRules = collect($passwordValidation)->filter(fn($rule) => !$rule['isValid'])->pluck('message');

		if ($failedRules->isNotEmpty()) {
			return back()->withErrors(['message' => $failedRules->implode(', ')]);
		}

		try {
			if (User::whereLike('email', $request->input('email'))->exists()) {
				$sendMessageError =  true;
				throw new \Exception('Ya existe un usuario con ese correo');
			}

			$user = User::create([
				'name' => $request->name,
				'email' => $request->email,
				'password' => Hash::make($request->password),
			]);

			return redirect(route('user.show', ['id' => $user->id]));
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			$message = $sendMessageError ? $th->getMessage() : "Error al actualizar el rol";
			return back()->withErrors(['message' => $message]);
		}
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'name' => ['required', 'string', 'min:1', 'max:50'],
			'email' => ['required', 'string', 'min:1', 'max:50', 'email']
		]);
		$sendMessageError = false;

		try {

			if (User::whereLike('email', $request->input('email'))->where('id', '!=', $id)->exists()) {
				$sendMessageError =  true;
				throw new \Exception('Ya existe un usuario con ese correo');
			}

			$user = User::select('id')->find($id);
			if (!$user) {
				$sendMessageError = true;
				throw new \Exception('Rol no encontrado');
			}
			$user->update($request->only('name', 'email'));
			return back();
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			$message = $sendMessageError ? $th->getMessage() : "Error al actualizar el rol";
			return back()->withErrors(['message' => $message]);
		}
	}

	public function destroy($id)
	{
		try {
			if (!User::where('id', $id)->exists()) {
				throw new \Exception('Usuario no encontrado');
			}
			User::where('id', $id)->delete();
			return back()->with('success', 'Usuario eliminado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al eliminar el usuario']);
		}
	}

	public function syncroles(Request $request, $id)
	{
		$request->validate([
			'roles' => ['required', 'array'],
			'roles.*' => ['required', 'exists:roles,id']
		]);

		try {
			$user = User::findOrFail($id);
			$user->syncRoles($request->roles);
			return back()->with('success', 'Roles actualizados correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al actualizar los roles del usuario']);
		}
	}
}
