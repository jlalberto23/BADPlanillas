import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import PayrollLayout from '../layout'
import { Anio, AniosPaginated } from './anios'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de planillas',
    href: '/payroll/planillas'
  }
]

interface Props {
  anios: AniosPaginated
}

export default function AniosPage({ anios }: Props) {
  const { data, ...pagination } = anios

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Años calendario" />
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

const columns: ColumnDef<Anio, string>[] = [
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
    id: 'Estado',
    accessorKey: 'estado',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Planillas',
    accessorKey: 'planillas_count',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
