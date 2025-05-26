<?php

namespace App\Http\Controllers\Admin;

use App\Models\Catalogs\Empleado;
use App\Models\Payroll\Planilla;
use App\Http\Controllers\Controller;
use Inertia\Inertia;


class DashboardController extends Controller
{
public function index()
{
    return Inertia::render('dashboard', [
        'empleadosActivos' => Empleado::where('estado', 'activo')->count(),
        'planillasCreadas' => Planilla::count(),
        'planillasConError' => Planilla::where('estado', 'error')->count(),
    ]);
}
}
