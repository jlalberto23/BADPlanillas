<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Model;

class TipoConcepto extends Model
{
	protected $table = 'tipos_conceptos';
	protected $primaryKey = 'codigo';
	public $incrementing = false;
	protected $keyType = 'string';
	public $timestamps = false;

	protected $fillable = [
		'codigo',
		'tipo', //ingreso, descuento, aporte_patron
		'nombre',
		'descripcion'
	];

	public function conceptosEmpleado()
	{
		return $this->hasMany(ConceptoEmpleado::class, 'codigo_concepto', 'codigo');
	}
}
