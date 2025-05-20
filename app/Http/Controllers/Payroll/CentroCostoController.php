<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\Payroll\CentroCosto;
use App\Models\Payroll\AnioCalendario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CentroCostoController extends Controller
{
	public function index(Request $request)
	{
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = $request->get('search', '');

		$query = CentroCosto::select('centro_costo.*', 'anio_calendario.anio as anio')
			->join('anio_calendario', 'centro_costo.id_anio', '=', 'anio_calendario.id_anio')
			->with(['departamento', 'anioCalendario']);

		if ($search !== '') {
			$query->where(function ($q) use ($search) {
				$q->whereHas('departamento', function ($q) use ($search) {
					$q->where('nombre', 'like', "%$search%");
				})
					->orWhere('anio', 'like', "%$search%");
			});
		}

		try {
			$centrosCosto = $query
				->orderBy('anio', 'desc')
				->paginate($perPage, ['*'], 'page', $page);
			return Inertia::render('payroll/centros-costo/index', ['centrosCosto' => $centrosCosto]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar los centros de costo']);
		}
	}

	public function store(Request $request)
	{
		$request->validate([
			'id_deptoEmpresa' => ['required', 'exists:departamento_empresa,id_deptoEmpresa'],
			'id_anio' => ['required', 'exists:anio_calendario,id_anio'],
			'presupuesto_total' => ['required', 'numeric', 'min:0'],
		]);

		try {
			$centroCosto = CentroCosto::create($request->only([
				'id_deptoEmpresa',
				'id_anio',
				'presupuesto_total',
			]));

			return back()->with('success', 'Centro de costo creado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al crear el centro de costo']);
		}
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'id_deptoEmpresa' => ['required', 'exists:departamento_empresa,id_deptoEmpresa'],
			'id_anio' => ['required', 'exists:anio_calendario,id_anio'],
			'presupuesto_total' => ['required', 'numeric', 'min:0'],
		]);

		try {
			$centroCosto = CentroCosto::find($id);

			if (!$centroCosto) {
				return back()->withErrors(['message' => 'No se puede actualizar el centro de costo porque no existe']);
			}

			$centroCosto->update($request->only([
				'id_deptoEmpresa',
				'id_anio',
				'presupuesto_total',
			]));

			return back()->with('success', 'Centro de costo actualizado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al actualizar el centro de costo']);
		}
	}

	public function destroy($id)
	{
		try {
			$centroCosto = CentroCosto::findOrFail($id);

			if ($centroCosto->planillaDetalles()->exists()) {
				return back()->withErrors(['message' => 'No se puede eliminar el centro de costo porque tiene detalles de planilla asociados']);
			}

			$centroCosto->delete();
			return back()->with('success', 'Centro de costo eliminado correctamente');
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al eliminar el centro de costo']);
		}
	}
}
