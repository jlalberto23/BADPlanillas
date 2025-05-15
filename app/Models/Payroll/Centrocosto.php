<?php

namespace App\Models\Payroll;

use App\Models\Catalogs\Departamentoempresa;
use Illuminate\Database\Eloquent\Model;

class Centrocosto extends Model
{
	protected $table = 'centroCosto';
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

	// Relación con el departamento de la empresa
	public function departamento()
	{
		return $this->belongsTo(Departamentoempresa::class, 'id_deptoEmpresa', 'id_deptoEmpresa');
	}

	public function planillas()
	{
		return $this->hasMany(Planilla::class, 'id_centro_costo', 'id_centro_costo');
	}
}
