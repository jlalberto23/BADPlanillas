import axios from 'axios'
import { toast } from 'sonner'

type Puestos = Pick<PuestoTable, 'id_puesto' | 'nombrePuesto' | 'descripcionPuesto'>

export const getPuestos = async (): Promise<Puestos[]> => {
  try {
    const response = await axios.get(route('catalogs.puestos.get'))
    return response.data
  } catch (error) {
    console.error(error)
    toast.error('Error al obtener los puestos')
    return []
  }
}
