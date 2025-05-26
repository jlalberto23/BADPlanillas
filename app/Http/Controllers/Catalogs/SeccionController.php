<?php

namespace App\Http\Controllers\Catalogs;

use App\Http\Controllers\Controller;
use App\Models\Catalogs\Seccionempresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SeccionController extends Controller
{
	public function index(Request $request)
	{
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = strtolower($request->get('search', ''));

		$query = Seccionempresa::select()->withCount('empleados');

		if ($search !== '') {
			$query->where('nombreSeccion', 'like', "%$search%");
		}

		try {
			$seccionesEmpresa = $query
				->orderBy('nombreSeccion')
				->paginate($perPage, ['*'], 'page', $page);
			return Inertia::render('catalogs/secciones/index', ['secciones' => $seccionesEmpresa]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar las secciones de la empresa']);
		}
	}

	public function store(Request $request)
	{
		$request->validate([
			'nombreSeccion' => ['required', 'string', 'min:1', 'max:100', 'unique:seccionEmpresa,nombreSeccion']
		]);

		try {
			$seccionesEmpresa = Seccionempresa::create($request->only('nombreSeccion'));
			return back()->with('success', 'Seccion creada correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al crear la seccion']);
		}
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'nombreSeccion' => ['required', 'string', 'min:1', 'max:100', "unique:seccionEmpresa,nombreSeccion,{$id},id_seccion"]
		]);

		try {
			$seccionesEmpresa = Seccionempresa::findOrFail($id);
			$seccionesEmpresa->update($request->only('nombreSeccion'));
			return back()->with('success', 'Seccion actualizada correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al actualizar la seccion']);
		}
	}

	public function destroy($id)
	{
		try {
			$seccionesEmpresa = Seccionempresa::findOrFail($id);

			if ($seccionesEmpresa->empleados()->exists()) {
				return back()->withErrors(['message' => 'No se puede eliminar la seccion porque tiene empleados asociados']);
			}

			$seccionesEmpresa->delete();
			return back()->with('success', 'Seccion eliminada correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al eliminar la seccion']);
		}
	}

	public function getSecciones()
	{
		$seccionesEmpresa = Seccionempresa::all();
		return response()->json($seccionesEmpresa);
	}
}
