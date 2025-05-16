<?php

namespace App\Models\Payroll;

use App\Models\Catalogs\Departamentoempresa;
use Illuminate\Database\Eloquent\Model;

class CentroCosto extends Model
{
	protected $table = 'centro_costo';
	protected $primaryKey = 'id_centro_costo';
	public $timestamps = false;

	protected $fillable = [
		'id_deptoEmpresa',
		'anio',
		'presupuesto_total',
		'presupuesto_restante'
	];

	protected $casts = [
		'anio' => 'integer',
		'presupuesto_total' => 'decimal:2',
		'presupuesto_restante' => 'decimal:2'
	];

	public function departamentoEmpresa()
	{
		return $this->belongsTo(Departamentoempresa::class, 'id_deptoEmpresa');
	}

	public function planillaDetalles()
	{
		return $this->hasMany(PlanillaDetalle::class, 'id_centro_costo');
	}
}
