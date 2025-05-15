import { Pagination } from '@/types'

export type Empleado = EmpleadoTable & {
  profesion: Profesion | null
}

export interface EmpleadosPaginated extends Pagination {
  data: Empleado[]
}
