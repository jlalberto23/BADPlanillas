<?php

namespace App\Http\Controllers\Catalogs;

use App\Http\Controllers\Controller;
use App\Models\Catalogs\Puesto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PuestoController extends Controller
{
	public function index(Request $request)
	{
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = strtolower($request->get('search', ''));

		$query = Puesto::select()->withCount('empleados');

		if ($search !== '') {
			$query->where('nombrePuesto', 'like', "%$search%");
		}

		try {
			$puestos = $query
				->orderBy('nombrePuesto')
				->paginate($perPage, ['*'], 'page', $page);
			return Inertia::render('catalogs/puestos/index', ['puestos' => $puestos]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar los puestos']);
		}
	}

	public function store(Request $request)
	{
		$request->validate([
			'nombrePuesto' => ['required', 'string', 'min:1', 'max:100', 'unique:puestos,nombrePuestos']
		]);

		try {
			$puestos = Puesto::create($request->only('nombrePuesto'));
			return back()->with('success', 'Puesto creado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al crear la profesión']);
		}
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'nombrePuesto' => ['required', 'string', 'min:1', 'max:100', "unique:puestos,nombrePuestos,{$id},id_puesto"]
		]);

		try {
			$puestos = Puesto::findOrFail($id);
			$puestos->update($request->only('nombrePuesto'));
			return back()->with('success', 'Puesto actualizado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al actualizar el puesto']);
		}
	}

	public function destroy($id)
	{
		try {
			$puestos = Puesto::findOrFail($id);

			if ($puestos->empleados()->exists()) {
				return back()->withErrors(['message' => 'No se puede eliminar el puesto porque tiene empleados asociados']);
			}

			$puestos->delete();
			return back()->with('success', 'Puesto eliminado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al eliminar el puesto']);
		}
	}

	public function getPuestos()
	{
		$puestos = Puesto::all();
		return response()->json($puestos);
	}
}
