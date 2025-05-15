import ReactSelect from '@/components/ui/react-select'
import { useEffect, useState } from 'react'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { getProfesiones } from '../profesionService'

type Profesion = Pick<ProfesionTable, 'id_profesion' | 'nombreProfesion'>

type SelectProfesionProps = {
  onChange: (value: Profesion | null) => void
  required?: boolean
  value?: number | null
  isDisabled?: boolean
}

export default function SelectProfesion({ onChange, required, value, isDisabled }: SelectProfesionProps) {
  const [options, setOptions] = useState<OptionsOrGroups<unknown, GroupBase<unknown>> | undefined>()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getOptions()
  }, [])

  const onSelect = (option: unknown) => onChange(option as Profesion | null)

  const getOptions = async () => {
    return getProfesiones().then((profesiones) => {
      setOptions(
        profesiones.map((profesion) => ({
          value: profesion.id_profesion,
          label: profesion.nombreProfesion,
          ...profesion
        }))
      )
      setIsLoading(false)
    })
  }

  const getValue = () => {
    const finded = value && options ? options?.find((option: unknown) => (option as Profesion).id_profesion === value) : undefined
    return finded
  }

  return (
    <ReactSelect
      placeholder="Profesión"
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
