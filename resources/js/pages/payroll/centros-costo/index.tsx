import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { formatCurrency } from '@/lib/formatCurrency'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import PayrollLayout from '../layout'
import { CentroCosto, CentroCostosPaginated } from './centroscosto'
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
            // headerContent={
            //   <AnioCreatingDialog>
            //     <Button variant="outline" size="sm">
            //       <Plus />
            //     </Button>
            //   </AnioCreatingDialog>
            // }
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
    header: ''
    // cell: ({ row }) => (
    //   <AnioOptions anio={row.original}>
    //     <Button variant="ghost" size="sm">
    //       <EllipsisVertical className="size-3" />
    //     </Button>
    //   </AnioOptions>
    // )
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
    accessorFn: ({ presupuesto_total }) => formatCurrency(+presupuesto_total),
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Presupuesto restante',
    accessorFn: ({ presupuesto_restante }) => formatCurrency(+presupuesto_restante),
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
