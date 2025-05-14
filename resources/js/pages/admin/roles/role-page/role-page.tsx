import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, Link } from '@inertiajs/react'
import { EllipsisVertical } from 'lucide-react'
import AdminLayout from '../../layout'
import RoleOptions from '../components/role-options'
import { Role } from './rolepage'

interface Props {
  role: Role
}

export default function RolePage({ role }: Props) {
  if (!role) return <NotFoundRolePage />

  const { description, id, name, permissions } = role

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Gestión de roles',
      href: '/admin/roles'
    },
    {
      title: role.name,
      href: `/admin/roles/${id}`
    }
  ]
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <AdminLayout>
        <div className="flex h-full flex-col">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold">{name}</h3>
            <RoleOptions role={role}>
              <Button variant="outline">
                <EllipsisVertical /> Opciones
              </Button>
            </RoleOptions>
          </div>
          <p className="text-muted-foreground">{description}</p>
          <ul className="bg-muted mt-3 min-h-48 list-inside list-disc rounded p-4 text-sm">
            {permissions?.map(({ name, description }) => <li key={name}>{description}</li>)}
          </ul>
        </div>
      </AdminLayout>
    </AppLayout>
  )
}

function NotFoundRolePage() {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Gestión de roles',
      href: '/admin/roles'
    },
    {
      title: 'No encontrado',
      href: `/admin/roles`
    }
  ]
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <AdminLayout>
        <div className="text-muted-foreground grid h-full content-center text-center">
          <h4 className="text-2xl font-semibold">Rol no encontrado</h4>
          <p>
            <Link href="/admin/roles">Regresar</Link>
          </p>
        </div>
      </AdminLayout>
    </AppLayout>
  )
}
