import { Button } from '@/components/ui/button'
import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { formatCurrency } from '@/lib/formatCurrency'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical, Plus } from 'lucide-react'
import PayrollLayout from '../layout'
import { CentroCosto, CentroCostosPaginated } from './centroscosto'
import { CentroCostoCreatingDialog } from './components/centro-costo-creating-dialog'
import CentroCostoOptions from './components/centro-costo-options'
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Gestión de planillas',
    href: '/payroll/planillas'
  }
]

interface Props {
  centrosCosto: CentroCostosPaginated
}

export default function CentroCostosPage({ centrosCosto }: Props) {
  const { data, ...pagination } = centrosCosto

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Años calendario" />
      <PayrollLayout>
        <div className="flex h-full">
          <DataTablePaginated
            columns={columns}
            data={data}
            pagination={pagination}
            calcTotals={false}
            searchPlaceholder="Buscar por nombre"
            searchOptions={searchOptions}
            exportedFileName="Años calendario"
            headerContent={
              <CentroCostoCreatingDialog>
                <Button variant="outline" size="sm">
                  <Plus />
                </Button>
              </CentroCostoCreatingDialog>
            }
          />
        </div>
      </PayrollLayout>
    </AppLayout>
  )
}

const searchOptions: DataTableSearchOption[] = []

const columns: ColumnDef<CentroCosto, string>[] = [
  {
    id: 'Actions',
    header: '',
    cell: ({ row }) => (
      <CentroCostoOptions centroCosto={row.original}>
        <Button variant="ghost" size="sm">
          <EllipsisVertical className="size-3" />
        </Button>
      </CentroCostoOptions>
    )
  },
  {
    id: 'Año',
    accessorKey: 'anio_calendario.anio',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Departamento',
    accessorKey: 'departamento.nombreDepto',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Presupuesto total',
    accessorFn: ({ presupuesto_total }) => formatCurrency(presupuesto_total),
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Presupuesto restante',
    accessorFn: ({ presupuesto_restante }) => formatCurrency(presupuesto_restante),
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
