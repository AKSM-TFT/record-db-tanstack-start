import { LoginForm } from '#/components/login-form'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const loginSearchSchema = z.object({
  redirect: z.string().optional()
})

export const Route = createFileRoute('/')({ 
  validateSearch: loginSearchSchema,
  component: Home 
})

function Home() {
  return (
    <div className="p-8 flex align-center justify-center min-h-screen">
      <LoginForm />
    </div>
  )
}
