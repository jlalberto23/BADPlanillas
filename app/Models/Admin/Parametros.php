<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Parametros extends Model
{
	// Nombre de la tabla
	protected $table = 'parametros';

	// La clave primaria no es un entero autoincremental
	protected $primaryKey = 'clave';
	public $incrementing = false;
	protected $keyType = 'string';

	// Campos que pueden ser asignados masivamente
	protected $fillable = [
		'clave',
		'titulo',
		'valor',
		'descripcion',
	];
}
