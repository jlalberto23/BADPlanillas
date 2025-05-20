import { Pagination } from '@/types'

export type CentroCosto = CentroCostoTable & {
  departamento: Pick<DepartamentoEmpresaTable, 'nombreDepto' | 'id_deptoEmpresa'>
  anio_calendario: Pick<AnioCalendarioTable, 'anio' | 'id_anio'>
}

export interface CentroCostosPaginated extends Pagination {
  data: CentroCosto[]
}
