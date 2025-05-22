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
        // Puedes crear roles individualmente aquí si lo deseas
        $roles = [
            'Administrador' => 'Rol completo con todos los permisos del sistema',
            'Administrador de Catálogos' => 'Gestiona catálogos del sistema',
            'Administrador de Planillas' => 'Gestiona planillas y reportes',
        ];

        foreach ($roles as $roleName => $description) {
            $role = Role::firstOrCreate(
                ['name' => $roleName],
                ['guard_name' => 'web', 'description' => $description]
            );

            // Asignar todos los permisos si es "Administrador"
            if ($roleName === 'Administrador') {
                foreach ($this->permissions as $name => $desc) {
                    $permission = Permission::firstOrCreate(
                        ['name' => $name],
                        ['guard_name' => 'web', 'description' => $desc]
                    );
                    $role->givePermissionTo($permission);
                }
            }
        }
    }

    public function assignRoleToUserByConsole(): void
    {
        $email = $this->command->ask('Ingrese el correo del usuario al que desea asignar el rol');
        $roleOption = $this->command->choice(
            'Seleccione el rol que desea asignar:',
            [
                '0 - Administrador',
                '1 - Administrador de Catálogos',
                '2 - Administrador de Planillas',
                '3 - Asignar todos los roles'
            ],
            0
        );

        $roleNames = [
            '0' => 'Administrador',
            '1' => 'Administrador de Catálogos',
            '2' => 'Administrador de Planillas',
        ];

        $userModel = config('auth.providers.users.model');
        $user = $userModel::where('email', $email)->first();

        if (!$user) {
            $this->command->error("Usuario con correo {$email} no encontrado.");
            return;
        }

        if (str_starts_with($roleOption, '3')) {
            foreach ($roleNames as $roleName) {
                $role = Role::where('name', $roleName)->first();
                if ($role) {
                    $user->assignRole($role);
                }
            }
            $this->command->info("Todos los roles asignados al usuario con correo {$email}.");
        } else {
            $selectedKey = substr($roleOption, 0, 1); // Extrae '0', '1' o '2'
            $roleName = $roleNames[$selectedKey] ?? null;

            if ($roleName) {
                $role = Role::where('name', $roleName)->first();
                if ($role) {
                    $user->assignRole($role);
                    $this->command->info("Rol '{$roleName}' asignado al usuario con correo {$email}.");
                } else {
                    $this->command->error("Rol '{$roleName}' no encontrado.");
                }
            }
        }
    }
}
