<?php

namespace App\Models\Territories;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
	protected $table = 'departamento';
	public $timestamps = false;
	protected $primaryKey = 'id_departamento';
	
	protected $fillable = [
		'nombreDepartamento',
		'id_pais'
	];

	// Relación con País
	public function pais()
	{
		return $this->belongsTo(Pais::class, 'id_pais');
	}

	// Relación con Municipios
	public function municipios()
	{
		return $this->hasMany(Municipio::class, 'id_departamento');
	}
}
