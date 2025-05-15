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
import { ProfesionDeletingDialog } from './profesion-deleting-dialog'
import { ProfesionEditingDialog } from './profesion-editing-dialog'

type Props = {
  profesion: Pick<ProfesionTable, 'id_profesion' | 'nombreProfesion'>
  children: ReactNode
}

export default function ProfesionOptions({ profesion, children }: Props) {
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
      <ProfesionDeletingDialog profesion={profesion}>
        <button ref={eliminarBtn} className="hidden"></button>
      </ProfesionDeletingDialog>
      <ProfesionEditingDialog profesion={profesion}>
        <button ref={editarBtn} className="hidden"></button>
      </ProfesionEditingDialog>
    </section>
  )
}
