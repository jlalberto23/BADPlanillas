<?php

namespace Database\Seeders\AdminSeeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminRolePermissionsSeeder extends Seeder
{
	private $permissions = [
		'admin.users.view' => 'Ver usuarios',
		'admin.users.create' => 'Crear usuarios',
		'admin.users.show' => 'Mostrar usuario',
		'admin.users.update' => 'Actualizar usuario',
		'admin.users.delete' => 'Eliminar usuario',
		'admin.users.roles.sync' => 'Sincronizar roles de usuario',
		'admin.roles.view' => 'Ver roles',
		'admin.roles.create' => 'Crear roles',
		'admin.roles.show' => 'Mostrar rol',
		'admin.roles.update' => 'Actualizar rol',
		'admin.roles.delete' => 'Eliminar rol',
		'admin.roles.permissions.sync' => 'Sincronizar permisos de rol',
		'admin.sessions.view' => 'Ver sesiones',
		'admin.sessions.delete' => 'Eliminar sesiones',
		'admin.data.permissions.view' => 'Ver permisos de datos',
	];

	private $role = 'Administrador';
	private $description = 'Gestiona los usuarios y parámetros del sistema';

	public function run()
	{
		$option = $this->command->choice(
			'¿Qué acción desea realizar?',
			['Crear rol y permisos', 'Asignar rol a usuario'],
			0
		);

		if ($option === 'Crear rol y permisos') {
			$this->createRoleAndPermissions();
			$this->command->info('Rol y permisos creados correctamente.');
		} else {
			$this->assignRoleToUserByConsole();
		}
	}

	public function createRoleAndPermissions(): void
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

	public function assignRoleToUserByConsole(): void
	{
		$email = $this->command->ask('Ingrese el correo del usuario al que desea asignar el rol Administrador');
		$userModel = config('auth.providers.users.model');
		$user = $userModel::where('email', $email)->first();

		if ($user) {
			$role = Role::where('name', $this->role)->first();
			if ($role) {
				$user->assignRole($role);
				$this->command->info("Rol '{$this->role}' asignado al usuario con correo {$email}.");
			} else {
				$this->command->error("Rol '{$this->role}' no encontrado.");
			}
		} else {
			$this->command->error("Usuario con correo {$email} no encontrado.");
		}
	}
}
