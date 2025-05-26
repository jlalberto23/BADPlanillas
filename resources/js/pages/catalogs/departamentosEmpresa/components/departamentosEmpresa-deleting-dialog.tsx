import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  departamento: DepartamentoEmpresaTable
  children: ReactNode
}

export function DepartamentoDeletingDialog({ children, departamento }: Props) {
  const [open, setOpen] = useState(false)
  const { reset, delete: destroy, processing, clearErrors } = useForm()

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    destroy(route('catalogs.departamentos.destroy', departamento.id_deptoEmpresa), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Departamento eliminado')
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
            <DialogTitle>Eliminar Departamento</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar el departamento <strong>{departamento.nombreDepto}</strong>? Esta acción no se puede deshacer.
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
