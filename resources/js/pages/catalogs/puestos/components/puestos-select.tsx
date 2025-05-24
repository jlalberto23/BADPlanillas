import ReactSelect from '@/components/ui/react-select'
import { useEffect, useState } from 'react'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { getPuestos } from '../puestosService'

type Puestos = Pick<PuestoTable, 'id_puesto' | 'nombrePuesto' | 'descripcionPuesto'>

type SelectPuestoProps = {
  onChange: (value: Puestos | null) => void
  required?: boolean
  value?: number | null
  isDisabled?: boolean
}

export default function SelectPuesto({ onChange, required, value, isDisabled }: SelectPuestoProps) {
  const [options, setOptions] = useState<OptionsOrGroups<unknown, GroupBase<unknown>> | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getOptions()
  }, [])

  const onSelect = (option: unknown) => onChange(option as Puestos | null)

  const getOptions = async () => {
    return getPuestos().then((puestos) => {
      setOptions(
        puestos.map((puesto) => ({
          value: puesto.id_puesto,
          label: puesto.nombrePuesto,
          ...puesto
        }))
      )
      setIsLoading(false)
    })
  }

  const getValue = () => {
    const finded = value && options ? options?.find((option: unknown) => (option as Puestos).id_puesto === value) : undefined
    return finded
  }

  return (
    <ReactSelect
      placeholder="Puestos"
      className="w-full"
      options={options}
      isClearable
      isLoading={isLoading}
      closeMenuOnSelect
      onChange={onSelect}
      required={required}
      value={getValue()}
      isDisabled={isDisabled}
    />
  )
}
