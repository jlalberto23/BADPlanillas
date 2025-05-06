export type Role = Pick<RoleTable, 'id' | 'name' | 'description'>

export interface User extends Pick<UserTable, 'id' | 'email' | 'name' | 'created_at' | 'email_verified_at' | 'updated_at'> {
  sessions_count: number
  roles: Role[]
}
