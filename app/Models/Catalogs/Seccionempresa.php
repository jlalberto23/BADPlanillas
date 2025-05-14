<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use App\Models\Empleado;

class Seccionempresa extends Model
{
	protected $table = 'seccionEmpresa';
	public $timestamps = false;
	
	protected $primaryKey = 'id_seccion';
	
	protected $fillable = [
		'nombreSeccion',
		'descripcionSeccion',
		'id_jefeSeccion',
		'id_area'
	];

	// Relación con el jefe de sección (empleado)
	public function jefeSeccion()
	{
		return $this->belongsTo(Empleado::class, 'id_jefeSeccion', 'id_empleado');
	}

	// Relación con el área a la que pertenece
	public function area()
	{
		return $this->belongsTo(Areaempresa::class, 'id_area', 'id_area');
	}

	// Relación con los empleados que pertenecen a esta sección
	public function empleados()
	{
		return $this->hasMany(Empleado::class, 'id_seccion', 'id_seccion');
	}

	// Relación con el departamento a través del área
	public function departamento()
	{
		return $this->hasOneThrough(
			Departamentoempresa::class,
			Areaempresa::class,
			'id_area',
			'id_deptoEmpresa',
			'id_area',
			'id_deptoEmpresa'
		);
	}
}
