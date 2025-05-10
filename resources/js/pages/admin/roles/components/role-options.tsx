import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Link } from '@inertiajs/react'
import { Eye, ListChecks, Pencil, Trash } from 'lucide-react'
import { ReactNode, useRef, useState } from 'react'
import { RoleAssignPermissions } from './role-assign-permisssions'
import { RoleDeletingDialog } from './role-deleting-dialog'
import { RoleEditingDialog } from './role-editing-dialog'

type Props = {
  role: Pick<RoleTable, 'id' | 'name' | 'description'> & { permissions?: Pick<PermissionTable, 'id' | 'name'>[] }
  children: ReactNode
}

export default function RoleOptions({ role, children }: Props) {
  const [open, setOpen] = useState(false)
  const editarBtn = useRef<HTMLButtonElement>(null)
  const eliminarBtn = useRef<HTMLButtonElement>(null)
  const assignPermissionsBtn = useRef<HTMLButtonElement>(null)

  const handleEditClick = () => {
    editarBtn.current?.click()
    setOpen(false)
  }
  const handleDeleteClick = () => {
    eliminarBtn.current?.click()
    setOpen(false)
  }

  const handleAssignPermissionsClick = () => {
    assignPermissionsBtn.current?.click()
    setOpen(false)
  }

  return (
    <section className="flex">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={route('role.showById', role.id)}>
            <DropdownMenuItem>
              Ver
              <DropdownMenuShortcut>
                <Eye className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleEditClick}>
            Editar
            <DropdownMenuShortcut>
              <Pencil />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleAssignPermissionsClick}>
            Asignar permisos
            <DropdownMenuShortcut>
              <ListChecks />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDeleteClick} variant="destructive">
            Eliminar
            <DropdownMenuShortcut>
              <Trash />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RoleDeletingDialog role={role}>
        <button ref={eliminarBtn} className="hidden"></button>
      </RoleDeletingDialog>
      <RoleEditingDialog role={role}>
        <button ref={editarBtn} className="hidden"></button>
      </RoleEditingDialog>
      {role.permissions && role.permissions.length && (
        <RoleAssignPermissions
          roleId={role.id}
          assignedPermissions={role.permissions.reduce<string[]>((acc, permission) => {
            acc.push(permission.name)
            return acc
          }, [])}
        >
          <button ref={assignPermissionsBtn} className="hidden"></button>
        </RoleAssignPermissions>
      )}
    </section>
  )
}
