<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
	public function getAll()
	{
		try {
			$permissions = Permission::all();
			return response()->json($permissions);
		} catch (\Throwable $th) {
			Log::error($th->getMessage());
			return response()->json(['error' => 'Failed to fetch permissions'], 500);
		}
	}
}
