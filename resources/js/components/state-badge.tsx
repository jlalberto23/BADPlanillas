import { Badge } from '@/components/ui/badge'

export function StateBadge({ state }: { state: 'activo' | 'inactivo' }) {
  return <Badge variant={state === 'activo' ? 'default' : 'secondary'}>{state}</Badge>
}
