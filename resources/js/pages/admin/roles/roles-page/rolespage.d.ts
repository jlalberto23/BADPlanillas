import { Pagination } from '@/types'

export interface Permission extends Pick<PermissionTable, 'id' | 'name' | 'description'> {}

export interface Role extends Pick<RoleTable, 'id' | 'name' | 'description'> {
  permissions: Permission[]
}

export interface RolesPaginated extends Pagination {
  data: Role[]
}
