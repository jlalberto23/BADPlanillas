<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SessionController extends Controller
{
	public function show(Request $request)
	{
		$sessionsPaginated = [];
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = strtolower($request->get('search', ''));

		$conditions = [
			'has:user' => fn($query) => $query->whereNotNull('user_id'),
			'-has:user' => fn($query) => $query->whereNull('user_id'),
		];

		$specialCases = [
			'ip:' => function ($query, $value) {
				if ($value !== '') $query->where('ip_address', 'like', "%$value%");
				else $query->whereNull('ip_address');
			},
			'agent:' => function ($query, $value) {
				if ($value !== '') $query->where('user_agent', 'like', "%$value%");
				else $query->whereNull('user_agent');
			},
		];


		$query = Session::select('id', 'ip_address', 'last_activity', 'user_agent', 'user_id')->with('user:id,email,name')
			->orderBy('last_activity', 'desc');

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
				$query->whereHas('user', function ($q) use ($search) {
					$q->where("email", 'like', "%$search%")
						->orWhere("name", 'like', "%$search%");
				});
			}
		}

		try {
			$sessionsPaginated = $query
				->paginate($perPage, ['*'], 'page', $page);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
		}
		return Inertia::render('admin/sessions/sessions-page', ['sessionsPaginated' => $sessionsPaginated]);
	}
}
