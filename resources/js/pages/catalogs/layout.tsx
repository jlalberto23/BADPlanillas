import ContentLayout from '@/layouts/app/app-content-layout'
import { NavItem } from '@/types'
import { PropsWithChildren } from 'react'

const sidebarNavItems: NavItem[] = [
  {
    title: 'Empleados',
    href: '/catalogs/empleados',
    icon: null
  },
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
    title: 'Profesiones',
    href: '/catalogs/profesiones',
    icon: null
  },
  {
    title: 'Puestos',
    href: '/catalogs/puestos',
    icon: null
  }
]

export default function CatalogsLayout({ children }: PropsWithChildren) {
  return (
    <ContentLayout title="Administración" description="Gestiona los roles y permisos de los usuarios" sidebarNavItems={sidebarNavItems}>
      {children}
    </ContentLayout>
  )
}
