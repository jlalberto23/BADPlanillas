import { Button } from '@/components/ui/button'
import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { RefreshCw } from 'lucide-react'
import AdminLayout from '../../../layouts/admin/layout'
import { Session, SessionsPaginated } from './types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de sessiones',
    href: '/admin/sessions'
  }
]

interface Props {
  sessionsPaginated: SessionsPaginated
}

export default function UsersPage({ sessionsPaginated }: Props) {
  const { data, ...pagination } = sessionsPaginated
  console.log(data)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Sessions" />
      <AdminLayout>
        <div className="flex h-full w-full">
          <DataTablePaginated
            columns={columns}
            data={data}
            pagination={pagination}
            calcTotals={false}
            searchPlaceholder="Buscar por usuario"
            searchOptions={searchOptions}
            headerContent={<RefreshButton />}
            exportedFileName="Sesiones"
          />
        </div>
      </AdminLayout>
    </AppLayout>
  )
}

const searchOptions: DataTableSearchOption[] = [
  {
    value: 'has:user',
    label: 'Sessiones con usuarios logueados'
  },
  {
    value: '-has:user',
    label: 'Sessiones anónimas'
  },
  {
    value: 'ip:',
    label: 'Buscar por ip'
  },
  {
    value: 'agent:',
    label: 'Buscar por agente'
  }
]

const columns: ColumnDef<Session, string>[] = [
  {
    id: 'Actions',
    header: ''
  },
  {
    id: 'IP',
    accessorKey: 'ip_address',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'User',
    accessorFn: ({ user }) => (user ? `${user.email} - ${user.name}` : 'Anonimo'),
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({
      row: {
        original: { user }
      }
    }) =>
      user ? (
        <div>
          <p>{user.name}</p>
          <p className="text-xs">{user.email}</p>
        </div>
      ) : (
        <span className="text-muted-foreground">Anonimo</span>
      )
  },
  {
    id: 'Última actividad',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    accessorFn: ({ last_activity }) => new Date(last_activity * 1000).toLocaleString()
  },
  {
    id: 'User Agent',
    accessorKey: 'user_agent',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({
      row: {
        original: { user_agent }
      }
    }) => <p className="text-muted-foreground max-w-48 text-xs text-wrap">{user_agent}</p>
  }
]

const RefreshButton = () => (
  <Button size="sm" onClick={() => window.location.reload()}>
    <RefreshCw />
  </Button>
)
