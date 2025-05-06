import InputError from '@/components/input-error'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  user: Pick<UserTable, 'id' | 'name' | 'email'>
  children: ReactNode
}

type Form = Omit<Props['user'], 'id'>

export function UserEditingDialog({ children, user }: Props) {
  const [open, setOpen] = useState(false)
  const { data, setData, reset, put, processing, errors, clearErrors, setDefaults } = useForm<Form>({
    email: user.email,
    name: user.name
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    put(route('user.update', user.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Usuario actualizado')
        setDefaults(data)
        setOpen(false)
      },
      onError: (errors) => {
        const message = errors?.message ?? 'Error inesperado'
        toast.error(message)
      }
    })
  }

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setData(name as keyof Form, value)
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
            <AlertDialogTitle>Editar Usuario</AlertDialogTitle>
            <AlertDialogDescription>Actualiza la información del usuario.</AlertDialogDescription>
          </AlertDialogHeader>
          <section>
            <div>
              <Label>Nombre</Label>
              <InputError message={errors.name} />
              <Input onChange={handleChange} value={data.name} name="name" required />
            </div>
            <div>
              <Label>Correo</Label>
              <InputError message={errors.email} />
              <Input onChange={handleChange} value={data.email} name="email" type="email" autoComplete="off" required />
            </div>
          </section>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel} disabled={processing}>
              Cancelar
            </AlertDialogCancel>
            <Button type="submit" disabled={processing}>
              Guardar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
