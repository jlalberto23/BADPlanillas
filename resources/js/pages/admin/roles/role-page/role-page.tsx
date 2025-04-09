import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, Link } from '@inertiajs/react'
import AdminLayout from '../../../../layouts/admin/layout'
import { Role } from './rolepage'

interface Props {
  role: Role
}

export default function RolePage({ role }: Props) {
  if (!role) return <NotFoundRolePage />

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Gestión de roles',
      href: '/admin/roles'
    },
    {
      title: role.name,
      href: `/admin/roles/${role.id}`
    }
  ]
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <AdminLayout>
        <div className="flex h-full"></div>
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
