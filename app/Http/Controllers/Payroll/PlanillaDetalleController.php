<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\Payroll\Planilla;
use App\Models\Payroll\PlanillaDetalle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PlanillaDetalleController extends Controller
{
	public function index(Request $request, $id)
	{
		$perPage = max(1, min((int) $request->get('per_page', 20), 500));
		$page = (int) $request->get('page', 1);
		$search = $request->get('search', '');

		$query = PlanillaDetalle::select()->with(['empleado']);

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
			$planilla = Planilla::with(['anioCalendario'])->find($id);
			$planillaDetalles = $query
				// ->orderBy('fecha_generacion', 'desc')
				->paginate($perPage, ['*'], 'page', $page);
			return Inertia::render('payroll/detalle-planilla/index', ['planilla' => $planilla, 'planillaDetalles' => $planillaDetalles]);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return back()->withErrors(['message' => 'Error al cargar las planillas']);
		}
	}
}
