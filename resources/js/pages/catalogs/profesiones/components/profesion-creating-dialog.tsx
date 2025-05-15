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
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  children: ReactNode
}

type Form = Pick<ProfesionTable, 'nombreProfesion'>

export function ProfesionCreatingDialog({ children }: Props) {
  const [open, setOpen] = useState(false)
  const { data, setData, reset, post, processing, errors, clearErrors } = useForm<Form>({
    nombreProfesion: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    post(route('catalogs.profesiones.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Profesión creada')
        setOpen(false)
        reset()
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
        <form onSubmit={handleSubmit} className="grid gap-4" autoComplete="off">
          <AlertDialogHeader>
            <AlertDialogTitle>Crear Profesión</AlertDialogTitle>
            <AlertDialogDescription>Ingresa el nombre de la profesión.</AlertDialogDescription>
          </AlertDialogHeader>
          <section>
            <div>
              <Label>Nombre de la profesión</Label>
              <InputError message={errors.nombreProfesion} />
              <Input onChange={handleChange} value={data.nombreProfesion} name="nombreProfesion" autoComplete="off" required />
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
