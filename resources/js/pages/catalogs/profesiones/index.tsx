import { Button } from '@/components/ui/button'
import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical, Plus } from 'lucide-react'
import CatalogsLayout from '../layout'
import { ProfesionCreatingDialog } from './components/profesion-creating-dialog'
import ProfesionOptions from './components/profesion-options'
import { Profesion, ProfesionesPaginated } from './profesiones'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de profesiones',
    href: '/catalogs/profesiones'
  }
]

interface Props {
  profesiones: ProfesionesPaginated
}

export default function ProfesionesPage({ profesiones }: Props) {
  const { data, ...pagination } = profesiones

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profesiones" />
      <CatalogsLayout>
        <div className="flex h-full">
          <DataTablePaginated
            columns={columns}
            data={data}
            pagination={pagination}
            calcTotals={false}
            searchPlaceholder="Buscar por nombre"
            searchOptions={searchOptions}
            exportedFileName="Profesiones"
            headerContent={
              <ProfesionCreatingDialog>
                <Button variant="outline" size="sm">
                  <Plus />
                </Button>
              </ProfesionCreatingDialog>
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

const columns: ColumnDef<Profesion, string>[] = [
  {
    id: 'Actions',
    header: '',
    cell: ({ row }) => (
      <ProfesionOptions profesion={row.original}>
        <Button variant="ghost" size="sm">
          <EllipsisVertical className="size-3" />
        </Button>
      </ProfesionOptions>
    )
  },
  {
    id: 'Profesión',
    accessorKey: 'nombreProfesion',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Empleados',
    accessorKey: 'empleados_count',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
