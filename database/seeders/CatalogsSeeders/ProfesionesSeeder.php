<?php

namespace Database\Seeders\CatalogsSeeders;

use App\Models\Catalogs\Profesion;
use Illuminate\Database\Seeder;

class ProfesionesSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$profesiones = [
			'Ingeniero',
			'Doctor',
			'Abogado',
			'Contador',
			'Profesor',
			'Arquitecto',
			'Diseñador',
			'Enfermero',
			'Psicólogo',
			'Administrador',
		];

		foreach ($profesiones as $profesion) {
			Profesion::firstOrCreate([
				'nombreProfesion' => $profesion
			]);
		}
	}
}
