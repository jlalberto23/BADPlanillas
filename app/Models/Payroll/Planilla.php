<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Model;

class Planilla extends Model
{
	protected $table = 'planilla';
	protected $primaryKey = 'id_planilla';
	public $timestamps = false;

	protected $fillable = [
		'id_anio',
		'mes',
		'fecha_generacion',
		'fecha_inicio',
		'fecha_fin',
		'total_ingresos',
		'total_descuentos',
		'total_aporte_patronal',
		'salario_neto_total'
	];

	protected $casts = [
		'mes' => 'string',
		'fecha_generacion' => 'date',
		'fecha_inicio' => 'date',
		'fecha_fin' => 'date',
		'total_ingresos' => 'decimal:2',
		'total_descuentos' => 'decimal:2',
		'total_aporte_patronal' => 'decimal:2',
		'salario_neto_total' => 'decimal:2'
	];

	public function anioCalendario()
	{
		return $this->belongsTo(AnioCalendario::class, 'id_anio');
	}

	public function detalles()
	{
		return $this->hasMany(PlanillaDetalle::class, 'id_planilla');
	}
}
