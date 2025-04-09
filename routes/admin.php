<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SessionController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
	Route::get('users', [UserController::class, 'show']);

	Route::get('roles', [RoleController::class, 'show']);

	Route::get('sessions', [SessionController::class, 'show']);
});
