import { Pagination } from '@/types'

export type Areas = Pick<AreaEmpresaTable, 'id_area' | 'nombreArea' | 'descripcionArea' | 'id_deptoEmpresa' | 'id_jefeArea'> & {
  empleados_count: number
}

export interface AreasPaginated extends Pagination {
  data: Area[]
}
