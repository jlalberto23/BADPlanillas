import { StateBadge } from '@/components/state-badge'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical, Plus } from 'lucide-react'
import PayrollLayout from '../layout'
import { Anio, AniosPaginated } from './anios'
import { AnioCreatingDialog } from './components/anio-creating-dialog'
import AnioOptions from './components/anio-options'
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
            exportedFileName="Años calendario"
            headerContent={
              <AnioCreatingDialog>
                <Button variant="outline" size="sm">
                  <Plus />
                </Button>
              </AnioCreatingDialog>
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

const columns: ColumnDef<Anio, string>[] = [
  {
    id: 'Actions',
    header: '',
    cell: ({ row }) => (
      <AnioOptions anio={row.original}>
        <Button variant="ghost" size="sm">
          <EllipsisVertical className="size-3" />
        </Button>
      </AnioOptions>
    )
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
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => <StateBadge state={row.original.estado} />
  },
  {
    id: 'Planillas',
    accessorKey: 'planillas_count',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
