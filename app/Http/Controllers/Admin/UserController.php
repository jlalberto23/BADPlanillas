<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

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
		} catch (\Throwable $th) {
			$user = null;
			Log::error($th->getMessage());
		}

		return Inertia::render('admin/users/user-page/user-page', ['user' => $user]);
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'name' => ['required', 'string', 'min:1', 'max:25'],
			'email' => ['required', 'string', 'min:1', 'max:25', 'email']
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
}
