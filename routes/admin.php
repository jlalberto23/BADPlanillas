<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SessionController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
	Route::get('users', [UserController::class, 'showAll']);
	Route::post('users', [UserController::class, 'create'])->name('user.create');
	Route::get('users/{id}', [UserController::class, 'show'])->name('user.show');
	Route::put('users/{id}', [UserController::class, 'update'])->name('user.update');
	Route::delete('users/{id}', [UserController::class, 'destroy'])->name('user.destroy');

	Route::get('roles', [RoleController::class, 'showAll']);
	Route::get('roles/{id}', [RoleController::class, 'show'])->name('role.showById');
	Route::put('roles/{id}', [RoleController::class, 'update'])->name('role.update');
	Route::delete('roles/{id}', [RoleController::class, 'destroy'])->name('role.destroy');
	Route::put('roles/{id}/syncpermissions', [RoleController::class, 'syncpermissions'])->name('role.permissions.sync');

	Route::get('sessions', [SessionController::class, 'show']);

	Route::prefix('data')->group(function () {
		Route::get('permissions', [PermissionController::class, 'getAll'])->name('data.permissions');
	});
});
