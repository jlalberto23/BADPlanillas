<?php

namespace App\Http\Controllers\Catalogs;

use App\Http\Controllers\Controller;
use App\Models\Catalogs\Profesion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProfesionController extends Controller
{
	public function index(Request $request)
	{
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = strtolower($request->get('search', ''));

		$query = Profesion::select()->withCount('empleados');

		if ($search !== '') {
			$query->where('nombreProfesion', 'like', "%$search%");
		}

		try {
			$profesiones = $query
				->orderBy('nombreProfesion')
				->paginate($perPage, ['*'], 'page', $page);
			return Inertia::render('catalogs/profesiones/index', ['profesiones' => $profesiones]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar las profesiones']);
		}
	}

	public function store(Request $request)
	{
		$request->validate([
			'nombreProfesion' => ['required', 'string', 'min:1', 'max:100', 'unique:profesiones,nombreProfesion']
		]);

		try {
			$profesion = Profesion::create($request->only('nombreProfesion'));
			return back()->with('success', 'Profesión creada correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al crear la profesión']);
		}
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'nombreProfesion' => ['required', 'string', 'min:1', 'max:100', "unique:profesiones,nombreProfesion,{$id},id_profesion"]
		]);

		try {
			$profesion = Profesion::findOrFail($id);
			$profesion->update($request->only('nombreProfesion'));
			return back()->with('success', 'Profesión actualizada correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al actualizar la profesión']);
		}
	}

	public function destroy($id)
	{
		try {
			$profesion = Profesion::findOrFail($id);

			if ($profesion->empleados()->exists()) {
				return back()->withErrors(['message' => 'No se puede eliminar la profesión porque tiene empleados asociados']);
			}

			$profesion->delete();
			return back()->with('success', 'Profesión eliminada correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al eliminar la profesión']);
		}
	}

	public function getProfesiones()
	{
		$profesiones = Profesion::all();
		return response()->json($profesiones);
	}
}
