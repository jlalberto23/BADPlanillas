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

## Example Seeders

```bash
php artisan db:seed --class="Database\Seeders\Examples\UsersSeeder"

php artisan db:seed --class="Database\Seeders\Examples\PermissionsSeeder"

php artisan db:seed --class="Database\Seeders\Examples\RolesSeeder"
```
