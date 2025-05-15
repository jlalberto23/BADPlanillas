<?php

namespace Database\Seeders\CatalogsSeeders;

use Illuminate\Database\Seeder;
use App\Models\Catalogs\Puesto;

class PuestosSeeder extends Seeder
{
	private array $puestos = [
		[
			'nombrePuesto' => 'Gerente de Recursos Humanos',
			'descripcionPuesto' => 'Responsable de la gestión y dirección del departamento de RRHH',
			'salario_min' => 1000,
			'salario_max' => 2000
		],
		[
			'nombrePuesto' => 'Analista de Reclutamiento',
			'descripcionPuesto' => 'Encargado del proceso de selección y reclutamiento de personal',
			'salario_min' => 800,
			'salario_max' => 1200
		],
		[
			'nombrePuesto' => 'Especialista en Nómina',
			'descripcionPuesto' => 'Responsable del procesamiento y control de nómina',
			'salario_min' => 700,
			'salario_max' => 1000
		],
		[
			'nombrePuesto' => 'Desarrollador Frontend',
			'descripcionPuesto' => 'Especialista en desarrollo de interfaces de usuario',
			'salario_min' => 1000,
			'salario_max' => 2000
		],
		[
			'nombrePuesto' => 'Desarrollador Backend',
			'descripcionPuesto' => 'Especialista en desarrollo de servicios y APIs',
			'salario_min' => 1000,
			'salario_max' => 2000
		],
		[
			'nombrePuesto' => 'Administrador de Sistemas',
			'descripcionPuesto' => 'Responsable de la gestión y mantenimiento de sistemas',
			'salario_min' => 1000,
			'salario_max' => 2000
		],
		[
			'nombrePuesto' => 'Ingeniero de Redes',
			'descripcionPuesto' => 'Especialista en infraestructura y redes',
			'salario_min' => 1000,
			'salario_max' => 2000
		]
	];

	public function run()
	{
		foreach ($this->puestos as $puesto) {
			Puesto::firstOrCreate(
				['nombrePuesto' => $puesto['nombrePuesto']],
				$puesto
			);
		}
	}
}
