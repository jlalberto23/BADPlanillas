import { Pagination } from '@/types'

export type Empleado = EmpleadoTable & {
  profesion: Profesion | null
  puesto: Puesto | null
  seccion: Seccion | null
  area:
    | (Area & {
        departamento: Departamento | null
      })
    | null
}

export interface EmpleadosPaginated extends Pagination {
  data: Empleado[]
}
