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
	//Route::get('empleados', [EmpleadoController::class, 'index'])
	//	->middleware('can:catalogs.empleados.index')->name('catalogs.empleados.index');
	Route::get('empleados', [EmpleadoController::class, 'index'])
		->middleware('can:catalogs.empleados.index')->name('catalogs.empleados.index');
	//Route::post('empleados', [EmpleadoController::class, 'store'])
	//	->middleware('can:catalogs.empleados.store')->name('catalogs.empleados.store');
	Route::post('empleados', [EmpleadoController::class, 'store'])
    ->name('catalogs.empleados.store'); 

	Route::put('empleados/{id}', [EmpleadoController::class, 'update'])
		->middleware('can:catalogs.empleados.update')->name('catalogs.empleados.update');
	Route::delete('empleados/{id}', [EmpleadoController::class, 'destroy'])
		->middleware('can:catalogs.empleados.destroy')->name('catalogs.empleados.destroy');
	Route::get('empleados/get', [EmpleadoController::class, 'getempleados'])
		->name('catalogs.empleados.get');
	// Rutas para departamentos
	Route::get('departamentos/get', [DepartamentoEmpresaController::class, 'getAll'])
		->name('catalogs.departamentos.getAll');
}

);
