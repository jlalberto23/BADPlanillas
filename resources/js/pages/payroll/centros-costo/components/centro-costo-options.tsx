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
import { CentroCostoDeletingDialog } from './centro-costo-deleting-dialog'
import { CentroCostoEditingDialog } from './centro-costo-editing-dialog'

type Props = {
  centroCosto: Pick<CentroCostoTable, 'id_centro_costo' | 'id_deptoEmpresa' | 'id_anio' | 'presupuesto_total'> & {
    departamento: Pick<DepartamentoEmpresaTable, 'nombreDepto' | 'id_deptoEmpresa'>
    anio_calendario: Pick<AnioCalendarioTable, 'anio' | 'id_anio'>
  }
  children: ReactNode
}

export default function CentroCostoOptions({ centroCosto, children }: Props) {
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
      <CentroCostoDeletingDialog centroCosto={centroCosto}>
        <button ref={eliminarBtn} className="hidden"></button>
      </CentroCostoDeletingDialog>
      <CentroCostoEditingDialog centroCosto={centroCosto}>
        <button ref={editarBtn} className="hidden"></button>
      </CentroCostoEditingDialog>
    </section>
  )
}
