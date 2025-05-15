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
  user: Pick<UserTable, 'id' | 'name'>
  children: ReactNode
}

export function UserSessionsDeletingDialog({ children, user }: Props) {
  const [open, setOpen] = useState(false)
  const { reset, delete: destroy, processing, clearErrors } = useForm()

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    destroy(route('user.sessions.destroy', user.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Usuario eliminado')
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
            <AlertDialogTitle>Eliminar las sessiones</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar <strong>todas las sesiones</strong> del usuario <strong>{user.name}</strong>?. El usuario será
              deslogueado del sistema.
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
