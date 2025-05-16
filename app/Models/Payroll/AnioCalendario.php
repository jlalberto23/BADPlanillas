<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Model;

class Aniocalendario extends Model
{
	protected $table = 'anio_calendario';
	public $timestamps = false;
	protected $primaryKey = 'id_anio';
}
