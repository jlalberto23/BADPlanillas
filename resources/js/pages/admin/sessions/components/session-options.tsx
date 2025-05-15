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
import { Eye, Trash } from 'lucide-react'
import { ReactNode, useRef, useState } from 'react'
import { UserSessionsDeletingDialog } from './user-sessions-deleting-dialog'

type Props = {
  session: Pick<SessionTable, 'id'> & { user: Pick<UserTable, 'id' | 'name' | 'email'> | null }
  children: ReactNode
}

export default function SessionOptions({ session, children }: Props) {
  const [open, setOpen] = useState(false)
  const eliminarByUserBtn = useRef<HTMLButtonElement>(null)

  const handleDeleteByUserClick = () => {
    eliminarByUserBtn.current?.click()
    setOpen(false)
  }

  return (
    <section className="flex">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {session.user && !route().current('user.show', session.user.id) && (
            <Link href={route('user.show', session.user.id)}>
              <DropdownMenuItem>
                Ver usuario
                <DropdownMenuShortcut>
                  <Eye className="size-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDeleteByUserClick} variant="destructive">
            Eliminar
            <DropdownMenuShortcut>
              <Trash />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {session.user !== null && (
        <UserSessionsDeletingDialog user={session.user}>
          <button ref={eliminarByUserBtn} className="hidden"></button>
        </UserSessionsDeletingDialog>
      )}
    </section>
  )
}
