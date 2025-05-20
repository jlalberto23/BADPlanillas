import { Pagination } from '@/types'

export type Planilla = PlanillaTable & {
  empleados_count: number
  anio_calendario: AnioCalendarioTable
}

export type PlanillaDetalle = PlanillaDetalleTable & {
  empleado: EmpleadoTable
}

export interface PlanillaDetallesPaginated extends Pagination {
  data: PlanillaDetalle[]
}
