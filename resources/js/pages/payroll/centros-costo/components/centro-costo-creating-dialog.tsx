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
import SelectDepartamentoEmpresa from '@/pages/catalogs/departamentosEmpresa/components/departamento-empresa-select'
import SelectAnio from '@/pages/payroll/anios/components/anio-select'
import { useForm } from '@inertiajs/react'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  children: ReactNode
}

type Form = {
  id_deptoEmpresa: CentroCostoTable['id_deptoEmpresa'] | null
  id_anio: CentroCostoTable['id_anio'] | null
  presupuesto_total: CentroCostoTable['presupuesto_total'] | string
}

export function CentroCostoCreatingDialog({ children }: Props) {
  const [open, setOpen] = useState(false)
  const { data, setData, reset, post, processing, errors, clearErrors } = useForm<Form>({
    id_deptoEmpresa: null,
    id_anio: null,
    presupuesto_total: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    post(route('payroll.centroscosto.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Centro de costo creado')
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
    setData(name as keyof Form, Number(value))
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
            <AlertDialogTitle>Crear Centro de Costo</AlertDialogTitle>
            <AlertDialogDescription>Ingresa la información del centro de costo.</AlertDialogDescription>
          </AlertDialogHeader>
          <section className="grid gap-4">
            <div>
              <Label>Departamento</Label>
              <InputError message={errors.id_deptoEmpresa} />
              <SelectDepartamentoEmpresa
                onChange={(value) => setData('id_deptoEmpresa', value?.id_deptoEmpresa ?? 0)}
                required
                value={data.id_deptoEmpresa}
              />
            </div>
            <div>
              <Label>Año</Label>
              <InputError message={errors.id_anio} />
              <SelectAnio onChange={(value) => setData('id_anio', value?.id_anio ?? 0)} required value={data.id_anio} />
            </div>
            <div>
              <Label>Presupuesto Total</Label>
              <InputError message={errors.presupuesto_total} />
              <Input
                type="number"
                onChange={handleChange}
                value={data.presupuesto_total}
                name="presupuesto_total"
                autoComplete="off"
                required
                min="0"
                step="0.01"
              />
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
