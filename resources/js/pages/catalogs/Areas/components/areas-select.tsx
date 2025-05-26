import ReactSelect from '@/components/ui/react-select'
import { useEffect, useState } from 'react'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { getAreas } from '../areasService'

type Areas = Pick<AreaEmpresaTable, 'id_area' | 'nombreArea' | 'descripcionArea' | 'id_deptoEmpresa' | 'id_jefeArea'>

type SelectAreaProps = {
  onChange: (value: Areas | null) => void
  required?: boolean
  value?: number | null
  isDisabled?: boolean
}

export default function SelectArea({ onChange, required, value, isDisabled }: SelectAreaProps) {
  const [options, setOptions] = useState<OptionsOrGroups<unknown, GroupBase<unknown>> | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getOptions()
  }, [])

  const onSelect = (option: unknown) => onChange(option as Areas | null)

  const getOptions = async () => {
    return getAreas().then((areas) => {
      setOptions(
        areas.map((area) => ({
          value: area.id_area,
          label: area.nombreArea,
          ...area
        }))
      )
      setIsLoading(false)
    })
  }

  const getValue = () => {
    const finded = value && options ? options?.find((option: unknown) => (option as Areas).id_area === value) : undefined
    return finded
  }

  return (
    <ReactSelect
      placeholder="Areas"
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
