<?php

namespace Database\Seeders\PayrollSeeders;

use App\Models\Catalogs\Departamentoempresa;
use App\Models\Payroll\AnioCalendario;
use App\Models\Payroll\CentroCosto;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FakeCentroCostoSeeder extends Seeder
{
	public function run()
	{
		$anio = $this->command->ask('¿Para qué año desea crear los centros de costo?', date('Y'));

		$anioCalendario = AnioCalendario::where('anio', $anio)->first();

		if (!$anioCalendario) {
			$this->command->error("No existe un año calendario para el año {$anio}");
			return;
		}

		$departamentos = Departamentoempresa::all();

		DB::beginTransaction();
		try {
			foreach ($departamentos as $departamento) {
				CentroCosto::updateOrCreate(
					[
						'id_deptoEmpresa' => $departamento->id_deptoEmpresa,
						'id_anio' => $anioCalendario->id_anio
					],
					[
						'presupuesto_total' => rand(50, 100) * 1000
					]
				);
			}
			DB::commit();
			$this->command->info("Se han creado/actualizado los centros de costo para el año {$anio}");
		} catch (\Exception $e) {
			DB::rollBack();
			$this->command->error("Error al crear los centros de costo: " . $e->getMessage());
		}
	}
}
