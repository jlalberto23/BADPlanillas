interface UserTable {
  id: number
  name: string
  email: string
  email_verified_at: Date | null
  password: string
  remember_token: string | null
  created_at: Date
  updated_at: Date
}

interface PasswordResetTokenTable {
  email: string
  token: string
  created_at: Date | null
}

interface SessionTable {
  id: string
  user_id: number | null
  ip_address: string | null
  user_agent: string | null
  payload: string
  last_activity: number
}

interface PermissionTable {
  id: number
  name: string
  guard_name: string
  description: string
  created_at: Date
  updated_at: Date
}

interface RoleTable {
  id: number
  name: string
  guard_name: string
  description: string
  team_foreign_key?: number | null // Solo si teams está habilitado
  created_at: Date
  updated_at: Date
}
