import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { type BreadcrumbItem } from '@/types'
import { BadgeCheck, Users, FileText } from 'lucide-react'

interface DashboardProps {
  empleadosActivos: number
  planillasCreadas: number
  planillasConError?: number
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard'
  }
]

export default function Dashboard({
  empleadosActivos,
  planillasCreadas,
  planillasConError = 0
}: DashboardProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        {/* Indicadores */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Empleados activos" value={empleadosActivos} icon={<Users className="h-6 w-6 text-blue-500" />} />
          <Card title="Planillas creadas" value={planillasCreadas} icon={<FileText className="h-6 w-6 text-green-500" />} />
          <Card title="Planillas con error" value={planillasConError} icon={<BadgeCheck className="h-6 w-6 text-red-500" />} />
        </div>

        {/* Placeholder para futuros contenidos */}
        <div className="border border-dashed rounded-xl min-h-[300px] flex items-center justify-center text-muted-foreground">
          TradeX 2025
        </div>
      </div>
    </AppLayout>
  )
}

function Card({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-4 flex items-center gap-4 shadow-sm">
      <div className="bg-muted p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  )
}
