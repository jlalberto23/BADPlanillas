import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, Link } from '@inertiajs/react'
import { EllipsisVertical } from 'lucide-react'
import AdminLayout from '../../../../layouts/admin/layout'
import UserOptions from '../components/user-options'
import { User } from './userpage'

interface Props {
  user: User
}

export default function UserPage({ user }: Props) {
  if (!user) return <NotFoundUserPage />

  const { id, name, email, sessions_count, roles } = user

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Gestión de usuarios',
      href: '/admin/users'
    },
    {
      title: user.name,
      href: `/admin/users/${id}`
    }
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <AdminLayout>
        <div className="flex h-full flex-col">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold">
              {sessions_count ? (
                <abbr
                  className={`mr-2 inline-block size-3 rounded-full ${sessions_count > 1 ? 'bg-blue-600' : 'bg-green-600'}`}
                  title={`${sessions_count} sesiones`}
                ></abbr>
              ) : null}
              {name}
            </h3>
            <UserOptions user={user}>
              <Button variant="outline">
                <EllipsisVertical /> Opciones
              </Button>
            </UserOptions>
          </div>
          <p className="text-muted-foreground text-base">{email}</p>
          <ul className="bg-muted mt-3 min-h-48 list-inside list-disc rounded p-4 text-sm">
            {roles?.map(({ name, description }) => <li key={name}>{description}</li>)}
            {!roles || (!roles.length && <li className="text-muted-foreground list-none text-center">No se ha asignado ningún rol</li>)}
          </ul>
        </div>
      </AdminLayout>
    </AppLayout>
  )
}

function NotFoundUserPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Gestión de usuarios',
      href: '/admin/users'
    },
    {
      title: 'No encontrado',
      href: '/admin/users'
    }
  ]
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <AdminLayout>
        <div className="text-muted-foreground grid h-full content-center text-center">
          <h4 className="text-2xl font-semibold">Usuario no encontrado</h4>
          <p>
            <Link href="/admin/users">Regresar</Link>
          </p>
        </div>
      </AdminLayout>
    </AppLayout>
  )
}
