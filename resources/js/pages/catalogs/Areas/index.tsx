import { Button } from '@/components/ui/button'
import { DataTableColumnHeader, DataTablePaginated } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical, Plus } from 'lucide-react'
import CatalogsLayout from '../layout'
import { AreaCreatingDialog } from './components/area-creating-dialog'
import AreaOptions from './components/area-options'
import { Areas, AreasPaginated } from './areas'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de areas',
    href: '/catalogs/areas'
  }
]

interface Props {
  areas: AreasPaginated
}

export default function AreasPage({ areas }: Props) {
  const { data, ...pagination } = areas

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Areas" />
      <CatalogsLayout>
        <div className="flex h-full">
          <DataTablePaginated
            columns={columns}
            data={data}
            pagination={pagination}
            calcTotals={false}
            searchPlaceholder="Buscar por nombre"
            //searchOptions={searchOptions}
            exportedFileName="Areas"
            headerContent={
              <AreaCreatingDialog>
                <Button variant="outline" size="sm">
                  <Plus />
                </Button>
              </AreaCreatingDialog>
            }
          />
        </div>
      </CatalogsLayout>
    </AppLayout>
  )
}

/* const searchOptions: DataTableSearchOption[] = [
  {
    value: 'has:empleados',
    label: 'Con empleados'
  },
  {
    value: '-has:empleados',
    label: 'Sin empleados'
  }
] */

const columns: ColumnDef<Areas, string>[] = [
  {
    id: 'Actions',
    header: '',
    cell: ({ row }) => (
      <AreaOptions area={row.original}>
        <Button variant="ghost" size="sm">
          <EllipsisVertical className="size-3" />
        </Button>
      </AreaOptions>
    )
  },
  {
    id: 'Area',
    accessorKey: 'nombreArea',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
/*   {
    id: 'Empleados',
    accessorKey: 'empleados_count',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  } */
]
