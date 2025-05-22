<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\Payroll\AnioCalendario;
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
			'mes' => ['required', 'string', 'regex:/^\d{4}-\d{2}$/'], // Mes en formato 'YYYY-MM'
			'fecha_inicio' => ['required', 'date'],
			'fecha_fin' => ['required', 'date', 'after:fecha_inicio'],
		]);

		[$year, $month] = explode('-', $request->input('mes'));

		try {

			if (Planilla::where('estado', 'activo')->exists()) {
				return back()->withErrors(['message' => 'Ya existe una planilla activa']);
			}

			$anio = AnioCalendario::select('id_anio')->where('anio', $year)->first();

			if (!$anio) {
				return back()->withErrors(['message' => 'No se puede crear la planilla porque el año calendario no existe']);
			}

			$planilla = Planilla::create(array_merge(
				$request->only([
					'fecha_inicio',
					'fecha_fin',
				]),
				[
					'id_anio' => $anio->id_anio,
					'mes' => $month,
				]
			));
			return back()->with('success', 'Planilla inicializada correctamente');
		} catch (\PDOException $e) {
			switch ($e->getCode()) {
				case 'P0001':
					return back()->withErrors([
						'code' => 'P0001',
						'message' => 'El año especificado no existe en el calendario'
					]);
				case 'P0002':
					return back()->withErrors([
						'code' => 'P0002',
						'message' => 'No existen centros de costo para todos los departamentos en el año ' . $year . ' Asegúrate de que todos los departamentos tengan un centro de costo asociado'
					]);
			}
			Log::error($e->getMessage());
			return back()->withErrors(['message' => 'Error inesperado al inicializar la planilla']);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al inicializar la planilla']);
		}
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'mes' => ['required', 'string', 'regex:/^\d{4}-\d{2}$/'], // Mes en formato 'YYYY-MM'
			'fecha_inicio' => ['required', 'date'],
			'fecha_fin' => ['required', 'date', 'after:fecha_inicio'],
		]);

		[$year, $month] = explode('-', $request->input('mes'));

		try {

			$anio = AnioCalendario::select('id_anio')->where('anio', $year)->first();

			if (!$anio) {
				return back()->withErrors(['message' => 'No se puede actualizar la planilla porque el año calendario no existe']);
			}

			$planilla = Planilla::find($id);

			if (!$planilla) {
				return back()->withErrors(['message' => 'No se puede actualizar la planilla porque no existe']);
			}

			$planilla->update(array_merge(
				$request->only([
					'fecha_inicio',
					'fecha_fin',
				]),
				[
					'id_anio' => $anio->id_anio,
					'mes' => $month,
				]
			));
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

	public function sincronizarDetallesConEmpleados($id)
	{
		try {
			$planilla = Planilla::findOrFail($id);
			$planilla->sincronizarDetallesConEmpleados();
			return back()->with('success', 'Detalles sincronizados con empleados correctamente');
		} catch (\PDOException $e) {
			Log::error($e->getMessage());
			if (in_array($e->getCode(), ['P0003', 'P0004', 'P0005'])) {
				return back()->withErrors([
					'code' => $e->getCode(),
					'message' => $this->extractPostgresMessage($e->getMessage())
				]);
			}
			return back()->withErrors(['message' => 'Error al sincronizar los detalles con empleados']);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al sincronizar los detalles con empleados']);
		}
	}

	private function extractPostgresMessage($mensajeCompleto)
	{
		// Intenta extraer entre "ERROR: " y "CONTEXT:"
		if (preg_match('/ERROR:\s(.+?)\sCONTEXT:/', $mensajeCompleto, $matches)) {
			return trim($matches[1]);
		}

		// Fallback: extraer desde "ERROR:" hasta el final
		if (preg_match('/ERROR:\s(.+)/', $mensajeCompleto, $matches)) {
			return trim($matches[1]);
		}

		// Si no hay coincidencias, retornar el mensaje completo
		return $mensajeCompleto;
	}
}
