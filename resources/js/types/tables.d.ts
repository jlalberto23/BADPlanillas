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

interface ProfesionTable {
  id_profesion: number
  nombreProfesion: string
}

interface EmpleadoTable {
  id_empleado: number
  primer_nombre: string
  segundo_nombre: string
  apellido_paterno: string
  apellido_materno: string
  apellido_casada: string | null
  fecha_nacimiento: string
  fecha_ingreso: string
  numero_documento: string | null
  dui: string
  nit: string
  codigo_isss: string
  codigo_nup: string
  salario_base: number
  estado_civil: string
  sexo: string
  correo_personal: string
  correo_institucional: string
  estado: 'activo' | 'inactivo'
  carnet_empleado: string
  tipo_documento: string
  id_profesion: number | null
  id_puesto: number | null
  id_seccion: number | null
  created_at: string
  updated_at: string
}
