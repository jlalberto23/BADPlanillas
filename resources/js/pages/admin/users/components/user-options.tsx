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
import { Eye, Pencil, Trash } from 'lucide-react'
import { ReactNode, useRef, useState } from 'react'
import { UserDeletingDialog } from './user-deleting-dialog'
import { UserEditingDialog } from './user-editing-dialog'

type Props = {
  user: Pick<UserTable, 'id' | 'name' | 'email'>
  children: ReactNode
}

export default function UserOptions({ user, children }: Props) {
  const [open, setOpen] = useState(false)
  const editarBtn = useRef<HTMLButtonElement>(null)
  const eliminarBtn = useRef<HTMLButtonElement>(null)

  const handleEditClick = () => {
    editarBtn.current?.click()
    setOpen(false)
  }
  const handleDeleteClick = () => {
    eliminarBtn.current?.click()
    setOpen(false)
  }

  return (
    <section className="flex">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!route().current('user.show', user.id) && (
            <Link href={route('user.show', user.id)}>
              <DropdownMenuItem>
                Ver
                <DropdownMenuShortcut>
                  <Eye className="size-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuItem onClick={handleEditClick}>
            Editar
            <DropdownMenuShortcut>
              <Pencil />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDeleteClick}>
            Eliminar
            <DropdownMenuShortcut>
              <Trash />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserDeletingDialog user={user}>
        <button ref={eliminarBtn} className="hidden"></button>
      </UserDeletingDialog>
      <UserEditingDialog user={user}>
        <button ref={editarBtn} className="hidden"></button>
      </UserEditingDialog>
    </section>
  )
}
