<?php

namespace App\Http\Controllers\Catalogs;

use App\Http\Controllers\Controller;
use App\Models\Catalogs\Areaempresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AreaController extends Controller
{
	public function index(Request $request)
	{
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = strtolower($request->get('search', ''));

		$query = Areaempresa::select()->withCount('areaEmpresa');

		if ($search !== '') {
			$query->where('nombreArea', 'like', "%$search%");
		}

		try {
			$areas = $query
				->orderBy('nombreArea')
				->paginate($perPage, ['*'], 'page', $page);
			return Inertia::render('catalogs/Areas/index', ['areas' => $areas]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar los puestos']);
		}
	}

	public function store(Request $request)
	{
		$request->validate([
			'nombreArea' => ['required', 'string', 'min:1', 'max:100', 'unique:areaEmpresa,nombreArea']
		]);

		try {
			$areas = Areaempresa::create($request->only('nombreArea'));
			return back()->with('success', 'Area creada correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al crear el area']);
		}
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'nombreArea' => ['required', 'string', 'min:1', 'max:100', "unique:areaEmpresa,nombreArea,{$id},id_area"]
		]);

		try {
			$areas = Areaempresa::findOrFail($id);
			$areas->update($request->only('nombreArea'));
			return back()->with('success', 'Area actualizada correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al actualizar el area']);
		}
	}

	public function destroy($id)
	{
		try {
			$areas = Areaempresa::findOrFail($id);

			if ($areas->empleados()->exists()) {
				return back()->withErrors(['message' => 'No se puede eliminar el area porque tiene empleados asociados']);
			}

			$areas->delete();
			return back()->with('success', 'Area eliminado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al eliminar el area']);
		}
	}

	public function getAreas()
	{
		$areas = Areaempresa::all();
		return response()->json($areas);
	}
}

