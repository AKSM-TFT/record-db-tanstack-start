import { useState } from 'react'
import { ArrowLeftIcon, CircleAlertIcon, LoaderCircleIcon } from 'lucide-react'
import { useForm } from '@tanstack/react-form'
import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'

import { RecordAppShell, RecordPageHeader } from '#/components/record-shell'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { Textarea } from '#/components/ui/textarea'
import { addRecord, fetchUsersWithName } from '#/services/records'
import { logoutFn } from '#/services/auth'

export const Route = createFileRoute('/staff/new')({
  beforeLoad: ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/',
        search: { redirect: location.href },
      })
    }
  },
  loader: async ({ context }) => {
    if (!context.user) throw new Error('Unauthorized')

    return fetchUsersWithName({
      data: { id: context.user.id },
    })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const { user } = Route.useRouteContext()
  const uniqueNames = Route.useLoaderData()
  const addRecordFn = useServerFn(addRecord)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleLogout() {
    await logoutFn()
    await router.invalidate()
    await router.navigate({ to: '/' })
  }

  const form = useForm({
    defaultValues: {
      title: '',
      patientId: '',
      description: '',
    },
    onSubmit: async ({ value }) => {
      setError(null)
      setIsSubmitting(true)

      try {
        await addRecordFn({ data: value })
        await router.navigate({ to: '/staff' })
      } catch {
        setError('Unable to save this record. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <RecordAppShell
      onLogout={handleLogout}
      roleLabel="Clinic staff"
      user={user}
    >
      <div className="form-page">
        <Link className="back-link" to="/staff">
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          Back to assigned records
        </Link>

        <RecordPageHeader
          description="Create a record for one of the patients assigned to your account."
          title="Add record"
        />

        <form
          aria-busy={isSubmitting}
          className="form-card"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <div className="form-card__header">
            <h2 className="form-card__title">Record details</h2>
            <p className="form-card__description">
              Keep the title concise so the record is easy to find later. The
              description can hold the full note.
            </p>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <Label className="form-field__label" htmlFor="patientId">
                Patient <span className="form-field__required">*</span>
              </Label>
              <form.Field name="patientId">
                {(field) => (
                  <Select
                    onValueChange={(value) => {
                      field.handleChange(value)
                      field.handleBlur()
                    }}
                    value={field.state.value}
                  >
                    <SelectTrigger
                      aria-describedby="patient-help"
                      aria-label="Patient"
                      aria-required="true"
                      className="form-select"
                      id="patientId"
                    >
                      <SelectValue placeholder="Select a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Assigned patients</SelectLabel>
                        {uniqueNames.map((patient) => (
                          <SelectItem
                            key={patient.patientId}
                            value={patient.patientId}
                          >
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </form.Field>
              <p className="form-field__description" id="patient-help">
                Only patients assigned to your account are listed.
              </p>
            </div>

            <div className="form-field">
              <Label className="form-field__label" htmlFor="title">
                Title <span className="form-field__required">*</span>
              </Label>
              <form.Field name="title">
                {(field) => (
                  <Input
                    aria-describedby="title-help"
                    id="title"
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="e.g. Annual check-in"
                    required
                    value={field.state.value}
                  />
                )}
              </form.Field>
              <p className="form-field__description" id="title-help">
                A short label that identifies this record in the list.
              </p>
            </div>

            <div className="form-field">
              <Label className="form-field__label" htmlFor="description">
                Description
              </Label>
              <form.Field name="description">
                {(field) => (
                  <Textarea
                    id="description"
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Add the record details…"
                    value={field.state.value}
                  />
                )}
              </form.Field>
            </div>
          </div>

          {error ? (
            <div className="form-error" role="alert">
              <CircleAlertIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0"
              />
              <span>{error}</span>
            </div>
          ) : null}

          <div className="form-actions">
            <Button asChild type="button" variant="outline">
              <Link to="/staff">Cancel</Link>
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <LoaderCircleIcon aria-hidden="true" className="animate-spin" />
              ) : null}
              {isSubmitting ? 'Saving…' : 'Save record'}
            </Button>
          </div>
        </form>
      </div>
    </RecordAppShell>
  )
}
