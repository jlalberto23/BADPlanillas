<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
	public function showAll(Request $request)
	{
		$rolesPaginated = [];
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = strtolower($request->get('search', ''));

		$conditions = [];

		$specialCases = [
			'permission:' => function ($query, $value) {
				if ($value !== '') $query->whereHas('permissions', function ($query) use ($value) {
					$query->where('description', 'like', "%$value%");
				});
			},
		];

		$query = Role::select()->with('permissions:id,name,description');

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
			$rolesPaginated = $query
				->orderBy('name')
				->paginate($perPage, ['*'], 'page', $page);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
		}
		return Inertia::render('admin/roles/roles-page/roles-page', ['rolesPaginated' => $rolesPaginated]);
	}

	public function show($id)
	{
		try {
			$role = Role::with('permissions:id,name,description')->find($id);
		} catch (\Throwable $th) {
			$role = null;
			Log::error($th->getMessage());
		}

		return Inertia::render('admin/roles/role-page/role-page', ['role' => $role]);
	}

	public function create(Request $request)
	{
		$request->validate([
			'name' => ['required', 'string', 'min:1', 'max:50', 'unique:roles,name'],
			'description' => ['required', 'string', 'min:1', 'max:255']
		]);

		$sendMessageError = false;

		try {

			$role = Role::create([
				'name' => $request->input('name'),
				'description' => $request->input('description')
			]);

			return redirect(route('role.show', ['id' => $role->id]));
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			$message = $sendMessageError ? $th->getMessage() : "Error al crear el rol";
			return back()->withErrors(['message' => $message]);
		}
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'name' => ['required', 'string', 'min:1', 'max:50'],
			'description' => ['required', 'string', 'min:1', 'max:255']
		]);
		$sendMessageError = false;

		try {

			if (Role::whereLike('name', $request->input('name'))->where('id', '!=', $id)->exists()) {
				$sendMessageError =  true;
				throw new Exception('Ya existe un rol con ese nombre');
			}

			$role = Role::select('id')->find($id);
			if (!$role) {
				$sendMessageError = true;
				throw new Exception('Rol no encontrado');
			}
			$role->update($request->only('name', 'description'));
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
			if (!Role::where('id', $id)->exists()) {
				throw new Exception('Rol no encontrado');
			}
			Role::where('id', $id)->delete();
			return back()->with('success', 'Rol eliminado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al eliminar el rol']);
		}
	}

	public function syncPermissions(Request $request, $id)
	{
		$request->validate([
			'permissions' => 'required|array',
			'permissions.*' => 'string',
		]);

		$sendMessageError = false;

		try {
			if (!Role::where('id', $id)->exists()) {
				throw new Exception('Rol no encontrado');
			}
			$role = Role::select('id')->find($id);
			try {
				$role->syncPermissions($request->get('permissions')); //todo: Probar con permisos reales
			} catch (\Throwable $th) {
				Log::error($th->getMessage());
				$sendMessageError = true;
				throw new Exception('Error al guardar los permisos');
			}
		} catch (\Throwable $th) {
			if (!$sendMessageError) {
				Log::error($th->getMessage());
			}
			$message = $sendMessageError ? $th->getMessage() : "Error al actualizar el rol";
			return back()->withErrors(['message' => $message]);
		}
	}
}
