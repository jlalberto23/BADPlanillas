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
import { Check, X } from 'lucide-react'
import { FormEventHandler, ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  children: ReactNode
}

type Form = Pick<UserTable, 'name' | 'email' | 'password'> & {
  password_confirmation: string
}

export function UserCreatingDialog({ children }: Props) {
  const [open, setOpen] = useState(false)
  const { data, setData, reset, post, processing, errors, clearErrors, setDefaults } = useForm<Form>({
    email: '',
    name: '',
    password: '',
    password_confirmation: ''
  })
  const passwordChecks = getPasswordValidation(data.password, data.password_confirmation)

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    if (passwordChecks.some(({ isValid }) => !isValid)) return

    post(route('user.create'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Usuario creado')
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
        <form onSubmit={handleSubmit} className="grid gap-4" autoComplete="off">
          <AlertDialogHeader>
            <AlertDialogTitle>Crear Usuario</AlertDialogTitle>
            <AlertDialogDescription>Ingresa la información del usuario.</AlertDialogDescription>
          </AlertDialogHeader>
          <section>
            <div>
              <Label>Nombre</Label>
              <InputError message={errors.name} />
              <Input onChange={handleChange} value={data.name} name="name" autoComplete="off" required />
            </div>
            <div>
              <Label>Correo</Label>
              <InputError message={errors.email} />
              <Input onChange={handleChange} value={data.email} name="email" type="email" autoComplete="off" required />
            </div>
            <div>
              <Label>Contraseña</Label>
              <InputError message={errors.password} />
              <Input onChange={handleChange} value={data.password} name="password" type="password" autoComplete="off" required />
            </div>
            <div>
              <Label>Repita contraseña</Label>
              <InputError message={errors.password_confirmation} />
              <Input
                onChange={handleChange}
                value={data.password_confirmation}
                name="password_confirmation"
                type="password"
                autoComplete="off"
                required
              />
            </div>
            <ul className="mt-2 text-xs">
              {passwordChecks.map(({ label, isValid }, i) => (
                <li key={i} className={isValid ? 'text-muted-foreground' : 'text-red-600'}>
                  {isValid ? <Check className="inline size-3" /> : <X className="inline size-3" />} {label}
                </li>
              ))}
            </ul>
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

function getPasswordValidation(password: string, confirmation: string) {
  return [
    {
      label: 'Al menos 8 caracteres',
      isValid: password.length >= 8
    },
    {
      label: 'Inicia con una letra',
      isValid: /^[A-Za-z]/.test(password)
    },
    {
      label: 'Contiene una mayúscula',
      isValid: /[A-Z]/.test(password)
    },
    {
      label: 'Contiene un símbolo especial',
      isValid: /[^A-Za-z0-9]/.test(password)
    },
    {
      label: 'Contraseñas coinciden',
      isValid: password === confirmation
    }
  ]
}
