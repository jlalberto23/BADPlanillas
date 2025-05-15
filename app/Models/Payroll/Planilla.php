<?php

namespace App\Models\Payroll;

use App\Models\Catalogs\Empleado;
use Illuminate\Database\Eloquent\Model;

class Planilla extends Model
{
	protected $table = 'planilla';
	protected $primaryKey = 'id_planilla';
	public $timestamps = false;
	protected $fillable = [
		'id_periodo',
		'id_empleado',
		'id_centro_costo',
		'fecha_generacion',
		'total_ingresos',
		'total_descuentos',
		'total_aporte_patronal',
		'salario_neto_total'
	];

	protected $casts = [
		'fecha_generacion' => 'date',
		'total_ingresos' => 'decimal:2',
		'total_descuentos' => 'decimal:2',
		'total_aporte_patronal' => 'decimal:2',
		'salario_neto_total' => 'decimal:2'
	];

	public function empleado()
	{
		return $this->belongsTo(Empleado::class, 'id_empleado', 'id_empleado');
	}

	public function centroCosto()
	{
		return $this->belongsTo(Centrocosto::class, 'id_centro_costo', 'id_centro_costo');
	}
}
