<?php

namespace App\Models\Catalogs;

use App\Models\Payroll\Centrocosto;
use Illuminate\Database\Eloquent\Model;
use App\Models\Catalogs\Empleado;

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
		return $this->belongsTo(Empleado::class, 'id_jefeDepto');
	}
		public function empleados()
	{
		return $this->hasMany(Empleado::class, 'id_deptoEmpresa', 'id_deptoEmpresa');
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
	public function centroCostos()
	{
		return $this->hasMany(Centrocosto::class, 'id_deptoEmpresa', 'id_deptoEmpresa');
	}

	public function centroCosto($anio = null)
	{
		return $this->hasOne(Centrocosto::class, 'id_deptoEmpresa', 'id_deptoEmpresa')->where('anio', $anio ?? now()->year);
	}
}
