<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;

class Profesion extends Model
{
	protected $table = 'profesiones';
	public $timestamps = false;
	protected $primaryKey = 'id_profesion';

	protected $fillable = [
		'nombreProfesion'
	];

	/**
	 * Obtiene los empleados que tienen esta profesión.
	 */
	public function empleados()
	{
		return $this->hasMany(Empleado::class, 'id_profesion');
	}
}
