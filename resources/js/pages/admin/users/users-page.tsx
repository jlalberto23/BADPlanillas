import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, User } from '@/types'
import { Head } from '@inertiajs/react'
import AdminLayout from '../../../layouts/admin/layout'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de usuarios',
    href: '/admin/users'
  }
]

interface Props {
  users: User[]
}

export default function UsersPage({ users }: Props) {
  console.log(users)
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Usuarios" />
      <AdminLayout></AdminLayout>
    </AppLayout>
  )
}
