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
  seccion: SeccionEmpresaTable
}

type Form = Pick<SeccionEmpresaTable, 'nombreSeccion'>

export function SeccionEditingDialog({ children, seccion }: Props) {
  const [open, setOpen] = useState(false)
  const { data, setData, reset, put, processing, errors, clearErrors } = useForm<Form>({
    nombreSeccion: seccion.nombreSeccion
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    put(route('catalogs.secciones.update', { id: seccion.id_seccion }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Seccion actualizada')
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
        <form onSubmit={handleSubmit} className="grid gap-4" autoComplete="off">
          <AlertDialogHeader>
            <AlertDialogTitle>Editar Seccion</AlertDialogTitle>
            <AlertDialogDescription>Modifica el nombre de la seccion.</AlertDialogDescription>
          </AlertDialogHeader>
          <section>
            <div>
              <Label>Nombre de la seccion</Label>
              <InputError message={errors.nombreSeccion} />
              <Input onChange={handleChange} value={data.nombreSeccion} name="nombreSeccion" autoComplete="off" required />
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
