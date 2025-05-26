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
import { DepartamentoDeletingDialog } from './departamentosEmpresa-deleting-dialog'
import { DepartamentoEditingDialog } from './departamentosEmpresa-editing-dialog'

type Props = {
  departamento: Pick<DepartamentoEmpresaTable, 'id_deptoEmpresa' | 'nombreDepto' | 'descripcionDepto' | 'id_jefeDepto'>
  children: ReactNode
}

export default function DepartamentoOptions({ departamento, children }: Props) {
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
      <DepartamentoDeletingDialog departamento={departamento}>
        <button ref={eliminarBtn} className="hidden"></button>
      </DepartamentoDeletingDialog>
      <DepartamentoEditingDialog departamento={departamento}>
        <button ref={editarBtn} className="hidden"></button>
      </DepartamentoEditingDialog>
    </section>
  )
}
