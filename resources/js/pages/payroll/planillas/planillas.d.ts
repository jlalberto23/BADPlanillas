import { Pagination } from '@/types'

export type Planilla = PlanillaTable & {
  empleados_count: number
  anio_calendario: AnioCalendarioTable
}

export interface PlanillasPaginated extends Pagination {
  data: Planilla[]
}
