import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'
import { Link } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { Eye, MoreVertical } from 'lucide-react'
import { Role } from './rolespage'

export const columns: ColumnDef<Role, string>[] = [
  {
    id: 'Actions',
    header: '',
    accessorFn: () => '',
    cell: ({
      row: {
        original: { id }
      }
    }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={route('role.showById', id)}>
            <DropdownMenuItem>
              Ver
              <DropdownMenuShortcut>
                <Eye className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
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
    }) => <Link href={route('role.showById', id)}>{name}</Link>
  },
  {
    id: 'Description',
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} />
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
          <h4 className="mb-4 text-sm leading-none font-medium">Permisos de {name}</h4>
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
  }
]
