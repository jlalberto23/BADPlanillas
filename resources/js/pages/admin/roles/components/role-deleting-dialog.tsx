import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  role: Pick<RoleTable, 'id' | 'name'>
  children: ReactNode
}

export function RoleDeletingDialog({ children, role }: Props) {
  const [open, setOpen] = useState(false)
  const { reset, delete: destroy, processing, clearErrors } = useForm()

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    destroy(route('role.destroy', role.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Rol eliminado')
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Rol</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar el rol <strong>{role.name}</strong>? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel} disabled={processing}>
              Cancelar
            </AlertDialogCancel>
            <Button type="submit" disabled={processing}>
              Sí, eliminar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
