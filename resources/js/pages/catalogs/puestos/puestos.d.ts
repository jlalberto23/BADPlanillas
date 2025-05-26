import { Pagination } from '@/types'

export type Puestos = Pick<PuestosTable, 'id_puesto' | 'nombrePuesto' | 'descripcionPuesto'> & {
  empleados_count: number
}

export interface PuestosPaginated extends Pagination {
  data: Puesto[]
}
