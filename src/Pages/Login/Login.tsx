import { LoginForm } from '@/Pages/Login/login-form'

export default function LoginPage() {
  return (
    <div className='flex min-h-svh w-full flex-col items-center justify-center bg-muted px-4 py-6 md:p-10'>
      <div className='w-full max-w-md'>
        <LoginForm />
      </div>
    </div>
  )
}
