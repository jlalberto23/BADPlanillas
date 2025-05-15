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

		$query = Empleado::select()->with(['profesion', 'puesto', 'seccion', 'area', 'area.departamento']);
		$query = $this->applySearchFilter($query, $search);

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

	private function applySearchFilter($query, $search)
	{
		$searchFilters = [
			'profesion' => [
				'relation' => 'profesion',
				'field' => 'nombreProfesion'
			],
			'puesto' => [
				'relation' => 'puesto',
				'field' => 'nombrePuesto'
			],
			'seccion' => [
				'relation' => 'seccion',
				'field' => 'nombreSeccion'
			],
			'area' => [
				'relation' => 'area',
				'field' => 'nombreArea'
			],
			'departamento' => [
				'relation' => 'area.departamento',
				'field' => 'nombreDepto'
			]
		];

		foreach ($searchFilters as $prefix => $config) {
			if (str_contains($search, $prefix . ':')) {
				$searchTerm = trim(str_replace($prefix . ':', '', $search));

				if ($searchTerm !== '') {
					return $query->whereHas($config['relation'], function ($q) use ($searchTerm, $config) {
						$q->whereLike($config['field'], "%$searchTerm%");
					});
				}

				return $query->whereDoesntHave($config['relation']);
			}
		}

		if ($search !== '') {
			return $query->where(function ($q) use ($search) {
				$q->whereLike('primer_nombre', "%$search%")
					->orWhereLike('segundo_nombre', "%$search%")
					->orWhereLike('apellido_paterno', "%$search%")
					->orWhereLike('apellido_materno', "%$search%")
					->orWhereLike('carnet_empleado', "%$search%");
			});
		}

		return $query;
	}
}
