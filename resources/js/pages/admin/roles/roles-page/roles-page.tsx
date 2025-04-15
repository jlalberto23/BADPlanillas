import { DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import AdminLayout from '../../../../layouts/admin/layout'
import { columns } from './roles-page-columns'
import { RolesPaginated } from './rolespage'

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

  console.log(data)

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
