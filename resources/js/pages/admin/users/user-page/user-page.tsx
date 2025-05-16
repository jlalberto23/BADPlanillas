import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, Link } from '@inertiajs/react'
import { EllipsisVertical, PencilIcon } from 'lucide-react'
import AdminLayout from '../../layout'
import UserOptions from '../components/user-options'
import { User } from './userpage'
import { useState } from 'react'
import UserRolesDialog from '../components/user-roles-dialog'
import { Role } from '../../roles/role-page/rolepage'

interface Props {
  user: User
  roles: Role[]
}

export default function UserPage({ user, roles }: Props) {
  const [isEditingRoles, setIsEditingRoles] = useState(false)
  
  if (!user) return <NotFoundUserPage />

  const { id, name, email, sessions_count, roles: userRoles } = user

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
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold">Roles asignados</h4>
              <Button variant="outline" size="sm" onClick={() => setIsEditingRoles(true)}>
                <PencilIcon className="mr-2 h-4 w-4" /> Editar roles
              </Button>
            </div>
            <ul className="bg-muted min-h-48 list-inside list-disc rounded p-4 text-sm">
              {userRoles?.map(({ name, description }) => <li key={name}>{description}</li>)}
              {!userRoles || (!userRoles.length && <li className="text-muted-foreground list-none text-center">No se ha asignado ningún rol</li>)}
            </ul>
          </div>
          <UserRolesDialog 
            user={user} 
            open={isEditingRoles} 
            onOpenChange={setIsEditingRoles}
            roles={roles}
          />
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
