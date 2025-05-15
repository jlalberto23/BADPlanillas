import axios from 'axios'
import { toast } from 'sonner'

type Profesion = Pick<ProfesionTable, 'id_profesion' | 'nombreProfesion'>

export const getProfesiones = async (): Promise<Profesion[]> => {
  try {
    const response = await axios.get(route('catalogs.profesiones.get'))
    return response.data
  } catch (error) {
    console.error(error)
    toast.error('Error al obtener las profesiones')
    return []
  }
}
