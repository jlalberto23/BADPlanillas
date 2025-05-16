# BAD - Planillas

## Seeders del sistema

- Estructura de la empresa

```bash
php artisan db:seed --class="Database\Seeders\CatalogsSeeders\EstructuraSeeder"
```

- Roles y permisos

```bash
php artisan db:seed --class="Database\Seeders\AdminSeeders\AdminRolePermissionsSeeder"

php artisan db:seed --class="Database\Seeders\CatalogsSeeders\CatalogsRolePermissionsSeeder"
```

- Profesiones

```bash
php artisan db:seed --class="Database\Seeders\CatalogsSeeders\ProfesionesSeeder"
```

- Puestos

```bash
php artisan db:seed --class="Database\Seeders\CatalogsSeeders\PuestosSeeder"
```

- Tipos de conceptos

```bash
php artisan db:seed --class="Database\Seeders\PayrollSeeders\TiposConceptosSeeder"
```

## Example Seeders

- Empleados

```bash
php artisan db:seed --class="Database\Seeders\CatalogsSeeders\FakeEmpleadosSeeder"
```

- Users

```bash
php artisan db:seed --class="Database\Seeders\Examples\UsersSeeder"
```

- Permissions

```bash
php artisan db:seed --class="Database\Seeders\Examples\PermissionsSeeder"
```

- Roles

```bash
php artisan db:seed --class="Database\Seeders\Examples\RolesSeeder"
```
