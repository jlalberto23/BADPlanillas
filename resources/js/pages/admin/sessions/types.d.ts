import { Pagination } from '@/types'

export interface Session extends Pick<SessionTable, 'id' | 'ip_address' | 'last_activity' | 'user_agent' | 'user_id'> {
  user: Pick<UserTable, 'id' | 'name' | 'email'> | null
}

export interface SessionsPaginated extends Pagination {
  data: Session[]
}
