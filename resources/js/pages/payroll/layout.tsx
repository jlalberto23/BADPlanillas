import ContentLayout from '@/layouts/app/app-content-layout'
import { NavItem } from '@/types'
import { PropsWithChildren } from 'react'

const sidebarNavItems: NavItem[] = [
  {
    title: 'Planillas',
    href: '/payroll/planillas',
    icon: null
  },
  {
    title: 'Años Calendario',
    href: '/payroll/anios',
    icon: null
  },
  {
    title: 'Centros de Costo',
    href: '/payroll/centros-costo',
    icon: null
  }
]

export default function PayrollLayout({ children }: PropsWithChildren) {
  return (
    <ContentLayout title="Planillas" description="Gestiona el módulo de planillas del sistema" sidebarNavItems={sidebarNavItems}>
      {children}
    </ContentLayout>
  )
}
