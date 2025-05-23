<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\Payroll\ConceptoEmpleado;
use App\Models\Payroll\PlanillaDetalle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ConceptoEmpleadoController extends Controller
{

	public function index(Request $request, $id)
	{
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = $request->get('search', '');

		$query = ConceptoEmpleado::select()
			->where('id_planilla_detalle', $id)
			->with(['tipoConcepto']);

		try {
			$detallePlanilla = PlanillaDetalle::with([
				'planilla',
				'planilla.anioCalendario',
				'empleado:id_empleado,carnet_empleado,primer_nombre,apellido_paterno,estado,salario_base,sexo'
			])->find($id);
			$conceptosEmpleado = $query
				// ->orderBy('fecha_generacion', 'desc')
				->paginate($perPage, ['*'], 'page', $page);
			return Inertia::render('payroll/concepto-empleado/index', [
				'detalle' => $detallePlanilla,
				'conceptosEmpleado' => $conceptosEmpleado
			]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar las planillas']);
		}
	}
}
