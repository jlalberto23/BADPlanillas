<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use App\Models\Empleado;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Puestos extends Model
{
	protected $table = 'puestos';
	public $timestamps = false;
	protected $primaryKey = 'id_puesto';

	protected $fillable = [
		'nombrePuesto',
		'descripcionPuesto',
	];

	/**
	 * Obtiene los empleados que tienen este puesto
	 */
	public function empleados(): HasMany
	{
		return $this->hasMany(Empleado::class, 'id_puesto', 'id_puesto');
	}
}
