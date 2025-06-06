<?php

use App\Http\Controllers\Payroll\AnioController;
use App\Http\Controllers\Payroll\PlanillaController;
use App\Http\Controllers\Payroll\PlanillaDetalleController;
use App\Http\Controllers\Payroll\CentroCostoController;
use App\Http\Controllers\Payroll\ConceptoEmpleadoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('payroll')->group(function () {
	// Rutas para años calendario
	Route::get('anios', [AnioController::class, 'index'])
		->middleware('can:payroll.anios.index')->name('payroll.anios.index');
	Route::post('anios', [AnioController::class, 'store'])
		->middleware('can:payroll.anios.store')->name('payroll.anios.store');
	Route::put('anios/{id}', [AnioController::class, 'update'])
		->middleware('can:payroll.anios.update')->name('payroll.anios.update');
	Route::delete('anios/{id}', [AnioController::class, 'destroy'])
		->middleware('can:payroll.anios.destroy')->name('payroll.anios.destroy');
	Route::get('anios/get', [AnioController::class, 'getAnios'])
		->name('payroll.anios.get');

	// Rutas para centros de costos
	Route::get('centros-costo', [CentroCostoController::class, 'index'])
		->middleware('can:payroll.centroscosto.index')->name('payroll.centroscosto.index');
	Route::post('centros-costo', [CentroCostoController::class, 'store'])
		->middleware('can:payroll.centroscosto.store')->name('payroll.centroscosto.store');
	Route::put('centros-costo/{id}', [CentroCostoController::class, 'update'])
		->middleware('can:payroll.centroscosto.update')->name('payroll.centroscosto.update');
	Route::delete('centros-costo/{id}', [CentroCostoController::class, 'destroy'])
		->middleware('can:payroll.centroscosto.destroy')->name('payroll.centroscosto.destroy');

	// Rutas para planillas
	Route::get('planillas', [PlanillaController::class, 'index'])
		->middleware('can:payroll.planillas.index')->name('payroll.planillas.index');
	Route::post('planillas', [PlanillaController::class, 'store'])
		->middleware('can:payroll.planillas.store')->name('payroll.planillas.store');
	Route::put('planillas/{id}', [PlanillaController::class, 'update'])
		->middleware('can:payroll.planillas.update')->name('payroll.planillas.update');
	Route::delete('planillas/{id}', [PlanillaController::class, 'destroy'])
		->middleware('can:payroll.planillas.destroy')->name('payroll.planillas.destroy');
	Route::post('planillas/{id}/sincronizar-detalles-con-empleados', [PlanillaController::class, 'sincronizarDetallesConEmpleados'])
		->middleware('can:payroll.planillas.sincronizardetallesconempleados')->name('payroll.planillas.sincronizardetallesconempleados');
	Route::post('planillas/{id}/finalizar', [PlanillaController::class, 'finalize'])
		->middleware('can:payroll.planillas.finalize')->name('payroll.planillas.finalize');

	// Rutas para planillas detalles
	Route::get('planillas/{id}', [PlanillaDetalleController::class, 'index'])
		->middleware('can:payroll.planillas.show')->name('payroll.planillas.show');

	// Rutas para conceptos empleados
	Route::get('planilla-detalles/{id}/conceptos-empleado', [ConceptoEmpleadoController::class, 'index'])
		->middleware('can:payroll.planillas.detalles.show')->name('payroll.planillas.detalles.show');
});
