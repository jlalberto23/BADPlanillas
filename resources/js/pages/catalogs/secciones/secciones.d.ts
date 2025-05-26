import { Pagination } from '@/types'

export type Secciones = Pick<SeccionEmpresaTable, 'id_seccion' | 'nombreSeccion' | 'descripcionSeccion' | 'id_jefeSeccion' | 'id_area'> & {
  empleados_count: number
}

export interface SeccionesPaginated extends Pagination {
  data: Seccion[]
}
