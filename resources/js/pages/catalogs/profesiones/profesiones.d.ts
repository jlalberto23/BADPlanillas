import { Pagination } from '@/types'

export type Profesion = Pick<ProfesionTable, 'id_profesion' | 'nombreProfesion'> & {
  empleados_count: number
}

export interface ProfesionesPaginated extends Pagination {
  data: Profesion[]
}
