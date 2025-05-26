import axios from 'axios'
import { toast } from 'sonner'

type DepartamentoEmpresa = Pick<DepartamentoEmpresaTable, 'id_deptoEmpresa' | 'nombreDepto' | 'descripcionDepto'>

export const getDepartamentosEmpresa = async (): Promise<DepartamentoEmpresa[]> => {
  try {
    const response = await axios.get(route('catalogs.departamentosEmpresa.get'))
    return response.data
  } catch (error) {
    console.error(error)
    toast.error('Error al obtener los departamentos')
    return []
  }
}
