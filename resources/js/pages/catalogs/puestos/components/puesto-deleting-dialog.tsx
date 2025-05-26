import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  puesto: PuestoTable
  children: ReactNode
}

export function PuestoDeletingDialog({ children, puesto }: Props) {
  const [open, setOpen] = useState(false)
  const { reset, delete: destroy, processing, clearErrors } = useForm()

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    destroy(route('catalogs.puestos.destroy', puesto.id_puesto), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Puesto eliminado')
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
            <DialogTitle>Eliminar Puesto</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar el puesto <strong>{puesto.nombrePuesto}</strong>? Esta acción no se puede deshacer.
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
