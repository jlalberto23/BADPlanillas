<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\Payroll\AnioCalendario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AnioController extends Controller
{
	public function index(Request $request)
	{
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = $request->get('search', '');

		$query = AnioCalendario::select()->withCount('planillas');

		if ($search !== '') {
			$query->where('anio', 'like', "%$search%");
		}

		try {
			$anios = $query
				->orderBy('anio', 'desc')
				->paginate($perPage, ['*'], 'page', $page);
			return Inertia::render('payroll/anios/index', ['anios' => $anios]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar los años']);
		}
	}

	public function store(Request $request)
	{
		$request->validate([
			'anio' => ['required', 'integer', 'min:2000', 'max:2100', 'unique:anio_calendario,anio'],
			'fecha_inicio' => ['required', 'date'],
			'fecha_fin' => ['required', 'date', 'after:fecha_inicio'],
		]);

		try {
			$anio = AnioCalendario::create($request->only([
				'anio',
				'fecha_inicio',
				'fecha_fin',
			]));
			return back()->with('success', 'Año creado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al crear el año']);
		}
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'anio' => ['required', 'integer', 'min:2000', 'max:2100', "unique:anio_calendario,anio,{$id},id_anio"],
			'fecha_inicio' => ['required', 'date'],
			'fecha_fin' => ['required', 'date', 'after:fecha_inicio'],
		]);

		try {
			$anio = AnioCalendario::findOrFail($id);
			$anio->update($request->only([
				'anio',
				'fecha_inicio',
				'fecha_fin',
			]));
			return back()->with('success', 'Año actualizado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al actualizar el año']);
		}
	}

	public function destroy($id)
	{
		try {
			$anio = AnioCalendario::findOrFail($id);

			if ($anio->planillas()->exists()) {
				return back()->withErrors(['message' => 'No se puede eliminar el año porque tiene planillas asociadas']);
			}

			$anio->delete();
			return back()->with('success', 'Año eliminado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al eliminar el año']);
		}
	}

	public function getAnios()
	{
		$anios = AnioCalendario::orderBy('anio', 'desc')->get();
		return response()->json($anios);
	}
}
