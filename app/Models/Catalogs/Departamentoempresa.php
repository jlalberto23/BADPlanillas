<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use App\Models\Catalogs\Empleados;
use App\Models\Payroll\Centrocosto;
use App\Models\Catalogs\Areaempresa;
use App\Models\Catalogs\Seccionempresa;

class Departamentoempresa extends Model
{
	protected $table = 'departamentoEmpresa';
	public $timestamps = false;
	protected $primaryKey = 'id_deptoEmpresa';
	
	protected $fillable = [
		'nombreDepto',
		'descripcionDepto',
		'id_jefeDepto',
		'id_centro_costo'
	];

	// Relación con el jefe del departamento
	public function jefeDepartamento()
	{
		return $this->belongsTo(Empleados::class, 'id_jefeDepto');
	}

	// Relación con el centro de costo
	public function centroCosto()
	{
		return $this->belongsTo(Centrocosto::class, 'id_centro_costo');
	}

	// Relación con las áreas del departamento
	public function areas()
	{
		return $this->hasMany(Areaempresa::class, 'id_deptoEmpresa');
	}

	// Relación con las secciones (a través de áreas)
	public function secciones()
	{
		return $this->hasManyThrough(
			Seccionempresa::class,
			Areaempresa::class,
			'id_deptoEmpresa', // Llave foránea en areas
			'id_area', // Llave foránea en secciones
			'id_deptoEmpresa', // Llave local
			'id_area' // Llave local en areas
		);
	}

	// Relación con los empleados del departamento
	public function empleados()
	{
		return $this->hasManyThrough(
			Empleados::class,
			Seccionempresa::class,
			'id_area', // Llave foránea en secciones que conecta con áreas
			'id_seccion', // Llave foránea en empleados
			'id_deptoEmpresa', // Llave local en departamento
			'id_seccion' // Llave local en secciones
		);
	}
}
