<?php

namespace Database\Seeders\CatalogsSeeders;

use App\Models\Catalogs\Empleado;
use App\Models\Catalogs\Profesion;
use App\Models\Catalogs\Puesto;
use App\Models\Catalogs\Seccionempresa;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class FakeEmpleadosSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$action = $this->command->choice(
			'¿Qué desea hacer?',
			['Crear empleados de ejemplo', 'Eliminar empleados de ejemplo'],
			0
		);

		if ($action === 'Crear empleados de ejemplo') {
			$this->create();
		} elseif ($action === 'Eliminar empleados de ejemplo') {
			$this->clear();
		}
	}

	private function create()
	{
		$faker = Faker::create('es_ES');

		// Verificar que existan registros en las tablas relacionadas
		$profesiones = Profesion::all();
		$puestos = Puesto::all();
		$secciones = Seccionempresa::all();

		if ($profesiones->isEmpty() || $puestos->isEmpty() || $secciones->isEmpty()) {
			$this->command->error('Faltan datos en las tablas relacionadas (profesiones, puestos o secciones).');
			return;
		}

		$quantity = (int) $this->command->ask('¿Cuántos empleados de ejemplo desea crear?', 10);

		for ($i = 0; $i < $quantity; $i++) {
			$genero = $faker->randomElement(['M', 'F']);
			$apellidoCasada = ($genero === 'F' && $faker->boolean(20)) ? $faker->lastName : null;

			Empleado::create([
				'primer_nombre' => $faker->firstName($genero === 'M' ? 'male' : 'female'),
				'segundo_nombre' => $faker->firstName($genero === 'M' ? 'male' : 'female'),
				'apellido_paterno' => $faker->lastName,
				'apellido_materno' => $faker->lastName,
				'apellido_casada' => $apellidoCasada,
				'fecha_nacimiento' => $faker->dateTimeBetween('-60 years', '-20 years')->format('Y-m-d'),
				'fecha_ingreso' => $faker->dateTimeBetween('-10 years', 'now')->format('Y-m-d'),
				'dui' => $faker->numerify('#########'),
				'nit' => $faker->numerify('##############'),
				'codigo_isss' => $faker->numerify('#########'),
				'codigo_nup' => $faker->numerify('#########'),
				'salario_base' => $faker->randomFloat(2, 400, 3000),
				'estado_civil' => $faker->randomElement(['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a']),
				'sexo' => $genero,
				'correo_personal' => $faker->unique()->safeEmail,
				'correo_institucional' => $faker->unique()->userName . '@empresa.com',
				'estado' => 'activo',
				'carnet_empleado' => $faker->unique()->numerify('EMP####'),
				'tipo_documento' => 'DUI',
				'id_profesion' => $profesiones->random()->id_profesion,
				'id_puesto' => $puestos->random()->id_puesto,
				'id_seccion' => $secciones->random()->id_seccion,
			]);
		}

		$this->command->info("Se han creado $quantity empleados de ejemplo exitosamente.");
	}

	private function clear()
	{
		$count = Empleado::where('carnet_empleado', 'like', 'EMP%')->delete();

		if ($count > 0) {
			$this->command->info("Se han eliminado $count empleados de ejemplo.");
		} else {
			$this->command->info('No se encontraron empleados de ejemplo para eliminar.');
		}
	}
}
