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

type Form = Pick<PlanillaTable, 'fecha_inicio' | 'fecha_fin'> & {
  mes: string // Mes en formato 'YYYY-MM'
}

export function PlanillaCreatingDialog({ children }: Props) {
  const [open, setOpen] = useState(false)
  const { data, setData, reset, post, processing, errors, clearErrors } = useForm<Form>({
    mes: '',
    fecha_inicio: '',
    fecha_fin: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    post(route('payroll.planillas.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Planilla creada exitosamente')
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
            <AlertDialogTitle>Inicializar Planilla</AlertDialogTitle>
            <AlertDialogDescription>Ingresa los datos de periodo de la planilla.</AlertDialogDescription>
          </AlertDialogHeader>
          <section className="grid grid-cols-2 gap-4">
            <div>
              <Label>Mes</Label>
              <InputError message={errors.mes} />
            </div>
            <Input type="month" name="mes" value={data.mes} onChange={handleChange} required className="w-min" />
            <div>
              <Label>Fecha de inicio</Label>
              <InputError message={errors.fecha_inicio} />
            </div>
            <Input type="date" onChange={handleChange} value={data.fecha_inicio} name="fecha_inicio" required className="w-min" />
            <div>
              <Label>Fecha de fin</Label>
              <InputError message={errors.fecha_fin} />
            </div>
            <Input type="date" onChange={handleChange} value={data.fecha_fin} name="fecha_fin" required className="w-min" />
          </section>
          <AlertDialogFooter className="mt-4">
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
