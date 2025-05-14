import { Button } from '@/components/ui/button'
import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AdminLayout from '../../layout'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, Link } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical, Plus } from 'lucide-react'
import { UserCreatingDialog } from '../components/user-creating-dialog'
import UserOptions from '../components/user-options'
import { User, UsersPaginated } from './userspage'

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
            headerContent={
              <UserCreatingDialog>
                <Button variant="outline" size="sm">
                  <Plus />
                </Button>
              </UserCreatingDialog>
            }
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
    header: '',
    cell: ({ row: { original } }) => (
      <UserOptions user={original}>
        <Button size="sm" variant="ghost" className="h-6">
          <EllipsisVertical className="size-3" />
        </Button>
      </UserOptions>
    )
  },
  {
    id: 'Nombre',
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row: { original: u } }) => (
      <Link href={route('user.show', u.id)}>
        {u.name}
        {u.sessions_count ? (
          <div className={`ml-1 inline-block size-2 rounded-full ${u.sessions_count > 1 ? 'bg-blue-600' : 'bg-green-600'}`}></div>
        ) : null}
      </Link>
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
    cell: ({ row: { original: u } }) => (u.sessions_count ? u.sessions_count : <span className="text-muted-foreground">{u.sessions_count}</span>)
  },
  {
    id: 'Verificado',
    accessorKey: 'email_verified_at',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
