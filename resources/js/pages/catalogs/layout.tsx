
import ContentLayout from '@/layouts/app/app-content-layout'
import { PropsWithChildren } from "react"
import { NavItem } from '@/types'

const sidebarNavItems: NavItem[] = [
  {
    title: 'Departamentos',
    href: '/catalogs/departamentos',
    icon: null
  },
  {
    title: 'Areas',
    href: '/catalogs/areas',
    icon: null
  },
  {
    title: 'Secciones',
    href: '/catalogs/secciones',
    icon: null
  },
  {
    title: 'Empleados',
    href: '/catalogs/empleados',
    icon: null
  },
  {
    title: 'Profesiones',
    href: '/catalogs/profesiones',
    icon: null
  }
]

export default function CatalogsLayout({ children }: PropsWithChildren) {
  return <ContentLayout title="Administración" description="Gestiona los roles y permisos de los usuarios" sidebarNavItems={sidebarNavItems}>
		{children}
	</ContentLayout>
}