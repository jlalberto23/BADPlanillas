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

// Catálogos geográficos
interface PaisTable {
  id_pais: number
  nombrePais: string
}

interface DepartamentoTable {
  id_departamento: number
  nombreDepartamento: string
  id_pais: number
}

interface MunicipioTable {
  id_municipio: number
  nombreMunicipio: string
  id_departamento: number
}

interface DistritoTable {
  id_distritos: number
  nombreDistrito: string
  id_municipio: number
}

// Catálogos de puestos y salarios
interface PuestoTable {
  id_puesto: number
  nombrePuesto: string
  descripcionPuesto: string
}

interface RangoSalarialTable {
  id_rango_salario: number
  id_puesto: number
  salario_min: number
  salario_max: number
  created_at: string
  updated_at: string
}

// Catálogos de períodos
interface AnioCalendarioTable {
  id_anio: number
  anio: string
  fecha_inicio: string
  fecha_fin: string
}

interface PeriodoContableTable {
  id_periodo: number
  id_anio: number
  mes: string
  fecha_inicio: string
  fecha_fin: string
}

// Catálogos de ingresos y descuentos
interface TipoIngresoTable {
  id_tipo_ingreso: number
  tpoIngreso: string
}

interface IngresoEmpleadoTable {
  id_empleado_ingreso: number
  id_tipo_ingreso: number
  id_empleado: number
  fecha: string
  monto: number
  id_periodo: number
}

interface TipoDescuentoTable {
  id_tpo_descuento: number
  tpoDescuentos: string
}

interface DescuentoEmpleadoTable {
  id_empleado_descuento: number
  id_tpo_descuento: number
  id_empleado: number
  fecha: string
  monto: number
  id_periodo: number
}

// Catálogos de aportes patronales
interface TipoAportePatronalTable {
  id_tpo_Aporte: number
  tpoAporte: string
}

interface AportePatronalTable {
  id_aporte_patron: number
  id_tpo_Aporte: number
  id_empleado: number
  fecha: string
  monto: number
  id_periodo: number
}

interface TablaRentaTable {
  id_renta: number
  salario_desde: number
  salario_hasta: number
  porcentaje: number
}

// Estructura organizacional
interface DepartamentoEmpresaTable {
  id_deptoEmpresa: number
  nombreDepto: string
  descripcionDepto: string
  id_jefeDepto: number | null
  id_centro_costo: number | null
}

interface AreaEmpresaTable {
  id_area: number
  nombreArea: string
  descripcionArea: string
  id_jefeArea: number | null
  id_deptoEmpresa: number | null
}

interface SeccionEmpresaTable {
  id_seccion: number
  nombreSeccion: string
  descripcionSeccion: string
  id_jefeSeccion: number | null
  id_area: number | null
}
