import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'

import { RecordAppShell, RecordPageHeader } from '#/components/record-shell'
import { RecordTableAdmin } from '#/components/record-table-admin'
import { Button } from '#/components/ui/button'
import { fetchRecordsWithName } from '#/services/records'
import { logoutFn } from '#/services/auth'

export const Route = createFileRoute('/staff/')({
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

    return fetchRecordsWithName({
      data: { id: context.user.id },
    })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const { user } = Route.useRouteContext()
  const records = Route.useLoaderData()

  async function handleLogout() {
    await logoutFn()
    await router.invalidate()
    await router.navigate({ to: '/' })
  }

  return (
    <RecordAppShell
      onLogout={handleLogout}
      roleLabel="Clinic staff"
      user={user}
    >
      <RecordPageHeader
        action={
          <Button
            onClick={() => router.navigate({ to: '/staff/new' })}
            type="button"
          >
            <PlusIcon aria-hidden="true" />
            Add record
          </Button>
        }
        description="Review and manage records for patients assigned to your account."
        title="Assigned records"
      />
      <RecordTableAdmin records={records} />
    </RecordAppShell>
  )
}
