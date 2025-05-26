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
  puesto: PuestoTable
}

type Form = Pick<PuestoTable, 'nombrePuesto'>

export function PuestoEditingDialog({ children, puesto }: Props) {
  const [open, setOpen] = useState(false)
  const { data, setData, reset, put, processing, errors, clearErrors } = useForm<Form>({
    nombrePuesto: puesto.nombrePuesto
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    put(route('catalogs.puestos.update', { id: puesto.id_puesto }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Puesto actualizado')
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
            <AlertDialogTitle>Editar Puesto</AlertDialogTitle>
            <AlertDialogDescription>Modifica el nombre del puesto.</AlertDialogDescription>
          </AlertDialogHeader>
          <section>
            <div>
              <Label>Nombre del puesto</Label>
              <InputError message={errors.nombrePuesto} />
              <Input onChange={handleChange} value={data.nombrePuesto} name="nombrePuesto" autoComplete="off" required />
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
