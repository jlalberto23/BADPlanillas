import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Pencil, Trash } from 'lucide-react'
import { ReactNode, useRef, useState } from 'react'
import { SeccionDeletingDialog } from './seccion-deleting-dialog'
import { SeccionEditingDialog } from './seccion-editing-dialog'

type Props = {
  seccion: Pick<SeccionEmpresaTable, 'id_seccion' | 'nombreSeccion' | 'descripcionSeccion' | 'id_jefeSeccion' | 'id_area'>
  children: ReactNode
}

export default function SeccionOptions({ seccion, children }: Props) {
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
          <DropdownMenuItem onClick={handleEditClick}>
            Editar
            <DropdownMenuShortcut>
              <Pencil />
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
      <SeccionDeletingDialog seccion={seccion}>
        <button ref={eliminarBtn} className="hidden"></button>
      </SeccionDeletingDialog>
      <SeccionEditingDialog seccion={seccion}>
        <button ref={editarBtn} className="hidden"></button>
      </SeccionEditingDialog>
    </section>
  )
}
