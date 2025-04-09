import { Pagination } from '@/types'

export interface Role extends Pick<RoleTable, 'id' | 'name' | 'description'> {}

export interface RolesPaginated extends Pagination {
  data: Role[]
}
