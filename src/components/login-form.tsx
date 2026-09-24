import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import {
  ArrowRightIcon,
  CircleAlertIcon,
  DatabaseIcon,
  LoaderCircleIcon,
} from 'lucide-react'
import { useRouter } from '@tanstack/react-router'

import { Route } from '#/routes'
import { loginFn } from '#/services/auth'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'

export function LoginForm() {
  const router = useRouter()
  const search = Route.useSearch()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setError(null)
      setIsSubmitting(true)

      try {
        const response = await loginFn({ data: value })
        const userRole = response.user.role
        const redirectRoute = search.redirect
        let target = userRole === 'patient' ? '/patient' : '/staff'

        if (redirectRoute) {
          const wasStaff = redirectRoute.startsWith('/staff')
          if (!(userRole === 'patient' && wasStaff)) {
            target = redirectRoute
          }
        }

        await router.navigate({ to: target, reloadDocument: true })
      } catch {
        setError(
          'We could not sign you in. Check your email and password, then try again.',
        )
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <div className="auth-layout">
      <aside className="auth-aside" aria-label="Record database introduction">
        <div className="auth-aside__brand">
          <span className="auth-aside__mark" aria-hidden="true">
            R
          </span>
          <span>Record database</span>
        </div>

        <div className="auth-aside__content">
          <h2 className="auth-aside__title">Keep every record in view.</h2>
          <p className="auth-aside__description">
            A focused workspace for reviewing, creating, and maintaining records
            with the right level of access for your role.
          </p>
          <div className="auth-aside__rule" aria-hidden="true" />
          <ul className="auth-aside__list">
            <li className="auth-aside__item">
              Patient records stay scoped to each account
            </li>
            <li className="auth-aside__item">
              Staff tools focus on assigned patients
            </li>
            <li className="auth-aside__item">
              Record details stay easy to scan and revisit
            </li>
          </ul>
        </div>

        <div className="auth-aside__footer">
          <span>TanStack Form practice</span>
          <span>Role-aware workflows</span>
        </div>
      </aside>

      <section className="auth-panel" aria-labelledby="login-heading">
        <div className="auth-form">
          <div className="auth-form__header">
            <div className="inline-flex items-center gap-2 text-primary">
              <DatabaseIcon aria-hidden="true" className="size-4" />
              <span className="text-xs font-semibold">Workspace access</span>
            </div>
            <h1 id="login-heading" className="auth-form__title">
              Sign in to your records
            </h1>
            <p className="auth-form__description">
              Use your account to open the workspace assigned to your role.
            </p>
          </div>

          <form
            aria-busy={isSubmitting}
            noValidate
            onSubmit={(event) => {
              event.preventDefault()
              event.stopPropagation()
              void form.handleSubmit()
            }}
          >
            <div className="auth-field">
              <Label className="auth-field__label" htmlFor="email">
                Email address
              </Label>
              <form.Field name="email">
                {(field) => (
                  <Input
                    aria-describedby="email-hint"
                    autoComplete="email"
                    id="email"
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="you@example.com"
                    type="email"
                    value={field.state.value}
                  />
                )}
              </form.Field>
              <p className="auth-field__hint" id="email-hint">
                Use the email address connected to your account.
              </p>
            </div>

            <div className="auth-field">
              <Label className="auth-field__label" htmlFor="password">
                Password
              </Label>
              <form.Field name="password">
                {(field) => (
                  <Input
                    aria-describedby="password-hint"
                    autoComplete="current-password"
                    id="password"
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Enter your password"
                    type="password"
                    value={field.state.value}
                  />
                )}
              </form.Field>
              <p className="auth-field__hint" id="password-hint">
                Your password is never displayed after sign-in.
              </p>
            </div>

            {error ? (
              <div className="auth-error" role="alert">
                <CircleAlertIcon
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0"
                />
                <span>{error}</span>
              </div>
            ) : null}

            <Button
              aria-busy={isSubmitting}
              className="auth-form__submit"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <LoaderCircleIcon aria-hidden="true" className="animate-spin" />
              ) : null}
              <span>{isSubmitting ? 'Signing in…' : 'Sign in'}</span>
              {!isSubmitting ? <ArrowRightIcon aria-hidden="true" /> : null}
            </Button>
          </form>

          <p className="auth-form__footer">
            Records are shown according to the permissions associated with your
            account.
          </p>
        </div>
      </section>
    </div>
  )
}
