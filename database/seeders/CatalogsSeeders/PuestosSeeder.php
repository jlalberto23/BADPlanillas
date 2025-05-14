<?php

namespace Database\Seeders\CatalogsSeeders;

use Illuminate\Database\Seeder;
use App\Models\Catalogs\Puesto;

class PuestosSeeder extends Seeder
{
	private array $puestos = [
		[
			'nombrePuesto' => 'Gerente de Recursos Humanos',
			'descripcionPuesto' => 'Responsable de la gestión y dirección del departamento de RRHH'
		],
		[
			'nombrePuesto' => 'Analista de Reclutamiento',
			'descripcionPuesto' => 'Encargado del proceso de selección y reclutamiento de personal'
		],
		[
			'nombrePuesto' => 'Especialista en Nómina',
			'descripcionPuesto' => 'Responsable del procesamiento y control de nómina'
		],
		[
			'nombrePuesto' => 'Desarrollador Frontend',
			'descripcionPuesto' => 'Especialista en desarrollo de interfaces de usuario'
		],
		[
			'nombrePuesto' => 'Desarrollador Backend',
			'descripcionPuesto' => 'Especialista en desarrollo de servicios y APIs'
		],
		[
			'nombrePuesto' => 'Administrador de Sistemas',
			'descripcionPuesto' => 'Responsable de la gestión y mantenimiento de sistemas'
		],
		[
			'nombrePuesto' => 'Ingeniero de Redes',
			'descripcionPuesto' => 'Especialista en infraestructura y redes'
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
