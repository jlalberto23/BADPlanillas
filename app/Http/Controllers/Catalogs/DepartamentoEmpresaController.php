<?php

namespace App\Http\Controllers\Catalogs;

use App\Http\Controllers\Controller;
use App\Models\Catalogs\Departamentoempresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DepartamentoEmpresaController extends Controller
{
	public function getAll()
	{
		$departamentos = Departamentoempresa::all();
		return response()->json($departamentos);
	}
}
