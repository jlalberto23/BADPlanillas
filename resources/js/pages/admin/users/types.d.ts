import { Pagination } from '@/types'

export interface User extends Pick<UserTable, 'id' | 'email' | 'name' | 'created_at' | 'email_verified_at' | 'updated_at'> {}

export interface UsersPaginated extends Pagination {
  data: User[]
}
