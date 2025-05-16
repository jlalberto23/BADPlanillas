<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Model;

class Planilla extends Model
{
	protected $table = 'planilla';
	protected $primaryKey = 'id_planilla';
	public $timestamps = false;
}
