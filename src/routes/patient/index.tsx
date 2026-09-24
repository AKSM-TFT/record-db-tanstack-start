import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'

import { RecordAppShell, RecordPageHeader } from '#/components/record-shell'
import { RecordTable } from '#/components/record-table'
import { fetchPatientRecords } from '#/services/records'
import { logoutFn } from '#/services/auth'

export const Route = createFileRoute('/patient/')({
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

    return fetchPatientRecords({
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
    <RecordAppShell onLogout={handleLogout} roleLabel="Patient" user={user}>
      <RecordPageHeader
        description={`Welcome, ${user?.name || 'there'}. Review the records associated with your account.`}
        title="Your records"
      />
      <RecordTable records={records} />
    </RecordAppShell>
  )
}
