
import ContentLayout from '@/layouts/app/app-content-layout'
import { PropsWithChildren } from "react"
import { NavItem } from '@/types'

const sidebarNavItems: NavItem[] = [
  {
    title: 'Profile',
    href: '/settings/profile',
    icon: null
  },
  {
    title: 'Password',
    href: '/settings/password',
    icon: null
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
    icon: null
  }
]

export default function SettingsLayout({ children }: PropsWithChildren) {
  return <ContentLayout title="Administración" description="Gestiona los roles y permisos de los usuarios" sidebarNavItems={sidebarNavItems}>
		{children}
	</ContentLayout>
}