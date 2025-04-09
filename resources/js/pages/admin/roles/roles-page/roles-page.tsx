import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import AdminLayout from '../../../../layouts/admin/layout'
import { Role, RolesPaginated } from './rolespage'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de roles',
    href: '/admin/roles'
  }
]

interface Props {
  rolesPaginated: RolesPaginated
}

export default function UsersPage({ rolesPaginated }: Props) {
  const { data, ...pagination } = rolesPaginated

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <AdminLayout>
        <div className="flex h-full">
          <DataTablePaginated
            columns={columns}
            data={data}
            pagination={pagination}
            calcTotals={false}
            searchPlaceholder="Buscar por nombre de rol"
            searchOptions={searchOptions}
            exportedFileName="Roles"
          />
        </div>
      </AdminLayout>
    </AppLayout>
  )
}

const searchOptions: DataTableSearchOption[] = [{ value: 'permission:', label: 'Buscar por permiso' }]

const columns: ColumnDef<Role, string>[] = [
  {
    id: 'Actions',
    header: ''
  },
  {
    id: 'Nombre',
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Description',
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Permisos',
    accessorKey: '',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
