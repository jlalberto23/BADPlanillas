import { Pagination } from '@/types'

export type Anio = AnioCalendarioTable & {
  planillas_count: number
}

export interface AniosPaginated extends Pagination {
  data: Anio[]
}
