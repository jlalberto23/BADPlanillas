import axios from 'axios'

const BASE_URL = '/admin/data/permissions'

export const getPermissions = async (): Promise<PermissionTable[]> => {
  try {
    const response = await axios.get<PermissionTable[]>(BASE_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching permissions:', error)
    throw error
  }
}
