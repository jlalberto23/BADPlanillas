import { Pagination } from '@/types'

export type Departamentos = Pick<DepartamentoEmpresaTable, 'id_deptoEmpresa' | 'nombreDepto' | 'descripcionDepto' | 'id_jefeDepto'> & {
  empleados_count: number
}

export interface DepartamentosPaginated extends Pagination {
  data: Departamentos[]
}
