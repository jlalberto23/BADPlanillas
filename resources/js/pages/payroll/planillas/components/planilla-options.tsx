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
import { PlanillaDeletingDialog } from './planilla-deleting-dialog'
import { PlanillaEditingDialog } from './planilla-editing-dialog'

type Props = {
  planilla: Pick<PlanillaTable, 'id_planilla' | 'fecha_inicio' | 'fecha_fin' | 'mes'> & {
    anio_calendario: Pick<AnioCalendarioTable, 'anio'>
  }
  children: ReactNode
}

export default function PlanillaOptions({ planilla, children }: Props) {
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
          {!route().current('payroll.planillas.show', planilla.id_planilla) && (
            <Link href={route('payroll.planillas.show', planilla.id_planilla)}>
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
      <PlanillaDeletingDialog planilla={planilla}>
        <button ref={eliminarBtn} className="hidden"></button>
      </PlanillaDeletingDialog>
      <PlanillaEditingDialog planilla={planilla}>
        <button ref={editarBtn} className="hidden"></button>
      </PlanillaEditingDialog>
    </section>
  )
}
