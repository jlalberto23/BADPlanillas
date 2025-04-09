<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
	public function show(Request $request)
	{
		$users = [];
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
		return Inertia::render('admin/users/users-page', ['usersPaginated' => $usersPaginated]);
	}
}
