<?php

namespace Database\Seeders\CatalogsSeeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class CatalogsRolePermissionsSeeder extends Seeder
{
	private $permissions = [
		'catalogs.profesiones.index' => 'Ver profesiones',
		'catalogs.profesiones.store' => 'Crear profesiones',
		'catalogs.profesiones.update' => 'Actualizar profesiones',
		'catalogs.profesiones.destroy' => 'Eliminar profesiones',
		'catalogs.empleados.index' => 'Ver empleados',
		'catalogs.empleados.store' => 'Crear empleados',
		'catalogs.empleados.update' => 'Actualizar empleados',
		'catalogs.empleados.destroy' => 'Eliminar empleados',
	];

	private $role = 'Administrador de Catálogos';
	private $description = 'Gestiona los catálogos del sistema';

	public function run()
	{
		$role = Role::firstOrCreate(
			['name' => $this->role],
			['guard_name' => 'web', 'description' => $this->description]
		);

		foreach ($this->permissions as $name => $desc) {
			$permission = Permission::firstOrCreate(
				['name' => $name],
				['guard_name' => 'web', 'description' => $desc]
			);
			$role->givePermissionTo($permission);
		}
	}
}
