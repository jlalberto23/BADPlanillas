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
  area: AreaEmpresaTable
}

type Form = Pick<AreaEmpresaTable, 'nombreArea'>

export function AreaEditingDialog({ children, area }: Props) {
  const [open, setOpen] = useState(false)
  const { data, setData, reset, put, processing, errors, clearErrors } = useForm<Form>({
    nombreArea: area.nombreArea
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    put(route('catalogs.areas.update', { id: area.id_area }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Area actualizada')
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
            <AlertDialogTitle>Editar Area</AlertDialogTitle>
            <AlertDialogDescription>Modifica el nombre del area.</AlertDialogDescription>
          </AlertDialogHeader>
          <section>
            <div>
              <Label>Nombre del area</Label>
              <InputError message={errors.nombreArea} />
              <Input onChange={handleChange} value={data.nombreArea} name="nombreArea" autoComplete="off" required />
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
