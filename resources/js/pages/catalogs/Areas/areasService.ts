import axios from 'axios'
import { toast } from 'sonner'

type Areas = Pick<AreaEmpresaTable, 'id_area' | 'nombreArea' | 'descripcionArea' | 'id_deptoEmpresa' | 'id_jefeArea'>

export const getAreas = async (): Promise<Areas[]> => {
  try {
    const response = await axios.get(route('catalogs.areas.get'))
    return response.data
  } catch (error) {
    console.error(error)
    toast.error('Error al obtener las areas')
    return []
  }
}
