# BAD - Planillas

## Seeders del sistema

- Estructura de la empresa

```bash
php artisan db:seed --class="Database\Seeders\CatalogsSeeders\EstructuraSeeder"
```

- Roles y permisos

```bash
php artisan db:seed --class="Database\Seeders\AdminSeeders\AdminRolePermissionsSeeder"
```

- Profesiones

```bash
php artisan db:seed --class="Database\Seeders\CatalogsSeeders\ProfesionesSeeder"
```

- Puestos

```bash
php artisan db:seed --class="Database\Seeders\CatalogsSeeders\PuestosSeeder"
```

## Example Seeders

```bash
php artisan db:seed --class="Database\Seeders\Examples\UsersSeeder"

php artisan db:seed --class="Database\Seeders\Examples\PermissionsSeeder"

php artisan db:seed --class="Database\Seeders\Examples\RolesSeeder"
```
