<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Model;

class Aportespatron extends Model
{
	protected $table = 'aportesPatron';
	public $timestamps = false;
	
	// Relación con el empleado
	public function empleado()
	{
		return $this->belongsTo(Empleado::class, 'id_empleado', 'id_empleado');
	}
	
	// Relación con el tipo de aporte
	public function tipoAporte()
	{
		return $this->belongsTo(TpoAportesPatron::class, 'id_tpo_Aporte', 'id_tpo_Aporte');
	}
	
	// Relación con el período contable
	public function periodo()
	{
		return $this->belongsTo(PeriodoContable::class, 'id_periodo', 'id_periodo');
	}
}
