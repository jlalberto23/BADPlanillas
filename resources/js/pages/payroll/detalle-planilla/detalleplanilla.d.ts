import { Pagination } from '@/types'

export type Planilla = PlanillaTable & {
  empleados_count: number
  anio_calendario: AnioCalendarioTable
}

export type PlanillaDetalle = PlanillaDetalleTable & {
  empleado: Pick<EmpleadoTable, 'id_empleado' | 'carnet_empleado' | 'primer_nombre' | 'apellido_paterno' | 'estado' | 'salario_base'>
}

export interface PlanillaDetallesPaginated extends Pagination {
  data: PlanillaDetalle[]
}
