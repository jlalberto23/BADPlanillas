<?php

namespace Database\Seeders\PayrollSeeders;

use Illuminate\Database\Seeder;
use App\Models\Payroll\TipoConcepto;

class TiposConceptosSeeder extends Seeder
{
	private $tiposConceptos = [
		// INGRESOS
		['codigo' => 'ING_COM', 'tipo' => 'ingreso', 'nombre' => 'Comisión por venta', 'descripcion' => 'Ingreso por comisión generada en ventas.'],
		['codigo' => 'ING_BON', 'tipo' => 'ingreso', 'nombre' => 'Bonificación', 'descripcion' => 'Bonificación extraordinaria.'],
		['codigo' => 'ING_REG', 'tipo' => 'ingreso', 'nombre' => 'Regalías', 'descripcion' => 'Pagos por derechos o regalías.'],
		['codigo' => 'ING_VIA', 'tipo' => 'ingreso', 'nombre' => 'Viáticos', 'descripcion' => 'Pago por gastos de viaje.'],

		// DESCUENTOS
		['codigo' => 'DES_AFP', 'tipo' => 'descuento', 'nombre' => 'AFP', 'descripcion' => 'Descuento por aportes a AFP.'],
		['codigo' => 'DES_REN', 'tipo' => 'descuento', 'nombre' => 'Renta', 'descripcion' => 'Retención de renta.'],
		['codigo' => 'DES_CRE', 'tipo' => 'descuento', 'nombre' => 'Crédito personal', 'descripcion' => 'Descuento por crédito personal.'],
		['codigo' => 'DES_HIP', 'tipo' => 'descuento', 'nombre' => 'Crédito hipotecario', 'descripcion' => 'Pago por crédito de vivienda.'],
		['codigo' => 'DES_AHO', 'tipo' => 'descuento', 'nombre' => 'Ahorro personal', 'descripcion' => 'Aporte a cuenta de ahorro personal.'],
		['codigo' => 'DES_ALI', 'tipo' => 'descuento', 'nombre' => 'Cuota alimenticia', 'descripcion' => 'Pago por cuota alimenticia.'],
		['codigo' => 'DES_PRO', 'tipo' => 'descuento', 'nombre' => 'Procuraduría', 'descripcion' => 'Pago por resolución de procuraduría.'],
		['codigo' => 'DES_DON', 'tipo' => 'descuento', 'nombre' => 'Donación', 'descripcion' => 'Descuento por donación.'],

		// APORTES PATRONALES
		['codigo' => 'APT_ISSS', 'tipo' => 'aporte_patron', 'nombre' => 'ISSS Patronal', 'descripcion' => 'Aporte del patrono al ISSS.'],
		['codigo' => 'APT_AFP', 'tipo' => 'aporte_patron', 'nombre' => 'AFP Patronal', 'descripcion' => 'Aporte del patrono a la AFP.'],
		['codigo' => 'APT_OTR', 'tipo' => 'aporte_patron', 'nombre' => 'Otros aportes patronales', 'descripcion' => 'Otros aportes legales del patrono.'],
	];

	public function run()
	{
		foreach ($this->tiposConceptos as $tipo) {
			TipoConcepto::updateOrCreate(
				['codigo' => $tipo['codigo']],
				$tipo
			);
		}
	}
}
