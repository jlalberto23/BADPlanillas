import axios from 'axios'
import { toast } from 'sonner'

type Departamento = Pick<DepartamentoEmpresaTable, 'id_deptoEmpresa' | 'nombreDepto' | 'descripcionDepto'>

export const getDepartamentos = async (): Promise<Departamento[]> => {
  try {
    const response = await axios.get(route('catalogs.departamentos.get'))
    return response.data
  } catch (error) {
    console.error(error)
    toast.error('Error al obtener los departamentos')
    return []
  }
}
