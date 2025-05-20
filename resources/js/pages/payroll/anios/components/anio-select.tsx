import ReactSelect from '@/components/ui/react-select'
import { useEffect, useState } from 'react'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { getAnios } from '../anioService'

type Anio = Pick<AnioCalendarioTable, 'id_anio' | 'anio'>

type SelectAnioProps = {
  onChange: (value: Anio | null) => void
  required?: boolean
  value?: number | null
  isDisabled?: boolean
}

export default function SelectAnio({ onChange, required, value, isDisabled }: SelectAnioProps) {
  const [options, setOptions] = useState<OptionsOrGroups<unknown, GroupBase<unknown>> | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getOptions()
  }, [])

  const onSelect = (option: unknown) => onChange(option as Anio | null)

  const getOptions = async () => {
    return getAnios().then((anios) => {
      setOptions(
        anios.map((anio) => ({
          value: anio.id_anio,
          label: anio.anio.toString(),
          ...anio
        }))
      )
      setIsLoading(false)
    })
  }

  const getValue = () => {
    const finded = value && options ? options?.find((option: unknown) => (option as Anio).id_anio === value) : undefined
    return finded
  }

  return (
    <ReactSelect
      placeholder="Año"
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
