# TODO

## General

- [ ] Aplicar paleta de colores
- [ ] Agregar home page
- [ ] Agregar favicon

## Admin

- [x] ⚠️ Probar actualización de permisos en roles
- [x] Agregar creación de roles
- [ ] Agregar eliminación de sessiones
- [ ] Aplicar permisos a rutas
- [ ] Aplicar permisos a componentes
- [ ] Asignar roles a usuarios

## Catalogs

- [ ] Crud de profesiones
- [ ] Crud de puestos
- [ ] Crud de departamentos
- [ ] Crud de areas
- [ ] Crud de secciones
- [ ] Crud de empleados
  - [x] Mostrar más columnas (profesiones, puestos, secciones, departamentos, areas)
  - [x] Agregar búsqueda por profesiones, puestos, secciones, departamentos, areas
  - [ ] Crear empleado
  - [ ] Editar empleado
  - [ ] Eliminar empleado (con verificación de que no tenga registros asociados)

## Payroll

- [ ] Crud de anios calendario
- [ ] Crud de planillas
- [ ] Crud de planilla detalles
- [ ] Crud de conceptos empleados

## Procedimientos, Funciones y Triggers

- Trigger para poner en inactivo el anio cuando se genera la planilla del mes 12
- Trigger para no permitir generar una planilla si el anio no esta activo
- Trigger para no permitir generar una planilla si ya existe una planilla para ese anio y mes
- Trigger para no permitir crear un anio calendario si hay un anio calendario activo

- Procedimiento para calcular el total de ingresos, descuentos, aportes patronales y salario neto total de un detalle de planilla
- Procedimiento para calcular el total de ingresos, descuentos, aportes patronales y salario neto total de una planilla

- Procedimiento para calcular ISSS
- Procedimiento para calcular AFP
- Procedimiento para calcular Renta
