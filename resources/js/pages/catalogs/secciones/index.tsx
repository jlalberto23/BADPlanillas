import { Button } from '@/components/ui/button'
import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical, Plus } from 'lucide-react'
import CatalogsLayout from '../layout'
import { SeccionCreatingDialog } from './components/seccion-creating-dialog'
import SeccionOptions from './components/seccion-options'
import { Secciones, SeccionesPaginated } from './secciones'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de secciones',
    href: '/catalogs/seccion'
  }
]

interface Props {
  secciones: SeccionesPaginated
}

export default function SeccionesPage({ secciones }: Props) {
  const { data, ...pagination } = secciones

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Secciones" />
      <CatalogsLayout>
        <div className="flex h-full">
          <DataTablePaginated
            columns={columns}
            data={data}
            pagination={pagination}
            calcTotals={false}
            searchPlaceholder="Buscar por nombre"
            searchOptions={searchOptions}
            exportedFileName="Secciones"
            headerContent={
              <SeccionCreatingDialog>
                <Button variant="outline" size="sm">
                  <Plus />
                </Button>
              </SeccionCreatingDialog>
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

const columns: ColumnDef<Secciones, string>[] = [
  {
    id: 'Actions',
    header: '',
    cell: ({ row }) => (
      <SeccionOptions seccion={row.original}>
        <Button variant="ghost" size="sm">
          <EllipsisVertical className="size-3" />
        </Button>
      </SeccionOptions>
    )
  },
  {
    id: 'Seccion',
    accessorKey: 'nombreSeccion',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Empleados',
    accessorKey: 'empleados_count',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
