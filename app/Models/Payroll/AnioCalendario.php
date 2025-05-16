<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Model;

class AnioCalendario extends Model
{
	protected $table = 'anio_calendario';
	protected $primaryKey = 'id_anio';
	public $timestamps = false;

	protected $fillable = [
		'anio',
		'fecha_inicio',
		'fecha_fin',
		'estado' // El estado es automático
	];

	public function planillas()
	{
		return $this->hasMany(Planilla::class, 'id_anio');
	}
}
