import { Button } from '@/components/ui/button'
import { DataTableColumnHeader, DataTablePaginated, DataTableSearchOption } from '@/components/ui/pagination'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, Link } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical, Plus } from 'lucide-react'
import CatalogsLayout from '../layout'
import EmpleadoOptions from './components/empleado-options'
import { Empleado, EmpleadosPaginated } from './empleados'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Empleados',
    href: route('catalogs.empleados.index')
  }
]

interface Props {
  empleados: EmpleadosPaginated
}

export default function EmpleadosPage({ empleados }: Props) {
  const { data, ...pagination } = empleados

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Empleados" />
      <CatalogsLayout>
        <div className="flex h-full">
          <DataTablePaginated
            columns={columns}
            data={data}
            pagination={pagination}
            calcTotals={false}
            searchPlaceholder="Buscar por nombre"
            searchOptions={searchOptions}
            exportedFileName="Empleados"
            headerContent={
              <Link href={route('catalogs.empleados.registrar')}>
                <Button variant="outline" size="sm">
                  <Plus />
                </Button>
              </Link>
            }
          />
        </div>
      </CatalogsLayout>
    </AppLayout>
  )
}

const searchOptions: DataTableSearchOption[] = [
  {
    value: 'profesion:',
    label: 'Buscar por profesión'
  },
  {
    value: 'puesto:',
    label: 'Buscar por puesto'
  },
  {
    value: 'seccion:',
    label: 'Buscar por sección'
  },
  {
    value: 'area:',
    label: 'Buscar por área'
  },
  {
    value: 'departamento:',
    label: 'Buscar por departamento'
  }
]

const columns: ColumnDef<Empleado, string>[] = [
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <EmpleadoOptions empleado={row.original}>
        <Button variant="ghost" size="sm">
          <EllipsisVertical className="size-3" />
        </Button>
      </EmpleadoOptions>
    )
  },
  {
    id: 'Carnet',
    accessorKey: 'carnet_empleado',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Profesión',
    accessorKey: 'profesion.nombreProfesion',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Puesto',
    accessorKey: 'puesto.nombrePuesto',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Primer Nombre',
    accessorKey: 'primer_nombre',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Segundo Nombre',
    accessorKey: 'segundo_nombre',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Apellido Paterno',
    accessorKey: 'apellido_paterno',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Apellido Materno',
    accessorKey: 'apellido_materno',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Apellido de Casada',
    accessorKey: 'apellido_casada',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Sección',
    accessorKey: 'seccion.nombreSeccion',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Área',
    accessorKey: 'area.nombreArea',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Departamento',
    accessorKey: 'area.departamento.nombreDepto',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Fecha de Nacimiento',
    accessorKey: 'fecha_nacimiento',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Fecha de Ingreso',
    accessorKey: 'fecha_ingreso',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'DUI',
    accessorKey: 'dui',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'NIT',
    accessorKey: 'nit',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Código ISSS',
    accessorKey: 'codigo_isss',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Código NUP',
    accessorKey: 'codigo_nup',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Salario Base',
    accessorKey: 'salario_base',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Estado Civil',
    accessorKey: 'estado_civil',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Sexo',
    accessorKey: 'sexo',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Correo Personal',
    accessorKey: 'correo_personal',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Correo Institucional',
    accessorKey: 'correo_institucional',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Estado',
    accessorKey: 'estado',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'Tipo de Documento',
    accessorKey: 'tipo_documento',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }
]
