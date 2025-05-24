import { Pagination } from '@/types'

export type Planilla = PlanillaTable & {
  empleados_count: number
  anio_calendario: AnioCalendarioTable
}

export type PlanillaDetalle = PlanillaDetalleTable & {
  planilla: Planilla
  empleado: Pick<EmpleadoTable, 'id_empleado' | 'carnet_empleado' | 'primer_nombre' | 'apellido_paterno' | 'estado' | 'salario_base' | 'sexo'>
}

export type Concepto = TipoConceptoTable

export type ConceptoEmpleado = ConceptoEmpleadoTable & {
  tipo_concepto: Concepto
}

export interface ConceptoEmpleadoPaginated extends Pagination {
  data: ConceptoEmpleado[]
}
