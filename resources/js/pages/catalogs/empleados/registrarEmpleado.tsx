import InputError from '@/components/input-error'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

import HeadingSmall from '@/components/heading-small'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CatalogsLayout from '../layout'

const breadcrumbs: BreadcrumbItem[] = [
    {
       title: 'Empleados',
        href: '/empleados'
      },
      {
        title: 'Nuevo Empleado',
        href: '/empleados/nuevo'
      }
]

export default function EmpleadoForm() {
  const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
    primerNombre: '',
    segundoNombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    apellidoCasada: '',
    fechaNacimiento: '',
    fechaIngreso: '',
    numeroDocumento: '',
    numeroDui: '',
    numeroNit: '',
    codigoIsss: '',
    codigoNup: '',
    salarioBase: '',
    estadoCivil: '',
    sexo: '',
    correoPersonal: '',
    correoInstitucional: '',
    estadoEmpleado: '',
    carnetEmpleado: '',
    tpoDocumento: '',
    telefono: ''

  })

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
          <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="primerNombre">Primer Nombre</Label>
              <Input
                id="primerNombre"
                value={data.primerNombre}
                onChange={(e) => setData('primerNombre', e.target.value)}
                placeholder="Primer Nombre"
              />
              <InputError message={errors.primerNombre} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="segundoNombre">Segundo Nombre</Label>
              <Input
                id="segundoNombre"
                value={data.segundoNombre}
                onChange={(e) => setData('segundoNombre', e.target.value)}
                placeholder="Segundo Nombre"
              />
              <InputError message={errors.segundoNombre} />
            </div>
{/* Apellidos */}
            <div className="grid gap-2">
              <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
              <Input
                id="apellidoPaterno"
                value={data.apellidoPaterno}
                onChange={(e) => setData('apellidoPaterno', e.target.value)}
                placeholder="Apellido Paterno"
              />
              <InputError message={errors.apellidoPaterno} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="apellidoMaterno">Apellido Materno</Label>
              <Input
                id="apellidoMaterno"
                value={data.apellidoMaterno}
                onChange={(e) => setData('apellidoMaterno', e.target.value)}
                placeholder="Apellido Materno"
              />
              <InputError message={errors.apellidoMaterno} />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="apellidoCasada">Apellido de Casada</Label>
              <Input
                id="apellidoCasada"
                value={data.apellidoCasada}
                onChange={(e) => setData('apellidoCasada', e.target.value)}
                placeholder="Apellido de Casada"
              />
              <InputError message={errors.apellidoCasada} />
            </div>
 {/* Fechas */}

            <div className="grid gap-2">
            <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
            <Input
                id="fechaNacimiento"
                type="date"
                value={data.fechaNacimiento}
                onChange={(e) => setData('fechaNacimiento', e.target.value)}
            />
            <InputError message={errors.fechaNacimiento} />
            </div>
            <div className="grid gap-2">
            <Label htmlFor="fechaIngreso">Fecha de nacimiento</Label>
            <Input
                id="fechaIngreso"
                type="date"
                value={data.fechaIngreso}
                onChange={(e) => setData('fechaIngreso', e.target.value)}
            />
            <InputError message={errors.fechaIngreso} />
            </div>

