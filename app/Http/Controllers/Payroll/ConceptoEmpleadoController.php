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

		if ($search !== '') {
			$query->where(function ($q) use ($search) {
				$q->whereHas('empleado', function ($q) use ($search) {
					$q->where('carnet_empleado', 'like', "%$search%")
						->orWhere('primer_nombre', 'like', "%$search%")
						->orWhere('apellido_paterno', 'like', "%$search%");
				});
			});
		}

		try {
			$detallePlanilla = PlanillaDetalle::with(['planilla', 'planilla.anioCalendario'])->find($id);
			$conceptosEmpleado = $query
				// ->orderBy('fecha_generacion', 'desc')
				->paginate($perPage, ['*'], 'page', $page);
			return Inertia::render('payroll/conceptos-empleado/index', [
				'detallePlanilla' => $detallePlanilla,
				'conceptosEmpleado' => $conceptosEmpleado
			]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar las planillas']);
		}
	}
}
