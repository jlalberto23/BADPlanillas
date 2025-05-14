<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Model;

class Aniocalendario extends Model
{
	protected $table = 'anioCalendario';
	public $timestamps = false;
	protected $primaryKey = 'id_anio';

	// Relación uno a muchos con PeriodoContable
	public function periodosContables()
	{
		return $this->hasMany(PeriodoContable::class, 'id_anio', 'id_anio');
	}
}
