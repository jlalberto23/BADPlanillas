import InputError from '@/components/input-error'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

import HeadingSmall from '@/components/heading-small'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CatalogsLayout from '../layout'
import SelectProfesion from '../profesiones/components/profesion-select'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Empleados',
    href: route('catalogs.empleados.index')
  },
  {
    title: 'Nuevo Empleado',
    href: route('catalogs.empleados.registrar')
  }
]

type Form = Pick<
  EmpleadoTable,
  | 'primer_nombre'
  | 'segundo_nombre'
  | 'apellido_paterno'
  | 'apellido_materno'
  | 'apellido_casada'
  | 'fecha_nacimiento'
  | 'fecha_ingreso'
  | 'numero_documento'
  | 'dui'
  | 'nit'
  | 'codigo_isss'
  | 'codigo_nup'
  | 'salario_base'
  | 'estado_civil'
  | 'sexo'
  | 'correo_personal'
  | 'correo_institucional'
  | 'estado'
  | 'carnet_empleado'
  | 'tipo_documento'
  | 'id_profesion'
>

const initialValues: Form = {
  apellido_casada: '',
  fecha_nacimiento: '',
  fecha_ingreso: '',
  numero_documento: '',
  dui: '',
  nit: '',
  codigo_isss: '',
  codigo_nup: '',
  salario_base: 0,
  estado_civil: '',
  sexo: '',
  correo_personal: '',
  correo_institucional: '',
  estado: 'activo',
  carnet_empleado: '',
  tipo_documento: '',
  id_profesion: null,
  primer_nombre: '',
  segundo_nombre: '',
  apellido_paterno: '',
  apellido_materno: ''
}

