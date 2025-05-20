import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MesEnum, MesNombres } from '@/types/mesEnum'

interface MesSelectProps {
  value?: MesEnum | null
  onValueChange?: (value: MesEnum) => void
  className?: string
  required?: boolean
  disabled?: boolean
}

export function MesSelect({ value, onValueChange, className, required, disabled }: MesSelectProps) {
  return (
    <Select value={value ?? ''} onValueChange={onValueChange} required={required} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Seleccionar mes" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(MesNombres)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, nombre]) => (
            <SelectItem key={key} value={key}>
              {nombre}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
