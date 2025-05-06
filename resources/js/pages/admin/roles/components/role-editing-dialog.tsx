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
import { Textarea } from '@/components/ui/textarea'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  role: Pick<RoleTable, 'id' | 'name' | 'description'>
  children: ReactNode
}

type Form = Pick<Props['role'], 'name' | 'description'>

export function RoleEditingDialog({ children, role }: Props) {
  const [open, setOpen] = useState(false)
  const { data, setData, reset, put, processing, errors, clearErrors } = useForm<Form>({
    description: role.description,
    name: role.name
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    put(route('role.update', role.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Rol actualizado')
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
            <AlertDialogTitle>Editar Rol</AlertDialogTitle>
            <AlertDialogDescription>
              Puedes editar la información del rol seleccionado a continuación. Asegúrate de guardar los cambios para que se apliquen correctamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <section>
            <div>
              <Label>Nombre</Label>
              <InputError message={errors.name} />
              <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </div>
            <div>
              <Label>Descripción</Label>
              <InputError message={errors.description} />
              <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
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
