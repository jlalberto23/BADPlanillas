import { Button } from '@/components/ui/button'
import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical, Plus } from 'lucide-react'
import CatalogsLayout from '../layout'
import { DepartamentoCreatingDialog } from './components/departamentosEmpresa-creating-dialog'
import DepartamentoOptions from './components/departamentosEmpresa-options'
import { Departamentos, DepartamentosPaginated } from './departamentoEmpresa'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de departamentos',
    href: '/catalogs/departamentosEmpresa'
  }
]

interface Props {
  departamentos: DepartamentosPaginated
}

export default function SeccionesPage({ departamentos }: Props) {
  const { data, ...pagination } = departamentos

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Departamentos" />
      <CatalogsLayout>
        <div className="flex h-full">
          <DataTablePaginated
            columns={columns}
            data={data}
            pagination={pagination}
            calcTotals={false}
            searchPlaceholder="Buscar por nombre"
            searchOptions={searchOptions}
            exportedFileName="Departamentos"
            headerContent={
              <DepartamentoCreatingDialog>
                <Button variant="outline" size="sm">
                  <Plus />
                </Button>
              </DepartamentoCreatingDialog>
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

const columns: ColumnDef<Departamentos, string>[] = [
  {
    id: 'Actions',
    header: '',
    cell: ({ row }) => (
      <DepartamentoOptions departamento={row.original}>
        <Button variant="ghost" size="sm">
          <EllipsisVertical className="size-3" />
        </Button>
      </DepartamentoOptions>
    )
  },
  {
    id: 'Departamento',
    accessorKey: 'nombreDepto',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Empleados',
    accessorKey: 'empleados_count',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
