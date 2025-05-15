<?php

namespace App\Http\Controllers\Catalogs;

use App\Http\Controllers\Controller;
use App\Models\Catalogs\Empleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EmpleadoController extends Controller
{
	public function index(Request $request)
	{
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = trim(strtolower($request->get('search', '')));

		$query = Empleado::select()->with('profesion');

		if (str_contains($search, 'profesion:')) {
			$search = trim(str_replace('profesion:', '', $search));
			if ($search !== '') {
				$query->whereHas('profesion', function ($q) use ($search) {
					$q->whereLike('nombreProfesion', "%$search%");
				});
			} else {
				$query->whereDoesntHave('profesion');
			}
		} else if ($search !== '') {
			$query->where(function ($q) use ($search) {
				$q->whereLike('primer_nombre', "%$search%")
					->orWhereLike('segundo_nombre', "%$search%")
					->orWhereLike('apellido_paterno', "%$search%")
					->orWhereLike('apellido_materno', "%$search%")
					->orWhereLike('carnet_empleado', "%$search%");
			});
		}

		try {
			$empleados = $query
				->orderBy('carnet_empleado')
				->paginate($perPage, ['*'], 'page', $page);
			return Inertia::render('catalogs/empleados/index', ['empleados' => $empleados]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar los empleados']);
		}
	}
}
