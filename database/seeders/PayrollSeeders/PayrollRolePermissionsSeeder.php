<?php

namespace Database\Seeders\PayrollSeeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PayrollRolePermissionsSeeder extends Seeder
{
	private $permissions = [
		'payroll.anios.index' => 'Ver años calendario',
		'payroll.anios.store' => 'Crear años calendario',
		'payroll.anios.update' => 'Actualizar años calendario',
		'payroll.anios.destroy' => 'Eliminar años calendario',
		'payroll.centroscosto.index' => 'Ver centros de costo',
		'payroll.centroscosto.store' => 'Crear centros de costo',
		'payroll.centroscosto.update' => 'Actualizar centros de costo',
		'payroll.centroscosto.destroy' => 'Eliminar centros de costo',
		'payroll.planillas.index' => 'Ver planillas',
		'payroll.planillas.store' => 'Crear planillas',
		'payroll.planillas.show' => 'Ver detalle de planillas',
		'payroll.planillas.update' => 'Actualizar planillas',
		'payroll.planillas.destroy' => 'Eliminar planillas',
		'payroll.planillas.sincronizardetallesconempleados' => 'Sincronizar detalles con empleados',
		'payroll.planillas.detalles.show' => 'Ver detalle de planillas',
		'payroll.planillas.detalles.conceptos.show' => 'Ver conceptos de empleados',
	];

	private $role = 'Administrador de Planillas';
	private $description = 'Gestiona el módulo de planillas del sistema';

	public function run()
	{
		$role = Role::firstOrCreate(
			['name' => $this->role],
			['guard_name' => 'web', 'description' => $this->description]
		);

		foreach ($this->permissions as $name => $desc) {
			$permission = Permission::updateOrCreate(
				['name' => $name],
				['guard_name' => 'web', 'description' => $desc]
			);
			$role->givePermissionTo($permission);
		}
	}
}
