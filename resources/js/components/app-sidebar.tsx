import { useEffect, useState } from 'react'
import { NavFooter } from '@/components/nav-footer'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { type NavItem } from '@/types'
import { Link } from '@inertiajs/react'
import { FileText, LayoutGrid, List, LockKeyhole } from 'lucide-react'
import AppLogo from './app-logo'

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid
  },
  {
    title: 'Admin',
    href: '/admin/users',
    icon: LockKeyhole
  },
  {
    title: 'Catálogos',
    href: route('catalogs.empleados.index'),
    icon: List
  },
  {
    title: 'Planillas',
    href: '/payroll/planillas',
    icon: FileText
  }
]

const footerNavItems: NavItem[] = []

export function AppSidebar() {
  const [fechaHora, setFechaHora] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setFechaHora(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />

        {/* Fecha y hora actual */}
        <div className="text-xs text-center text-gray-400 mt-2 mb-2">
          <p>📅 {fechaHora.toLocaleDateString()}</p>
          <p>⏰ {fechaHora.toLocaleTimeString()}</p>
        </div>

        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
