import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DataTableColumnHeader } from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'
import { Link } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical } from 'lucide-react'
import RoleOptions from '../components/role-options'
import { Role } from './rolespage'

export const columns: ColumnDef<Role, string>[] = [
  {
    id: 'Actions',
    header: '',
    accessorFn: () => '',
    cell: ({ row: { original } }) => (
      <RoleOptions role={original}>
        <Button size="sm" variant="ghost" className="h-6">
          <EllipsisVertical className="size-3" />
        </Button>
      </RoleOptions>
    )
  },
  {
    id: 'Nombre',
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({
      row: {
        original: { id, name }
      }
    }) => <Link href={route('role.show', id)}>{name}</Link>
  },
  {
    id: 'Permisos',
    accessorFn: ({ permissions }) => permissions?.map((permission) => permission.description)?.join(', '),
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({
      row: {
        original: { permissions, name }
      }
    }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            {permissions.length}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>Lista de permisos para este rol</DialogDescription>
          <div className="h-72 overflow-auto">
            <ul>
              {permissions.map((permission) => (
                <div key={permission.id}>
                  <li className="text-sm">{permission.description}</li>
                  <Separator className="my-2" />
                </div>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    )
  },
  {
    id: 'Description',
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row: { original: r } }) => <p className="min-w-48 text-wrap">{r.description}</p>
  }
]
