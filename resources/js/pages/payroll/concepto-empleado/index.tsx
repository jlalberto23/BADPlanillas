import { DataTableColumnHeader, DataTablePaginated } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import ContentLayout from '@/layouts/app/app-content-layout'
import { BreadcrumbItem } from '@/types'
import { MesNombres } from '@/types/mesEnum'
import { Head, Link } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import TotalCard from '../components/total-card'
import PayrollLayout from '../layout'
import { ConceptoEmpleado, ConceptoEmpleadoPaginated, PlanillaDetalle } from './conceptoEmpleado'

interface Props {
  detalle: PlanillaDetalle
  conceptosEmpleado: ConceptoEmpleadoPaginated
}

export default function ConceptosPage({ detalle, conceptosEmpleado }: Props) {
  if (!detalle || typeof conceptosEmpleado !== 'object') return <NotFoundPage />
  const { data, ...pagination } = conceptosEmpleado || {}

  const title = `${detalle.empleado.carnet_empleado}`
  const exportedFileName = `${detalle.empleado.carnet_empleado} - ${MesNombres[detalle.planilla.mes as keyof typeof MesNombres]} del ${detalle.planilla.anio_calendario.anio}`
  const description = `${detalle.empleado.sexo === 'M' ? 'Empleado' : 'Empleada'} ${detalle.empleado.primer_nombre} ${detalle.empleado.apellido_paterno}`

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Gestión de planillas',
      href: route('payroll.planillas.index')
    },
    {
      title: `${MesNombres[detalle.planilla.mes as keyof typeof MesNombres]} del ${detalle.planilla.anio_calendario.anio}`,
      href: route('payroll.planillas.show', { id: detalle.planilla.id_planilla })
    },
    {
      title,
      href: route('payroll.planillas.show', { id: detalle.planilla.id_planilla })
    }
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Planillas" />
      <ContentLayout title={title} description={description}>
        <div className="flex h-full flex-col gap-4 overflow-x-hidden lg:flex-row">
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-1">
            <TotalCard description="Total de ingresos" total={detalle.total_ingresos} />
            <TotalCard description="Total de descuentos" total={detalle.total_descuentos} />
            <TotalCard description="Total de aportes patronales" total={detalle.total_aporte_patronal} />
            <TotalCard
              description="Total neto"
              total={detalle.salario_neto_total}
              className="bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900"
            />
          </section>
          <div className="flex min-h-[400px] grow overflow-x-hidden">
            <DataTablePaginated
              columns={columns}
              data={data}
              pagination={pagination}
              calcTotals={false}
              exportedFileName={exportedFileName}
              canSearch={false}
              // headerContent={
              //   <PlanillaOptions planilla={detalle.planilla}>
              //     <Button variant="outline" size="sm">
              //       <EllipsisVertical className="size-3" /> Opciones
              //     </Button>
              //   </PlanillaOptions>
              // }
            />
          </div>
        </div>
      </ContentLayout>
    </AppLayout>
  )
}

const columns: ColumnDef<ConceptoEmpleado, string | number>[] = [
  {
    id: 'Actions',
    header: ''
    // cell: ({ row }) => (
    //   <PlanillaOptions planilla={row.original}>
    //     <Button variant="ghost" size="sm">
    //       <EllipsisVertical className="size-3" />
    //     </Button>
    //   </PlanillaOptions>
    // )
  },
  {
    id: 'Concepto',
    accessorKey: 'tipo_concepto.nombre',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Fecha',
    accessorKey: 'fecha',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Ingresos',
    accessorFn: ({ tipo_concepto, monto }) => (tipo_concepto.tipo === 'ingreso' ? +monto : ''),
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({
      row: {
        original: { tipo_concepto, monto }
      }
    }) => (tipo_concepto.tipo === 'ingreso' ? <span className="text-green-600">{monto}</span> : '')
  },
  {
    id: 'Descuentos',
    accessorFn: ({ tipo_concepto, monto }) => (tipo_concepto.tipo === 'descuento' ? +monto : ''),
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({
      row: {
        original: { tipo_concepto, monto }
      }
    }) => (tipo_concepto.tipo === 'descuento' ? <span className="text-red-600">{monto}</span> : '')
  },
  {
    id: 'Aportes patronales',
    accessorFn: ({ tipo_concepto, monto }) => (tipo_concepto.tipo === 'aporte_patron' ? +monto : ''),
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({
      row: {
        original: { tipo_concepto, monto }
      }
    }) => (tipo_concepto.tipo === 'aporte_patron' ? <span className="text-blue-600">{monto}</span> : '')
  }
]

function NotFoundPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Gestión de planillas',
      href: route('payroll.planillas.index')
    },
    {
      title: 'No encontrado',
      href: route('payroll.planillas.index')
    }
  ]
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Detalle no encontrado" />
      <PayrollLayout>
        <div className="text-muted-foreground grid h-full content-center text-center">
          <h4 className="text-2xl font-semibold">Detalle no encontrado</h4>
          <p>
            <Link href={route('payroll.planillas.index')}>Regresar</Link>
          </p>
        </div>
      </PayrollLayout>
    </AppLayout>
  )
}
