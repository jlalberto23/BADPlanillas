<?php

use App\Http\Controllers\Catalogs\DepartamentoEmpresaController;
use App\Http\Controllers\Catalogs\EmpleadoController;
use App\Http\Controllers\Catalogs\ProfesionController;
use App\Http\Controllers\Catalogs\PuestoController;
use App\Http\Controllers\Catalogs\SeccionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('catalogs')->group(
	function () {
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

			// Rutas para puestos
		Route::get('puestos', [PuestoController::class, 'index'])
			->middleware('can:catalogs.puestos.index')->name('catalogs.puestos.index');
		Route::post('puestos', [PuestoController::class, 'store'])
			->middleware('can:catalogs.puestos.store')->name('catalogs.puestos.store');
		Route::put('puestos/{id}', [PuestoController::class, 'update'])
			->middleware('can:catalogs.puestos.update')->name('catalogs.puestos.update');
		Route::delete('puestos/{id}', [PuestoController::class, 'destroy'])
			->middleware('can:catalogs.puestos.destroy')->name('catalogs.puestos.destroy');
		Route::get('puestos/get', [PuestoController::class, 'getPuestos'])
			->name('catalogs.puestos.get');

			// Rutas para Secciones
		Route::get('secciones', [SeccionController::class, 'index'])
			->middleware('can:catalogs.secciones.index')->name('catalogs.secciones.index');
		Route::post('secciones', [SeccionController::class, 'store'])
			->middleware('can:catalogs.secciones.store')->name('catalogs.secciones.store');
		Route::put('secciones/{id}', [SeccionController::class, 'update'])
			->middleware('can:catalogs.secciones.update')->name('catalogs.secciones.update');
		Route::delete('secciones/{id}', [SeccionController::class, 'destroy'])
			->middleware('can:catalogs.secciones.destroy')->name('catalogs.secciones.destroy');
		Route::get('secciones/get', [SeccionController::class, 'getsecciones'])
			->name('catalogs.secciones.get');

		// Rutas para empleados
		Route::get('empleados', [EmpleadoController::class, 'index'])
			->middleware('can:catalogs.empleados.index')->name('catalogs.empleados.index');
		Route::post('empleados', [EmpleadoController::class, 'store'])
			->middleware('can:catalogs.empleados.store')->name('catalogs.empleados.store');
		Route::get('empleados/registrar', [EmpleadoController::class, 'registrar'])
			->middleware('can:catalogs.empleados.store')->name('catalogs.empleados.registrar');

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
