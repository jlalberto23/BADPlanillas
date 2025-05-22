import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { MesNombres } from '@/types/mesEnum'
import { Link, useForm } from '@inertiajs/react'
import { FormEventHandler, ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  planilla: Pick<PlanillaTable, 'id_planilla' | 'mes'> & {
    anio_calendario: Pick<AnioCalendarioTable, 'anio'>
  }
  children: ReactNode
}

export function PlanillaSyncDetalleDialog({ children, planilla }: Props) {
  const [open, setOpen] = useState(false)
  const { reset, post, processing, clearErrors } = useForm()

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('payroll.planillas.sincronizardetallesconempleados', planilla.id_planilla), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Detalles sincronizados correctamente')
        setOpen(false)
      },
      onError: (errors) => {
        const message = errors?.message ?? 'Error inesperado'
        const code = errors?.code ?? null
        switch (code) {
          case 'P0003':
            toast.error(message)
            break
          case 'P0004':
            toast.error(
              <p>
                {message}
                <br />
                <Link href={route('catalogs.empleados.index', { search: `departamento:` })} className="text-blue-500">
                  Ver empleados sin departamento
                </Link>
              </p>
            )
            break
          case 'P0005':
            toast.error(message)
            break
          default:
            toast.error(message)
            break
        }
      }
    })
  }

  const handleCancel = () => {
    reset()
    clearErrors()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Sincronizar Detalles con Empleados</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas sincronizar los detalles de empleados para la planilla del mes{' '}
              <strong>{MesNombres[planilla.mes as keyof typeof MesNombres]}</strong> del año <strong>{planilla.anio_calendario.anio}</strong>?
              <br /> Esta acción actualizará los detalles de la planilla con la información más reciente de los empleados.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose onClick={handleCancel} disabled={processing}>
              Cancelar
            </DialogClose>
            <Button type="submit" variant="default" disabled={processing}>
              Sí, sincronizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
