import { Button } from '@/components/ui/button'
import { DataTableColumnHeader, DataTablePaginated } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import ContentLayout from '@/layouts/app/app-content-layout'
import { formatCurrency } from '@/lib/formatCurrency'
import { BreadcrumbItem } from '@/types'
import { MesNombres } from '@/types/mesEnum'
import { Head, Link } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical } from 'lucide-react'
import TotalCard from '../components/total-card'
import PayrollLayout from '../layout'
import PlanillaOptions from '../planillas/components/planilla-options'
import { Planilla, PlanillaDetalle, PlanillaDetallesPaginated } from './detalleplanilla'

interface Props {
  planilla: Planilla
  planillaDetalles: PlanillaDetallesPaginated
}

export default function PlanillasPage({ planilla, planillaDetalles }: Props) {
  if (!planilla || typeof planillaDetalles !== 'object') return <NotFoundPage />
  const { data, ...pagination } = planillaDetalles || {}

  const title = `${MesNombres[planilla.mes as keyof typeof MesNombres]} del ${planilla.anio_calendario.anio}`
  const description = `Periodo ${planilla.fecha_inicio} al ${planilla.fecha_fin}`

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Gestión de planillas',
      href: route('payroll.planillas.index')
    },
    {
      title,
      href: route('payroll.planillas.show', { id: planilla.id_planilla })
    }
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Planillas" />
      <ContentLayout title={title} description={description}>
        <div className="flex h-full flex-col gap-4 overflow-x-hidden lg:flex-row">
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-1">
            <TotalCard description="Total de ingresos" total={planilla.total_ingresos} />
            <TotalCard description="Total de descuentos" total={planilla.total_descuentos} />
            <TotalCard description="Total de aportes patronales" total={planilla.total_aporte_patronal} />
            <TotalCard
              description="Total neto"
              total={planilla.salario_neto_total}
              className="bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900"
            />
          </section>
          <div className="flex min-h-[400px] grow overflow-x-hidden">
            <DataTablePaginated
              columns={columns}
              data={data}
              pagination={pagination}
              calcTotals={false}
              exportedFileName="Planillas"
              canSearch={false}
              headerContent={
                <PlanillaOptions planilla={planilla}>
                  <Button variant="outline" size="sm">
                    <EllipsisVertical className="size-3" /> Opciones
                  </Button>
                </PlanillaOptions>
              }
            />
          </div>
        </div>
      </ContentLayout>
    </AppLayout>
  )
}

const columns: ColumnDef<PlanillaDetalle, string>[] = [
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
    id: 'Empleado',
    accessorKey: 'empleado.carnet',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Fecha de fin',
    accessorKey: 'fecha_fin',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Total de ingresos',
    accessorFn: ({ total_ingresos }) => formatCurrency(total_ingresos),
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Total de descuentos',
    accessorFn: ({ total_descuentos }) => formatCurrency(total_descuentos),
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Total de aportes patronales',
    accessorFn: ({ total_aporte_patronal }) => formatCurrency(total_aporte_patronal),
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Total neto',
    accessorFn: ({ salario_neto_total }) => formatCurrency(salario_neto_total),
    header: ({ column }) => <DataTableColumnHeader column={column} />
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
      <Head title="Planilla no encontrada" />
      <PayrollLayout>
        <div className="text-muted-foreground grid h-full content-center text-center">
          <h4 className="text-2xl font-semibold">Planilla no encontrada</h4>
          <p>
            <Link href={route('payroll.planillas.index')}>Regresar</Link>
          </p>
        </div>
      </PayrollLayout>
    </AppLayout>
  )
}
