<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
	public function show()
	{
		$users = [];

		try {
			$users = User::all();
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
		}
		return Inertia::render('admin/users/users-page', ['users' => $users]);
	}
}
