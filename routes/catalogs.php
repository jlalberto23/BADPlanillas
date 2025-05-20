<?php

use App\Http\Controllers\Catalogs\DepartamentoEmpresaController;
use App\Http\Controllers\Catalogs\EmpleadoController;
use App\Http\Controllers\Catalogs\ProfesionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('catalogs')->group(function () {
	// Rutas para profesiones
	Route::get('profesiones', [ProfesionController::class, 'index'])
		->middleware('can:catalogs.profesiones.index')->name('catalogs.profesiones.index');
	Route::post('profesiones', [ProfesionController::class, 'store'])
		->middleware('can:catalogs.profesiones.store')->name('catalogs.profesiones.store');
	Route::put('profesiones/{id}', [ProfesionController::class, 'update'])
		->middleware('can:catalogs.profesiones.update')->name('catalogs.profesiones.update');
	Route::delete('profesiones/{id}', [ProfesionController::class, 'destroy'])
		->middleware('can:catalogs.profesiones.destroy')->name('catalogs.profesiones.destroy');
	Route::get('profesiones/get', [ProfesionController::class, 'getProfesiones'])
		->name('catalogs.profesiones.get');

	// Rutas para empleados
	Route::get('empleados', [EmpleadoController::class, 'index'])
		->middleware('can:catalogs.empleados.index')->name('catalogs.empleados.index');

	// Rutas para departamentos
	Route::get('departamentos/get', [DepartamentoEmpresaController::class, 'getAll'])
		->name('catalogs.departamentos.getAll');
});
