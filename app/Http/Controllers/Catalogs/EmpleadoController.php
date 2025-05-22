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

	public function registrar()
	{
		return Inertia::render('catalogs/empleados/registrarEmpleado');
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

	public function store(Request $request)
	{
		$validated = $request->validate([
			'primer_nombre' => 'required|string|max:255',
			'segundo_nombre' => 'nullable|string|max:255',
			'apellido_paterno' => 'required|string|max:255',
			'apellido_materno' => 'required|string|max:255',
			'apellido_casada' => 'nullable|string|max:255',
			'fecha_nacimiento' => 'required|date',
			'fecha_ingreso' => 'required|date',
			'tipo_documento' => 'required|string|in:DUI,Pasaporte,Otro',
			'numero_documento' => 'nullable|string|max:50',
			'dui' => 'nullable|string|max:10',
			'nit' => 'nullable|string|max:17',
			'codigo_isss' => 'nullable|string|max:20',
			'codigo_nup' => 'nullable|string|max:20',
			'salario_base' => 'required|numeric|min:0',
			'estado_civil' => 'required|string|in:soltero,casado,divorciado,viudo',
			'sexo' => 'required|string|in:M,F',
			'correo_personal' => 'nullable|email|max:255',
			'correo_institucional' => 'nullable|email|max:255',
			'estado' => 'required|string|in:activo,inactivo',
			'carnet_empleado' => 'nullable|string|max:20',
			'id_profesion' => 'nullable|exists:profesiones,id_profesion',
		]);

		Empleado::create($validated);

		return redirect()->route('catalogs.empleados.index')->with('success', 'Empleado registrado correctamente.');
	}
}
