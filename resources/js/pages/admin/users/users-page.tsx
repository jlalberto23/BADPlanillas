import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import AdminLayout from '../../../layouts/admin/layout'
import { User, UsersPaginated } from './types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de usuarios',
    href: '/admin/users'
  }
]

interface Props {
  usersPaginated: UsersPaginated
}

export default function UsersPage({ usersPaginated }: Props) {
  const { data, ...pagination } = usersPaginated

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Usuarios" />
      <AdminLayout>
        <div className="flex h-full">
          <DataTablePaginated
            columns={columns}
            data={data}
            pagination={pagination}
            calcTotals={false}
            searchPlaceholder="Buscar por nombre o correo"
            searchOptions={searchOptions}
            exportedFileName="Usuarios"
          />
        </div>
      </AdminLayout>
    </AppLayout>
  )
}

const searchOptions: DataTableSearchOption[] = [
  {
    value: 'is:verified',
    label: 'Solo cuentas verificadas'
  },
  {
    value: '-is:verified',
    label: 'Cuentas sin verificar'
  },
  { value: 'has:sessions', label: 'Con sesiones abiertas' },
  { value: '-has:sessions', label: 'Sin sesiones' },
  { value: '%.org', label: 'Buscar por dominio de correo' }
]

const columns: ColumnDef<User, string>[] = [
  {
    id: 'Actions',
    header: ''
  },
  {
    id: 'Nombre',
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({
      row: {
        original: { name, sessions_count }
      }
    }) => (
      <div>
        {name}
        {sessions_count ? (
          <div className={`ml-1 inline-block size-2 rounded-full ${sessions_count > 1 ? 'bg-blue-600' : 'bg-green-600'}`}></div>
        ) : null}
      </div>
    )
  },
  {
    id: 'Correo',
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Sessiones',
    accessorKey: 'sessions_count',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({
      row: {
        original: { sessions_count }
      }
    }) => (sessions_count ? sessions_count : <span className="text-muted-foreground">{sessions_count}</span>)
  },
  {
    id: 'Verificado',
    accessorKey: 'email_verified_at',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
