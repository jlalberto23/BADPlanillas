<?php

namespace App\Http\Controllers\Catalogs;

use App\Http\Controllers\Controller;
use App\Models\Catalogs\Departamentoempresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DepartamentoEmpresaController extends Controller
{
	public function index(Request $request)
	{
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = strtolower($request->get('search', ''));

		$query = Departamentoempresa::select()->withCount('empleados');

		if ($search !== '') {
			$query->where('nombreDepto', 'like', "%$search%");
		}

		try {
			$departamentosEmpresa = $query
				->orderBy('nombreDepto')
				->paginate($perPage, ['*'], 'page', $page);
			return Inertia::render('catalogs/departamentosEmpresa/index', ['departamentosEmpresa' => $departamentosEmpresa]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar los departamentos de la empresa']);
		}
	}

	public function store(Request $request)
	{
		$request->validate([
			'nombreDepto' => ['required', 'string', 'min:1', 'max:100', 'unique:departamentoEmpresa,nombreDepto']
		]);

		try {
			$departamentosEmpresa = Departamentoempresa::create($request->only('nombreDepto'));
			return back()->with('success', 'Departamento creado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al crear el departamento']);
		}
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'nombreDepto' => ['required', 'string', 'min:1', 'max:100', "unique:departamentoEmpresa,nombreDepto,{$id},id_deptoEmpresa"]
		]);

		try {
			$departamentosEmpresa = Departamentoempresa::findOrFail($id);
			$departamentosEmpresa->update($request->only('nombreDepto'));
			return back()->with('success', 'Departamento actualizado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al actualizar el departamento']);
		}
	}

	public function destroy($id)
	{
		try {
			$departamentosEmpresa = Departamentoempresa::findOrFail($id);

			if ($departamentosEmpresa->empleados()->exists()) {
				return back()->withErrors(['message' => 'No se puede eliminar el departamento on porque tiene empleados asociados']);
			}

			$departamentosEmpresa->delete();
			return back()->with('success', 'Departamento eliminado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al eliminar el departamento']);
		}
	}

	public function getDepartamentos()
	{
		$departamentosEmpresa = Departamentoempresa::all();
		return response()->json($departamentosEmpresa);
	}
}