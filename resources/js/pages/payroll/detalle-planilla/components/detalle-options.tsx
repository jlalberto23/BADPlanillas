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
import { Eye } from 'lucide-react'
import { ReactNode, useState } from 'react'

type Props = {
  detalle: Pick<PlanillaDetalleTable, 'id_planilla_detalle'>
  children: ReactNode
}

export default function DetalleOptions({ detalle, children }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <section className="flex">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!route().current('payroll.planillas.detalles.show', detalle.id_planilla_detalle) && (
            <Link href={route('payroll.planillas.detalles.show', detalle.id_planilla_detalle)}>
              <DropdownMenuItem>
                Ver
                <DropdownMenuShortcut>
                  <Eye className="size-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  )
}
