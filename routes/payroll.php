<?php

use App\Http\Controllers\Payroll\AnioController;
use App\Http\Controllers\Payroll\PlanillaController;
use App\Http\Controllers\Payroll\PlanillaDetalleController;
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

	// Rutas para planillas
	Route::get('planillas', [PlanillaController::class, 'index'])
		->middleware('can:payroll.planillas.index')->name('payroll.planillas.index');
	Route::post('planillas', [PlanillaController::class, 'store'])
		->middleware('can:payroll.planillas.store')->name('payroll.planillas.store');
	Route::put('planillas/{id}', [PlanillaController::class, 'update'])
		->middleware('can:payroll.planillas.update')->name('payroll.planillas.update');
	Route::delete('planillas/{id}', [PlanillaController::class, 'destroy'])
		->middleware('can:payroll.planillas.destroy')->name('payroll.planillas.destroy');

	// Rutas para planillas detalles
	Route::get('planillas/{id}', [PlanillaDetalleController::class, 'index'])
		->middleware('can:payroll.planillas.show')->name('payroll.planillas.show');
});
