import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  seccion: SeccionEmpresaTable
  children: ReactNode
}

export function SeccionDeletingDialog({ children, seccion }: Props) {
  const [open, setOpen] = useState(false)
  const { reset, delete: destroy, processing, clearErrors } = useForm()

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    destroy(route('catalogs.secciones.destroy', seccion.id_seccion), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Seccion eliminada')
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
            <DialogTitle>Eliminar Seccion</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la seccion <strong>{seccion.nombreSeccion}</strong>? Esta acción no se puede deshacer.
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