export default function EmpleadoForm() {
  const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm<Form>(initialValues)

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('empleados.store'), {
      preserveScroll: true,
      onSuccess: () => reset()
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Nuevo empleado" />

      <CatalogsLayout>
        <div className="space-y-6">
          <HeadingSmall title="Nuevo empleado" description="Llena el formulario para crear un nuevo empleado." />
          {/* Nombres */}
          <form onSubmit={submit} className="space-y-6 p-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="primerNombre">Primer Nombre</Label>
                <Input
                  id="primerNombre"
                  value={data.primer_nombre}
                  onChange={(e) => setData('primer_nombre', e.target.value)}
                  placeholder="Primer Nombre"
                />
                <InputError message={errors.primer_nombre} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="segundoNombre">Segundo Nombre</Label>
                <Input
                  id="segundoNombre"
                  value={data.segundo_nombre}
                  onChange={(e) => setData('segundo_nombre', e.target.value)}
                  placeholder="Segundo Nombre"
                />
                <InputError message={errors.segundo_nombre} />
              </div>
              {/* Apellidos */}
              <div className="grid gap-2">
                <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
                <Input
                  id="apellidoPaterno"
                  value={data.apellido_paterno}
                  onChange={(e) => setData('apellido_paterno', e.target.value)}
                  placeholder="Apellido Paterno"
                />
                <InputError message={errors.apellido_paterno} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="apellidoMaterno">Apellido Materno</Label>
                <Input
                  id="apellidoMaterno"
                  value={data.apellido_materno}
                  onChange={(e) => setData('apellido_materno', e.target.value)}
                  placeholder="Apellido Materno"
                />
                <InputError message={errors.apellido_materno} />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="apellidoCasada">Apellido de Casada</Label>
                <Input
                  id="apellidoCasada"
                  value={data.apellido_casada || ''}
                  onChange={(e) => setData('apellido_casada', e.target.value)}
                  placeholder="Apellido de Casada"
                />
                <InputError message={errors.apellido_casada} />
              </div>
              {/* Fechas */}

              <div className="grid gap-2">
                <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
                <Input id="fechaNacimiento" type="date" value={data.fecha_nacimiento} onChange={(e) => setData('fecha_nacimiento', e.target.value)} />
                <InputError message={errors.fecha_nacimiento} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fechaIngreso">Fecha de nacimiento</Label>
                <Input id="fechaIngreso" type="date" value={data.fecha_ingreso} onChange={(e) => setData('fecha_ingreso', e.target.value)} />
                <InputError message={errors.fecha_ingreso} />
              </div>

              {/* Documentos */}
              <div className="md:col-span-2">
                <Label htmlFor="tpoDocumento">Tipo de documento</Label>
                <Select value={data.tipo_documento} onValueChange={(value) => setData('tipo_documento', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DUI">DUI</SelectItem>
                    <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                    <SelectItem value="Otro">Documento de identificación extranjero</SelectItem>
                  </SelectContent>
                </Select>
                <InputError message={errors.tipo_documento} />
              </div>
              {data.tipo_documento === 'DUI' && (
                <div className="grid gap-2">
                  <Label htmlFor="numeroDui">Número de DUI</Label>
                  <Input
                    id="numeroDui"
                    value={data.numero_documento || ''}
                    onChange={(e) => setData('numero_documento', e.target.value)}
                    placeholder="00000000-0"
                  />
                  <InputError message={errors.numero_documento} />
                </div>
              )}

              {data.tipo_documento !== 'DUI' && data.tipo_documento !== '' && (
                <div className="grid gap-2">
                  <Label htmlFor="numeroDocumento">Número de documento</Label>
                  <Input
                    id="numeroDocumento"
                    value={data.numero_documento || ''}
                    onChange={(e) => setData('numero_documento', e.target.value)}
                    placeholder="Número de documento"
                  />
                  <InputError message={errors.numero_documento} />
                </div>
              )}

              {data.tipo_documento === 'DUI' && (
                <div className="grid gap-2">
                  <Label htmlFor="numeroDui">Número de DUI</Label>
                  <Input
                    id="numeroDui"
                    value={data.numero_documento || ''}
                    onChange={(e) => setData('numero_documento', e.target.value)}
                    placeholder="00000000-0"
                  />
                  <InputError message={errors.numero_documento} />
                </div>
              )}

              {data.tipo_documento !== 'DUI' && data.tipo_documento !== '' && (
                <div className="grid gap-2">
                  <Label htmlFor="numeroDocumento">Número de documento</Label>
                  <Input
                    id="numeroDocumento"
                    value={data.numero_documento || ''}
                    onChange={(e) => setData('numero_documento', e.target.value)}
                    placeholder="Número de documento"
                  />
                  <InputError message={errors.numero_documento} />
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="numeroNit">Número de NIT</Label>
                <Input
                  id="numeroNit"
                  value={data.nit}
                  onChange={(e) => setData('nit', e.target.value)}
                  placeholder="Número de DUI si ya esta homologado"
                />
                <InputError message={errors.nit} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="codigoIsss">Código ISSS</Label>
                <Input id="codigoIsss" value={data.codigo_isss} onChange={(e) => setData('codigo_isss', e.target.value)} placeholder="000000000" />
                <InputError message={errors.codigo_isss} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="codigoNup">Código NUP</Label>
                <Input id="codigoNup" value={data.codigo_nup} onChange={(e) => setData('codigo_nup', e.target.value)} placeholder="000000000000" />
                <InputError message={errors.codigo_nup} />
              </div>
              {/* Datos personales */}
              <div className="grid gap-2">
                <Label htmlFor="salarioBase">Salario Base</Label>
                <Input
                  id="salarioBase"
                  value={data.salario_base}
                  onChange={(e) => setData('salario_base', Number(e.target.value))}
                  placeholder="Salario Base Mensual"
                />
                <InputError message={errors.salario_base} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estadoCivil">Estado Civil</Label>
                <Select value={data.estado_civil} onValueChange={(value) => setData('estado_civil', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soltero">Soltero/a</SelectItem>
                    <SelectItem value="casado">Casado/a</SelectItem>
                    <SelectItem value="divorciado">Divorciado/a</SelectItem>
                    <SelectItem value="viudo">Viudo/a</SelectItem>
                  </SelectContent>
                </Select>
                <InputError message={errors.estado_civil} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sexo">Sexo</Label>
                <Select value={data.sexo} onValueChange={(value) => setData('sexo', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="femenino">Femenino</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <InputError message={errors.sexo} />
              </div>
              {/* Datos de contacto */}
              {/* <div className="grid gap-2">
                <Label htmlFor="telefono">Numero de telefono</Label>
                <Input id="telefono" value={data.telefono || ''} onChange={(e) => setData('telefono', e.target.value)} placeholder="00000000" />
                <InputError message={errors.telefono} />
              </div> */}

              <div className="grid gap-2">
                <Label htmlFor="correoPersonal">Correo Personal</Label>
                <Input
                  id="correoPersonal"
                  value={data.correo_personal}
                  onChange={(e) => setData('correo_personal', e.target.value)}
                  placeholder="Correo electronico Personal"
                  type="email"
                />
                <InputError message={errors.correo_personal} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="correoInstitucional">Correo Institucional</Label>
                <Input
                  id="correoInstitucional"
                  value={data.correo_institucional}
                  onChange={(e) => setData('correo_institucional', e.target.value)}
                  placeholder="Correo electronico institucional"
                  type="email"
                />
                <InputError message={errors.correo_institucional} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="estadoEmpleado">Estado del empleado</Label>
                <Select value={data.estado} onValueChange={(value) => setData('estado', value as 'activo' | 'inactivo')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
                <InputError message={errors.estado} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="carnetEmpleado">Carnet de empleado</Label>
                <Input
                  id="carnetEmpleado"
                  value={data.carnet_empleado}
                  onChange={(e) => setData('carnet_empleado', e.target.value)}
                  placeholder="AA12345"
                />
                <InputError message={errors.carnet_empleado} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profesion">Profesión</Label>
                <SelectProfesion value={data.id_profesion} onChange={(value) => setData('id_profesion', value?.id_profesion || null)} />
                <InputError message={errors.id_profesion} />
              </div>
            </div>

            <div className="mt-32 mb-8 flex items-center gap-4">
              <Button disabled={processing}>Guardar empleado</Button>

              {recentlySuccessful && <p className="text-sm text-neutral-600">Empleado guardado exitosamente</p>}
            </div>
          </form>
        </div>
      </CatalogsLayout>
    </AppLayout>
  )
}
