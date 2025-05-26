<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Planilla extends Model
{
	protected $table = 'planilla';
	protected $primaryKey = 'id_planilla';
	public $timestamps = false;

	protected $fillable = [
		'id_anio',
		'mes',
		'fecha_inicio',
		'fecha_fin',
		// Estos campos no son editables directamente
		'fecha_generacion',
		// 'total_ingresos',
		// 'total_descuentos', 
		// 'total_aporte_patronal',
		// 'salario_neto_total',
		'estado'
	];

	public function anioCalendario()
	{
		return $this->belongsTo(AnioCalendario::class, 'id_anio');
	}

	public function detalles()
	{
		return $this->hasMany(PlanillaDetalle::class, 'id_planilla');
	}

	public function sincronizarDetallesConEmpleados($idPlanilla = null)
	{
		DB::statement("CALL actualizar_planilla_detalle_empleados(?)", [$idPlanilla ?? $this->id_planilla]);
	}
}
