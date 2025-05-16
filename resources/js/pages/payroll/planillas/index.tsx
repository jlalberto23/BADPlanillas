import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import PayrollLayout from '../layout'
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
            // TODO: Agregar el headerContent
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
    header: ''
    // TODO: Agregar el cell de opciones
    // cell: ({ row }) => (

    // )
  },
  {
    id: 'Año',
    accessorKey: 'anio',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Mes',
    accessorKey: 'mes',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Estado',
    accessorKey: 'estado',
    header: ({ column }) => <DataTableColumnHeader column={column} />
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
    accessorKey: 'total_ingresos',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Total de descuentos',
    accessorKey: 'total_descuentos',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Total de aportes patronales',
    accessorKey: 'total_aporte_patronal',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Total neto',
    accessorKey: 'total_neto',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
