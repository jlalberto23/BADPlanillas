import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'
import { FormEventHandler } from 'react'

import InputError from '@/components/input-error'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type LoginForm = {
  email: string
  password: string
  remember: boolean
}

interface LoginProps {
  status?: string
  canResetPassword: boolean
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: '',
    password: '',
    remember: false
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('login'), {
      onFinish: () => reset('password')
    })
  }

  return (
    <>
      <Head title="Log in" />
      <div className="flex h-screen w-full">
        {/* Left side with image */}
        <div className="hidden w-3/4 lg:flex items-center justify-center bg-gray-100">
          <img
            src="/images/bienvenida.jpg" // reemplaza con tu ruta o URL
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side with form */}
        <div className="w-full lg:w-1/4 flex flex-col justify-center px-8 md:px-16">
          <h2 className="text-3xl font-bold mb-2">Log in to your account</h2>
          <p className="mb-8 text-muted-foreground">Enter your email and password below to log in</p>

          <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="email@example.com"
                />
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {canResetPassword && (
                    <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                      Forgot password?
                    </TextLink>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  tabIndex={2}
                  autoComplete="current-password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="Password"
                />
                <InputError message={errors.password} />
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={data.remember}
                  onClick={() => setData('remember', !data.remember)}
                  tabIndex={3}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>

              <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Log in
              </Button>
            </div>

            <div className="text-muted-foreground text-center text-sm">
              Don't have an account?{' '}
              <TextLink href={route('register')} tabIndex={5}>
                Sign up
              </TextLink>
            </div>
          </form>

          {status && <div className="mt-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </div>
      </div>
    </>
  )
}
