import ReactSelect from '@/components/ui/react-select'
import { useEffect, useState } from 'react'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { getSecciones } from '../seccionesService'

type Secciones = Pick<SeccionEmpresaTable, 'id_seccion' | 'nombreSeccion' | 'descripcionSeccion'>

type SelectSeccionesprops = {
  onChange: (value: Secciones | null) => void
  required?: boolean
  value?: number | null
  isDisabled?: boolean
}

export default function SelectSecciones({ onChange, required, value, isDisabled }: SelectSeccionesprops) {
  const [options, setOptions] = useState<OptionsOrGroups<unknown, GroupBase<unknown>> | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getOptions()
  }, [])

  const onSelect = (option: unknown) => onChange(option as Secciones | null)

  const getOptions = async () => {
    return getSecciones().then((secciones) => {
      setOptions(
        secciones.map((seccion) => ({
          value: seccion.id_seccion,
          label: seccion.nombreSeccion,
          ...seccion
        }))
      )
      setIsLoading(false)
    })
  }

  const getValue = () => {
    const finded = value && options ? options?.find((option: unknown) => (option as Secciones).id_seccion === value) : undefined
    return finded
  }

  return (
    <ReactSelect
      placeholder="Secciones"
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
