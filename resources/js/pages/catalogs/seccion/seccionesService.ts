import axios from 'axios'
import { toast } from 'sonner'

type Secciones = Pick<SeccionEmpresaTable, 'id_seccion' | 'nombreSeccion' | 'descripcionSeccion'>

export const getSecciones = async (): Promise<Secciones[]> => {
  try {
    const response = await axios.get(route('catalogs.secciones.get'))
    return response.data
  } catch (error) {
    console.error(error)
    toast.error('Error al obtener las secciones')
    return []
  }
}
