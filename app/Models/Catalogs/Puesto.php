<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use App\Models\Catalogs\Empleado;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Puesto extends Model
{
	protected $table = 'puestos';
	public $timestamps = false;
	protected $primaryKey = 'id_puesto';

	protected $fillable = [
		'nombrePuesto',
		'descripcionPuesto',
		'salario_min',
		'salario_max'
	];

	/**
	 * Obtiene los empleados que tienen este puesto
	 */
	public function empleados(): HasMany
	{
		return $this->hasMany(Empleado::class, 'id_puesto', 'id_puesto');
	}
}
