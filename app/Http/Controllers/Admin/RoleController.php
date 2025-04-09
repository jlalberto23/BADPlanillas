<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
				if ($value !== '') $query->permission($value);
			},
		];

		$query = Role::select();

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
			$role = Role::findById($id);
		} catch (\Throwable $th) {
			$role = null;
			Log::error($th->getMessage());
		}

		return Inertia::render('admin/roles/role-page/role-page', ['role' => $role]);
	}
}
