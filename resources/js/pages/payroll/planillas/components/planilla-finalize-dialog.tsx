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

export function PlanillaFinalizeDialog({ children, planilla }: Props) {
  const [open, setOpen] = useState(false)
  const { reset, post, processing, clearErrors } = useForm()

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('payroll.planillas.finalize', planilla.id_planilla), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Planilla finalizada correctamente')
        setOpen(false)
      },
      onError: (errors) => {
        const message = errors?.message ?? 'Error inesperado'
        const code = errors?.code ?? null
        switch (code) {
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
            <DialogTitle>Finalizar Planilla</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas finalizar la planilla del mes <strong>{MesNombres[planilla.mes as keyof typeof MesNombres]}</strong> del año{' '}
              <strong>{planilla.anio_calendario.anio}</strong>?
              <br /> Una vez finalizada, la planilla no podrá ser editada.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose onClick={handleCancel} disabled={processing}>
              Cancelar
            </DialogClose>
            <Button type="submit" variant="default" disabled={processing}>
              Sí, finalizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
