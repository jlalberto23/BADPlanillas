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
	public function show(Request $request)
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

	public function showById(Request $request, $id)
	{
		try {
			$role = Role::with('permissions:id,name,description')->find($id);
		} catch (\Throwable $th) {
			$role = null;
			Log::error($th->getMessage());
		}

		return Inertia::render('admin/roles/role-page/role-page', ['role' => $role]);
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'name' => ['required', 'string', 'min:1', 'max:25'],
			'description' => ['required', 'string', 'min:1', 'max:255']
		]);
		$sendMessageError = false;
		try {
			$role = Role::with('permissions:id,name,description')->find($id);
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
}
