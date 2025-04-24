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
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { getPermissions } from '@/services/permissionsServices'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, ReactNode, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  roleId: number
  assignedPermissions: string[] // IDs of currently assigned permissions
  children: ReactNode
}

interface Form {
  permissions: string[]
  [key: string]: any // Add an index signature to satisfy the constraint
}

export function RoleAssignPermissions({ children, roleId, assignedPermissions }: Props) {
  const [open, setOpen] = useState(false)
  const [permissions, setPermissions] = useState<PermissionTable[]>([])
  const { data, setData, reset, put, processing, errors, clearErrors } = useForm<Form>({
    permissions: assignedPermissions
  })

  useEffect(() => {
    if (open) {
      getPermissions()
        .then(setPermissions)
        .catch(() => toast.error('Error al cargar los permisos'))
    }
  }, [open])

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    put(route('role.permissions.update', roleId), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Permisos actualizados')
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

  const togglePermission = (permissionName: string) => {
    setData((prevData) => ({
      permissions: prevData.permissions.includes(permissionName)
        ? prevData.permissions.filter((name) => name !== permissionName)
        : [...prevData.permissions, permissionName]
    }))
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Editar Permisos</AlertDialogTitle>
            <AlertDialogDescription>Selecciona los permisos que deseas asignar al rol. Asegúrate de guardar los cambios.</AlertDialogDescription>
          </AlertDialogHeader>
          <section className="flex h-72 flex-col gap-2 overflow-auto">
            {permissions.map((permission) => (
              <div key={permission.name} className="flex items-center gap-2">
                <Checkbox
                  checked={data.permissions.includes(permission.name)}
                  onCheckedChange={() => togglePermission(permission.name)}
                  id={permission.name}
                />
                <Label className="font-normal" htmlFor={permission.name}>
                  {permission.description}
                </Label>
              </div>
            ))}
            <InputError message={errors.permissions} />
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
