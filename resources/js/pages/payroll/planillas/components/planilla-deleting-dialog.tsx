import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { MesNombres } from '@/types/mesEnum'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  planilla: Pick<PlanillaTable, 'id_planilla' | 'mes'> & {
    anio_calendario: Pick<AnioCalendarioTable, 'anio'>
  }
  children: ReactNode
}

export function PlanillaDeletingDialog({ children, planilla }: Props) {
  const [open, setOpen] = useState(false)
  const { reset, delete: destroy, processing, clearErrors } = useForm()

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    destroy(route('payroll.planillas.destroy', planilla.id_planilla), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Planilla eliminada')
        setOpen(false)
      },
      onError: (errors) => {
        const message = errors?.message ?? 'Error inesperado'
        toast.error(message)
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
            <DialogTitle>Eliminar Planilla</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la planilla del mes <strong>{MesNombres[planilla.mes as keyof typeof MesNombres]}</strong> del año{' '}
              <strong>{planilla.anio_calendario.anio}</strong>? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose onClick={handleCancel} disabled={processing}>
              Cancelar
            </DialogClose>
            <Button type="submit" variant="destructive" disabled={processing}>
              Sí, eliminar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
