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

type Form = Pick<AnioCalendarioTable, 'anio' | 'fecha_inicio' | 'fecha_fin'>

export function AnioCreatingDialog({ children }: Props) {
  const [open, setOpen] = useState(false)
  const { data, setData, reset, post, processing, errors, clearErrors } = useForm<Form>({
    anio: new Date().getFullYear(),
    fecha_inicio: '',
    fecha_fin: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    post(route('payroll.anios.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Año creado exitosamente')
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
            <AlertDialogTitle>Crear Año Calendario</AlertDialogTitle>
            <AlertDialogDescription>Ingresa los datos del año calendario.</AlertDialogDescription>
          </AlertDialogHeader>
          <section className="grid gap-4">
            <div>
              <Label>Año</Label>
              <InputError message={errors.anio} />
              <Input type="number" onChange={handleChange} value={data.anio} name="anio" min={2000} max={2100} required />
            </div>
            <div>
              <Label>Fecha de inicio</Label>
              <InputError message={errors.fecha_inicio} />
              <Input type="date" onChange={handleChange} value={data.fecha_inicio} name="fecha_inicio" required />
            </div>
            <div>
              <Label>Fecha de fin</Label>
              <InputError message={errors.fecha_fin} />
              <Input type="date" onChange={handleChange} value={data.fecha_fin} name="fecha_fin" required />
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
