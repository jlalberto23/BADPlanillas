import ReactSelect from '@/components/ui/react-select'
import { useEffect, useState } from 'react'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { getDepartamentosEmpresa } from '../departamentoEmpresaService'

type DepartamentoEmpresa = Pick<DepartamentoEmpresaTable, 'id_deptoEmpresa' | 'nombreDepto' | 'descripcionDepto'>

type SelectDepartamentoEmpresaProps = {
  onChange: (value: DepartamentoEmpresa | null) => void
  required?: boolean
  value?: number | null
  isDisabled?: boolean
}

export default function SelectDepartamentoEmpresa({ onChange, required, value, isDisabled }: SelectDepartamentoEmpresaProps) {
  const [options, setOptions] = useState<OptionsOrGroups<unknown, GroupBase<unknown>> | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getOptions()
  }, [])

  const onSelect = (option: unknown) => onChange(option as DepartamentoEmpresa | null)

  const getOptions = async () => {
    return getDepartamentosEmpresa().then((departamentos) => {
      setOptions(
        departamentos.map((departamento) => ({
          value: departamento.id_deptoEmpresa,
          label: departamento.nombreDepto,
          ...departamento
        }))
      )
      setIsLoading(false)
    })
  }

  const getValue = () => {
    const finded = value && options ? options?.find((option: unknown) => (option as DepartamentoEmpresa).id_deptoEmpresa === value) : undefined
    return finded
  }

  return (
    <ReactSelect
      placeholder="Departamento"
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
