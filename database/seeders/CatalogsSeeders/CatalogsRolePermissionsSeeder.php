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
		'catalogs.puestos.index' => 'Ver puestos',
		'catalogs.puestos.store' => 'Crear puestos',
		'catalogs.puestos.update' => 'Actualizar puestos',
		'catalogs.puestos.destroy' => 'Eliminar puestos',
		'catalogs.secciones.index' => 'Ver secciones',
		'catalogs.secciones.store' => 'Crear secciones',
		'catalogs.secciones.update' => 'Actualizar secciones',
		'catalogs.secciones.destroy' => 'Eliminar secciones',
		'catalogs.departamentosEmpresa.index' => 'Ver departamentos',
		'catalogs.departamentosEmpresa.store' => 'Crear departamentos',
		'catalogs.departamentosEmpresa.update' => 'Actualizar departamentos',
		'catalogs.departamentosEmpresa.destroy' => 'Eliminar departamentos',
		'catalogs.areas.index' => 'Ver areas',
		'catalogs.areas.store' => 'Crear areas',
		'catalogs.areas.update' => 'Actualizar areas',
		'catalogs.areas.destroy' => 'Eliminar areas',
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
