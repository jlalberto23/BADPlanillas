<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
	protected $table = 'empleados';
	public $timestamps = false;
	protected $primaryKey = 'id_empleado';

	protected $fillable = [
		'id_profesion',
		'id_puesto',
		'id_seccion',
		'primer_nombre',
		'segundo_nombre',
		'apellido_paterno',
		'apellido_materno',
		'apellido_casada',
		'fecha_nacimiento',
		'fecha_ingreso',
		'numero_documento',
		'dui',
		'nit',
		'codigo_isss',
		'codigo_nup',
		'salario_base',
		'estado_civil',
		'sexo',
		'correo_personal',
		'correo_institucional',
		'estado',
		'carnet_empleado',
		'tipo_documento'
	];

	// Relaciones
	public function profesion()
	{
		return $this->belongsTo(Profesion::class, 'id_profesion');
	}

	public function puesto()
	{
		return $this->belongsTo(Puesto::class, 'id_puesto');
	}

	public function seccion()
	{
		return $this->belongsTo(Seccionempresa::class, 'id_seccion');
	}

	// Relación con el área a través de la sección
	public function area()
	{
		return $this->hasOneThrough(
			Areaempresa::class,
			Seccionempresa::class,
			'id_seccion', // Llave foránea en seccionEmpresa
			'id_area', // Llave primaria en areaEmpresa
			'id_seccion', // Llave foránea en empleados
			'id_area' // Llave foránea en seccionEmpresa que conecta con areaEmpresa
		);
	}

	// Relaciones inversas para jefaturas
	public function departamentosACargo()
	{
		return $this->hasMany(Departamentoempresa::class, 'id_jefeDepto');
	}

	public function areasACargo()
	{
		return $this->hasMany(Areaempresa::class, 'id_jefeArea');
	}

	public function seccionesACargo()
	{
		return $this->hasMany(Seccionempresa::class, 'id_jefeSeccion');
	}
}