{/* Documentos */}
            <div className="md:col-span-2">
              <Label htmlFor="tpoDocumento">Tipo de documento</Label>
              <select
                id="tpoDocumento"
                value={data.tpoDocumento}
                onChange={(e) => {
                  const selected = e.target.value
                  setData('tpoDocumento', selected)

                  // Limpiar el campo no visible
                  if (selected === 'DUI') {
                    setData('numeroDocumento', '')
                  } else {
                    setData('numeroDui', '')
                  }
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Seleccione una opción</option>
                <option value="DUI">DUI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Otro">Documento de identificación extranjero</option>
              </select>
              <InputError message={errors.tpoDocumento} />
            </div>

            {data.tpoDocumento === 'DUI' && (
              <div className="grid gap-2">
                <Label htmlFor="numeroDui">Número de DUI</Label>
                <Input
                  id="numeroDui"
                  value={data.numeroDui}
                  onChange={(e) => setData('numeroDui', e.target.value)}
                  placeholder="00000000-0"
                />
                <InputError message={errors.numeroDui} />
              </div>
            )}

            {data.tpoDocumento !== 'DUI' && data.tpoDocumento !== '' && (
              <div className="grid gap-2">
                <Label htmlFor="numeroDocumento">Número de documento</Label>
                <Input
                  id="numeroDocumento"
                  value={data.numeroDocumento}
                  onChange={(e) => setData('numeroDocumento', e.target.value)}
                  placeholder="Número de documento"
                />
                <InputError message={errors.numeroDocumento} />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="numeroNit">Número de NIT</Label>
              <Input
                id="numeroNit"
                value={data.numeroNit}
                onChange={(e) => setData('numeroNit', e.target.value)}
                placeholder="Número de DUI si ya esta homologado"
              />
              <InputError message={errors.numeroNit} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="codigoIsss">Código ISSS</Label>
              <Input
                id="codigoIsss"
                value={data.codigoIsss}
                onChange={(e) => setData('codigoIsss', e.target.value)}
                placeholder="000000000"
              />
              <InputError message={errors.codigoIsss} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="codigoNup">Código NUP</Label>
              <Input
                id="codigoNup"
                value={data.codigoNup}
                onChange={(e) => setData('codigoNup', e.target.value)}
                placeholder="000000000000"
              />
              <InputError message={errors.codigoNup} />
            </div>
{/* Datos personales */}            
            <div className="grid gap-2">
              <Label htmlFor="salarioBase">Salario Base</Label>
              <Input
                id="salarioBase"
                value={data.salarioBase}
                onChange={(e) => setData('salarioBase', e.target.value)}
                placeholder="Salario Base Mensual"
              />
              <InputError message={errors.salarioBase} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="estadoCivil">Estado Civil</Label>
              <select
                id="estadoCivil"
                value={data.estadoCivil}
                onChange={(e) => setData('estadoCivil', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Seleccione una opción</option>
                <option value="soltero">Soltero/a</option>
                <option value="casado">Casado/a</option>
                <option value="divorciado">Divorciado/a</option>
                <option value="viudo">Viudo/a</option>
              </select>
              <InputError message={errors.estadoCivil} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sexo">Sexo</Label>
              <select
                id="sexo"
                value={data.sexo}
                onChange={(e) => setData('sexo', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Seleccione una opción</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
              <InputError message={errors.sexo} />
            </div>
{/* Datos de contacto */}            
            <div className="grid gap-2">
              <Label htmlFor="telefono">Numero de telefono</Label>
              <Input
                id="telefono"
                value={data.telefono}
                onChange={(e) => setData('telefono', e.target.value)}
                placeholder="00000000"
              />
              <InputError message={errors.telefono} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="correoPersonal">Correo Personal</Label>
              <Input
                id="correoPersonal"
                value={data.correoPersonal}
                onChange={(e) => setData('correoPersonal', e.target.value)}
                placeholder="Correo electronico Personal"
                type="email"
              />
              <InputError message={errors.correoPersonal} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="correoInstitucional">Correo Institucional</Label>
              <Input
                id="correoInstitucional"
                value={data.correoInstitucional}
                onChange={(e) => setData('correoInstitucional', e.target.value)}
                placeholder="Correo electronico institucional"
                type="email"
              />
              <InputError message={errors.correoInstitucional} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="estadoEmpleado">Estado del empleado</Label>
              <select
                id="estadoEmpleado"
                value={data.estadoEmpleado}
                onChange={(e) => setData('estadoEmpleado', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Seleccione una opción</option>
                <option value="habilitado">Habilitado</option>
                <option value="deshabilitado">Deshabilitado</option>
              </select>
              <InputError message={errors.estadoEmpleado} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="carnetEmpleado">Carnet de empleado</Label>
              <Input
                id="carnetEmpleado"
                value={data.carnetEmpleado}
                onChange={(e) => setData('carnetEmpleado', e.target.value)}
                placeholder="AA12345"
              />
              <InputError message={errors.carnetEmpleado} />
            </div>
            </div>

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Guardar empleado</Button>

              {recentlySuccessful && (
                <p className="text-sm text-neutral-600">Empleado guardado exitosamente</p>
              )}
            </div>
          </form>
        </div>
      </CatalogsLayout>
    </AppLayout>
  )
}
