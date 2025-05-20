import { StateBadge } from '@/components/state-badge'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { formatCurrency } from '@/lib/formatCurrency'
import { BreadcrumbItem } from '@/types'
import { MesNombres } from '@/types/mesEnum'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical, Plus } from 'lucide-react'
import PayrollLayout from '../layout'
import { PlanillaCreatingDialog } from './components/planilla-creating-dialog'
import PlanillaOptions from './components/planilla-options'
import { Planilla, PlanillasPaginated } from './planillas'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de planillas',
    href: '/payroll/planillas'
  }
]

interface Props {
  planillas: PlanillasPaginated
}

export default function PlanillasPage({ planillas }: Props) {
  const { data, ...pagination } = planillas

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Planillas" />
      <PayrollLayout>
        <div className="flex h-full">
          <DataTablePaginated
            columns={columns}
            data={data}
            pagination={pagination}
            calcTotals={false}
            searchPlaceholder="Buscar por nombre"
            searchOptions={searchOptions}
            exportedFileName="Planillas"
            headerContent={
              <PlanillaCreatingDialog>
                <Button variant="outline" size="sm">
                  <Plus />
                </Button>
              </PlanillaCreatingDialog>
            }
          />
        </div>
      </PayrollLayout>
    </AppLayout>
  )
}

const searchOptions: DataTableSearchOption[] = [
  {
    value: 'has:empleados',
    label: 'Con empleados'
  },
  {
    value: '-has:empleados',
    label: 'Sin empleados'
  }
]

const columns: ColumnDef<Planilla, string>[] = [
  {
    id: 'Actions',
    header: '',
    cell: ({ row }) => (
      <PlanillaOptions planilla={row.original}>
        <Button variant="ghost" size="sm">
          <EllipsisVertical className="size-3" />
        </Button>
      </PlanillaOptions>
    )
  },
  {
    id: 'Año',
    accessorKey: 'anio_calendario.anio',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Mes',
    accessorFn: ({ mes }) => MesNombres[mes as keyof typeof MesNombres],
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Estado',
    accessorKey: 'estado',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => <StateBadge state={row.original.estado} />
  },
  {
    id: 'Fecha de generación',
    accessorKey: 'fecha_generacion',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Fecha de inicio',
    accessorKey: 'fecha_inicio',
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
