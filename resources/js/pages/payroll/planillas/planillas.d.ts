import { Pagination } from '@/types'

export type Planilla = PlanillaTable & {
  empleados_count: number
}

export interface PlanillasPaginated extends Pagination {
  data: Planilla[]
}
