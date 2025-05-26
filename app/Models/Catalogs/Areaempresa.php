<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
//use App\Models\Catalogs\Empleado;

class Areaempresa extends Model
{
	protected $table = 'areaEmpresa';
	public $timestamps = false;
	protected $primaryKey = 'id_area';
	protected $fillable = [
		'nombreArea',
		'descripcionArea',
		'id_deptoEmpresa',
		'id_jefeArea'
	];


	// Relación: Área pertenece a un departamento
/* 	public function departamento()
	{
		return $this->belongsTo(Departamentoempresa::class, 'id_deptoEmpresa', 'id_deptoEmpresa');
	} */

	// Relación: Área tiene un jefe (empleado)
	/* public function jefe()
	{
		return $this->belongsTo(Empleado::class, 'id_jefeArea', 'id_empleado');
	}
 */
	// Relación: Área tiene muchas secciones
	public function secciones()
	{
		return $this->hasMany(Seccionempresa::class, 'id_area', 'id_area');
	}
/* 		public function empleados()
	{
		return $this->hasMany(Empleado::class, 'id_deptoEmpresa', 'id_deptoEmpresa');
	} */
}
