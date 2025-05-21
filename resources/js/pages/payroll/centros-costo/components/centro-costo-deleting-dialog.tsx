import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  centroCosto: Pick<CentroCostoTable, 'id_centro_costo' | 'id_deptoEmpresa' | 'id_anio' | 'presupuesto_total'> & {
    departamento: Pick<DepartamentoEmpresaTable, 'nombreDepto' | 'id_deptoEmpresa'>
    anio_calendario: Pick<AnioCalendarioTable, 'anio' | 'id_anio'>
  }
  children: ReactNode
}

export function CentroCostoDeletingDialog({ children, centroCosto }: Props) {
  const [open, setOpen] = useState(false)
  const { reset, delete: destroy, processing, clearErrors } = useForm()

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    destroy(route('payroll.centroscosto.destroy', centroCosto.id_centro_costo), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Centro de costo eliminado exitosamente')
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
            <DialogTitle>Eliminar Centro de Costo</DialogTitle>
            <DialogDescription>
              <span>¿Estás seguro de que deseas eliminar este centro de costo?</span>
              <span>
                <strong>Departamento:</strong> {centroCosto.departamento.nombreDepto}
              </span>
              <br />
              <span>
                <strong>Año:</strong> {centroCosto.anio_calendario.anio}
              </span>
              <br />
              <span>
                <strong>Presupuesto total:</strong> {centroCosto.presupuesto_total}
              </span>
              <br />
              <strong className="text-destructive-foreground text-right">Esta acción no se puede deshacer.</strong>
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
