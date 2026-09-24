import { RecordTableAdmin } from '#/components/record-table-admin'
import { Button } from '#/components/ui/button'
import { AdminRecordSchema } from '#/db/schema'
import { logoutFn } from '#/services/auth'
import { fetchRecordsWithName } from '#/services/records'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'

export const Route = createFileRoute('/staff/')({
  beforeLoad: ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: "/",
        search: { redirect: location.href }
      })
    }
  },
  loader: async ({ context }) => {
    if (!context.user) throw new Error("Unauthorized")

    const records = await fetchRecordsWithName({
      data: { id: context.user.id }
    })

    console.log(records)
    console.log(AdminRecordSchema)

    return records
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

    router.navigate({ to: "/" })
  }

  return (
    <div className="min-h-screen container space-y-8">
      <div className="flex justify-between items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Welcome, {user?.name || 'Patient'}</h1>
        </div>
        <div className="flex gap-2">
          <Button size="lg" onClick={() => router.navigate({ to: "/staff/new" })}>
              <PlusIcon /> Add Record
          </Button>
          <Button size="lg" variant="destructive" onClick={() => handleLogout()}>
            Logout
          </Button>
        </div>
      </div>

      <RecordTableAdmin records={records} />
    </div>
  )
}
