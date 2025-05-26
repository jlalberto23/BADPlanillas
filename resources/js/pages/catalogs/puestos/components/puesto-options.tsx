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
import { PuestoDeletingDialog } from './puesto-deleting-dialog'
import { PuestoEditingDialog } from './puesto-editing-dialog'

type Props = {
  puesto: Pick<PuestoTable, 'id_puesto' | 'nombrePuesto' | 'descripcionPuesto'>
  children: ReactNode
}

export default function PuestoOptions({ puesto, children }: Props) {
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
      <PuestoDeletingDialog puesto={puesto}>
        <button ref={eliminarBtn} className="hidden"></button>
      </PuestoDeletingDialog>
      <PuestoEditingDialog puesto={puesto}>
        <button ref={editarBtn} className="hidden"></button>
      </PuestoEditingDialog>
    </section>
  )
}
