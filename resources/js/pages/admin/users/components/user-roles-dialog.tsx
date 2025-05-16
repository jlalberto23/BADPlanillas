import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useForm } from '@inertiajs/react'
import { User, Role } from '../user-page/userpage'
import { MultiSelect } from '@/components/ui/multi-select'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
  roles: Role[]
}

export default function UserRolesDialog({ user, open, onOpenChange, roles }: Props) {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const form = useForm({ roles: [] as number[] })

  useEffect(() => {
    if (open && user.roles) {
      setSelectedRoles(user.roles)
      form.setData('roles', user.roles.map(role => role.id))
    }
  }, [open, user.roles])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.put(`/admin/users/${user.id}/syncroles`, {
      preserveScroll: true,
      onSuccess: () => {
        onOpenChange(false)
        toast.success('Roles actualizados correctamente')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar roles de {user.name}</DialogTitle>
            <DialogDescription>Selecciona los roles que deseas asignar al usuario.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <MultiSelect
              items={roles}
              selected={selectedRoles}
              onChange={(newRoles) => {
                setSelectedRoles(newRoles)
                form.setData('roles', newRoles.map(role => role.id))
              }}
              placeholder="Selecciona los roles"
              itemToString={role => role.name}
              itemToId={role => role.id.toString()}
            />
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={form.processing}
            >
              Guardar cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 