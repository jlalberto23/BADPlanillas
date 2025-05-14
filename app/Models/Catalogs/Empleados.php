<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empleados extends Model
{
	protected $table = 'empleados';
	public $timestamps = false;
	// todo: Falta agregar fillable y relaciones
}
