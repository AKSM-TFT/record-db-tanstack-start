import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  FileTextIcon,
  HashIcon,
} from 'lucide-react'
import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from '@tanstack/react-router'

import { RecordAppShell, RecordPageHeader } from '#/components/record-shell'
import { fetchPatientRecordById } from '#/services/records'
import { logoutFn } from '#/services/auth'

export const Route = createFileRoute('/patient/$id/')({
  beforeLoad: ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/',
        search: { redirect: location.href },
      })
    }
  },
  loader: ({ params }) => fetchPatientRecordById({ data: params }),
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const { user } = Route.useRouteContext()
  const recordDetails = Route.useLoaderData()

  async function handleLogout() {
    await logoutFn()
    await router.invalidate()
    await router.navigate({ to: '/' })
  }

  return (
    <RecordAppShell onLogout={handleLogout} roleLabel="Patient" user={user}>
      <div className="detail-page">
        <Link className="back-link" to="/patient">
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          Back to all records
        </Link>

        <RecordPageHeader
          description="Review the saved information for this record."
          title="Record detail"
        />

        <div className="detail-grid">
          <div className="detail-card detail-card--primary">
            <p className="detail-card__label">Record</p>
            <h2 className="detail-title">{recordDetails.title}</h2>
            {recordDetails.description ? (
              <p className="detail-description">{recordDetails.description}</p>
            ) : (
              <p className="detail-description detail-description--empty">
                No description was added to this record.
              </p>
            )}
          </div>

          <aside className="detail-card" aria-label="Record metadata">
            <div>
              <p className="detail-card__label">
                <HashIcon aria-hidden="true" className="mr-1 inline size-3.5" />
                Record ID
              </p>
              <p className="detail-card__value detail-card__value--id">
                {recordDetails.id}
              </p>
            </div>
            <div className="mt-6">
              <p className="detail-card__label">
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="mr-1 inline size-3.5"
                />
                Created
              </p>
              <p className="detail-card__value">
                <time dateTime={recordDetails.createdAt?.toISOString()}>
                  {formatDate(recordDetails.createdAt)}
                </time>
              </p>
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <p className="detail-card__label">
                <FileTextIcon
                  aria-hidden="true"
                  className="mr-1 inline size-3.5"
                />
                Access
              </p>
              <p className="detail-card__value">
                Visible in your patient workspace
              </p>
            </div>
          </aside>
        </div>
      </div>
    </RecordAppShell>
  )
}

function formatDate(date: Date | null) {
  if (!date) return 'Not recorded'

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long',
  }).format(date)
}
