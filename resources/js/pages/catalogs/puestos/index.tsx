import { Button } from '@/components/ui/button'
import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical, Plus } from 'lucide-react'
import CatalogsLayout from '../layout'
import { PuestoCreatingDialog } from './components/puesto-creating-dialog'
import PuestoOptions from './components/puesto-options'
import { Puesto, PuestosPaginated } from './puestos'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de puestos',
    href: '/catalogs/puestos'
  }
]

interface Props {
  puestos: PuestosPaginated
}

export default function PuestosPage({ puestos }: Props) {
  const { data, ...pagination } = puestos

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Puestos" />
      <CatalogsLayout>
        <div className="flex h-full">
          <DataTablePaginated
            columns={columns}
            data={data}
            pagination={pagination}
            calcTotals={false}
            searchPlaceholder="Buscar por nombre"
            searchOptions={searchOptions}
            exportedFileName="Puestos"
            headerContent={
              <PuestoCreatingDialog>
                <Button variant="outline" size="sm">
                  <Plus />
                </Button>
              </PuestoCreatingDialog>
            }
          />
        </div>
      </CatalogsLayout>
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

const columns: ColumnDef<Puesto, string>[] = [
  {
    id: 'Actions',
    header: '',
    cell: ({ row }) => (
      <PuestoOptions puesto={row.original}>
        <Button variant="ghost" size="sm">
          <EllipsisVertical className="size-3" />
        </Button>
      </PuestoOptions>
    )
  },
  {
    id: 'Puesto',
    accessorKey: 'nombrePuesto',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Empleados',
    accessorKey: 'empleados_count',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
