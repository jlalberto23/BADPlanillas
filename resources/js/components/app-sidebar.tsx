import { NavFooter } from '@/components/nav-footer'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { type NavItem } from '@/types'
import { Link } from '@inertiajs/react'
import { FileText, LayoutGrid, List, LockKeyhole } from 'lucide-react'
import { useEffect, useRef } from 'react'
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
  const hour = useRef<HTMLDivElement>(null)
  const date = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      hour.current!.textContent = new Date().toLocaleTimeString()
      date.current!.textContent = new Date().toLocaleDateString()
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
        <div className="text-muted-foreground mt-2 mb-2 text-center text-xs">
          <div ref={date}></div>
          <div ref={hour}></div>
        </div>

        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
