<?php

namespace App\Models\Payroll;

use App\Models\Catalogs\Empleado;
use Illuminate\Database\Eloquent\Model;

class PlanillaDetalle extends Model
{
	protected $table = 'planilla_detalle';
	protected $primaryKey = 'id_planilla_detalle';
	public $timestamps = false;

	protected $fillable = [
		'id_planilla',
		'id_empleado',
		'id_centro_costo',
		'total_ingresos',
		'total_descuentos',
		'total_aporte_patronal',
		'salario_neto_total'
	];

	protected $casts = [
		'total_ingresos' => 'decimal:2',
		'total_descuentos' => 'decimal:2',
		'total_aporte_patronal' => 'decimal:2',
		'salario_neto_total' => 'decimal:2'
	];

	public function planilla()
	{
		return $this->belongsTo(Planilla::class, 'id_planilla');
	}

	public function empleado()
	{
		return $this->belongsTo(Empleado::class, 'id_empleado');
	}

	public function centroCosto()
	{
		return $this->belongsTo(CentroCosto::class, 'id_centro_costo');
	}

	public function conceptosEmpleado()
	{
		return $this->hasMany(ConceptoEmpleado::class, 'id_planilla_detalle');
	}
}
