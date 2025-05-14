
import ContentLayout from '@/layouts/app/app-content-layout'
import { PropsWithChildren } from "react"
import { NavItem } from '@/types'

const sidebarNavItems: NavItem[] = [
  {
    title: 'Usuarios',
    href: '/admin/users',
    icon: null
  },
  {
    title: 'Sesiones',
    href: '/admin/sessions',
    icon: null
  },
  {
    title: 'Roles',
    href: '/admin/roles',
    icon: null
  }
]

export default function AdminLayout({ children }: PropsWithChildren) {
  return <ContentLayout title="Administración" description="Gestiona los roles y permisos de los usuarios" sidebarNavItems={sidebarNavItems}>
		{children}
	</ContentLayout>
}