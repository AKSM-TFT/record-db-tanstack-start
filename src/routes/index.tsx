import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

import { LoginForm } from '#/components/login-form'

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/')({
  validateSearch: loginSearchSchema,
  component: Home,
})

function Home() {
  return <LoginForm />
}
