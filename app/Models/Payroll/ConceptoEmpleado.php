<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Model;

class ConceptoEmpleado extends Model
{
	protected $table = 'conceptos_empleado';
	protected $primaryKey = 'id_concepto_empleado';
	public $timestamps = false;

	protected $fillable = [
		'id_planilla_detalle',
		'codigo_concepto',
		'fecha',
		'monto'
	];

	protected $casts = [
		'fecha' => 'date',
		'monto' => 'decimal:2'
	];

	public function planillaDetalle()
	{
		return $this->belongsTo(PlanillaDetalle::class, 'id_planilla_detalle');
	}

	public function tipoConcepto()
	{
		return $this->belongsTo(TipoConcepto::class, 'codigo_concepto', 'codigo');
	}
}
