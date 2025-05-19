<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\Payroll\Planilla;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PlanillaController extends Controller
{
	public function index(Request $request)
	{
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = $request->get('search', '');

		$query = Planilla::select()->with(['anioCalendario']);

		if ($search !== '') {
			$query->where(function ($q) use ($search) {
				$q->where('mes', 'like', "%$search%")
					->orWhereHas('anioCalendario', function ($q) use ($search) {
						$q->where('anio', 'like', "%$search%");
					});
			});
		}

		try {
			$planillas = $query
				->orderBy('fecha_generacion', 'desc')
				->paginate($perPage, ['*'], 'page', $page);
			return Inertia::render('payroll/planillas/index', ['planillas' => $planillas]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar las planillas']);
		}
	}

	public function store(Request $request)
	{
		$request->validate([
			'id_anio' => ['required', 'exists:anio_calendario,id_anio'],
			'mes' => ['required', 'string'],
			'fecha_inicio' => ['required', 'date'],
			'fecha_fin' => ['required', 'date', 'after:fecha_inicio'],
		]);

		try {

			if (Planilla::where('estado', 'activo')->exists()) {
				return back()->withErrors(['message' => 'Ya existe una planilla activa']);
			}

			$planilla = Planilla::create(array_merge(
				$request->only([
					'id_anio',
					'mes',
					'fecha_inicio',
					'fecha_fin',
				]),
				['estado' => 'activo']
			));
			return back()->with('success', 'Planilla creada correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al crear la planilla']);
		}
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'id_anio' => ['required', 'exists:anio_calendario,id_anio'],
			'mes' => ['required', 'string'],
			'fecha_inicio' => ['required', 'date'],
			'fecha_fin' => ['required', 'date', 'after:fecha_inicio'],
		]);

		try {
			$planilla = Planilla::findOrFail($id);
			$planilla->update($request->only([
				'id_anio',
				'mes',
				'fecha_inicio',
				'fecha_fin',
			]));
			return back()->with('success', 'Planilla actualizada correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al actualizar la planilla']);
		}
	}

	public function destroy($id)
	{
		try {
			$planilla = Planilla::findOrFail($id);

			if ($planilla->detalles()->exists()) {
				return back()->withErrors(['message' => 'No se puede eliminar la planilla porque tiene detalles asociados']);
			}

			$planilla->delete();
			return back()->with('success', 'Planilla eliminada correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al eliminar la planilla']);
		}
	}
}
