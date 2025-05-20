import axios from 'axios'
import { toast } from 'sonner'

type Anio = Pick<AnioCalendarioTable, 'id_anio' | 'anio'>

export const getAnios = async (): Promise<Anio[]> => {
  try {
    const response = await axios.get(route('payroll.anios.get'))
    return response.data
  } catch (error) {
    console.error(error)
    toast.error('Error al obtener los años')
    return []
  }
}
