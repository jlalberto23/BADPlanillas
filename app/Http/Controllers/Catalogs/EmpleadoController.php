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
			'segundo_nombre' => 'required|string|max:255',
			'apellido_paterno' => 'required|string|max:255',
			'apellido_materno' => 'required|string|max:255',
			'apellido_casada' => 'nullable|string|max:255',
			'fecha_nacimiento' => 'required|date',
			'fecha_ingreso' => 'required|date',
			'tipo_documento' => 'required|string|in:DUI,Pasaporte,Otro',
			'numero_documento' => 'nullable|required_if:tipo_documento,Pasaporte,Otro|string|max:20',
			'dui' => 'nullable|required_if:tipo_documento,DUI|string|size:9|unique:empleados,dui',
			'nit' => 'required|string|max:14|unique:empleados,nit',
			'codigo_isss' => 'required|string|max:9|unique:empleados,codigo_isss',
			'codigo_nup' => 'required|string|max:9|unique:empleados,codigo_nup',
			'salario_base' => 'required|numeric|min:0|max:999999.99',
			'estado_civil' => 'required|string|in:soltero,casado,divorciado,viudo',
			'sexo' => 'required|string|size:1|in:M,F,O',
			'correo_personal' => 'required|email|max:255|unique:empleados,correo_personal',
			'correo_institucional' => 'required|email|max:255|unique:empleados,correo_institucional',
			'estado' => 'required|string|in:activo,inactivo',
			'carnet_empleado' => 'required|string|max:255|unique:empleados,carnet_empleado',
			'id_profesion' => 'nullable|exists:profesiones,id_profesion',
			'id_puesto' => 'nullable|exists:puestos,id_puesto',
			'id_seccion' => 'nullable|exists:seccionEmpresa,id_seccion',
//			'id_deptoEmpresa' => 'nullable|exists:departamentoEmpresa,id_deptoEmpresa',
		]);
		try {
			Empleado::create($validated);
			return redirect()->route('catalogs.empleados.index')->with('success', 'Empleado registrado correctamente.');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al registrar el empleado']);
		}
	}
}
