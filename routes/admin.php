<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SessionController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
	Route::get('users', [UserController::class, 'showAll'])
		->middleware('can:admin.users.view');
	Route::post('users', [UserController::class, 'create'])
		->middleware('can:admin.users.create')->name('user.create');
	Route::get('users/{id}', [UserController::class, 'show'])
		->middleware('can:admin.users.show')->name('user.show');
	Route::put('users/{id}', [UserController::class, 'update'])
		->middleware('can:admin.users.update')->name('user.update');
	Route::delete('users/{id}', [UserController::class, 'destroy'])
		->middleware('can:admin.users.delete')->name('user.destroy');
	Route::put('users/{id}/syncroles', [UserController::class, 'syncroles'])
		->middleware('can:admin.users.roles.sync')->name('user.roles.sync');

	Route::get('roles', [RoleController::class, 'showAll'])
		->middleware('can:admin.roles.view');
	Route::post('roles', [RoleController::class, 'create'])
		->middleware('can:admin.roles.create')->name('role.create');
	Route::get('roles/{id}', [RoleController::class, 'show'])
		->middleware('can:admin.roles.show')->name('role.show');
	Route::put('roles/{id}', [RoleController::class, 'update'])
		->middleware('can:admin.roles.update')->name('role.update');
	Route::delete('roles/{id}', [RoleController::class, 'destroy'])
		->middleware('can:admin.roles.delete')->name('role.destroy');
	Route::put('roles/{id}/syncpermissions', [RoleController::class, 'syncpermissions'])
		->middleware('can:admin.roles.permissions.sync')->name('role.permissions.sync');

	Route::get('sessions', [SessionController::class, 'show'])
		->middleware('can:admin.sessions.view');
	Route::delete('sessions/user/{userId}', [SessionController::class, 'deleteAllByUser'])
		->middleware('can:admin.sessions.delete')->name('user.sessions.destroy');

	Route::prefix('data')->group(function () {
		Route::get('permissions', [PermissionController::class, 'getAll'])
			->middleware('can:admin.data.permissions.view')->name('data.permissions');
	});
});
