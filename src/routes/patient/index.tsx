import { RecordTable } from '#/components/record-table'
import { Button } from '#/components/ui/button'
import { logoutFn } from '#/services/auth'
import { fetchPatientRecords } from '#/services/records'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/patient/')({
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

        const records = await fetchPatientRecords({
            data: { id: context.user.id}
        })

        console.log(records)

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
                    <Button size="lg" variant="destructive" onClick={() => handleLogout()}>
                        Logout
                    </Button>
                </div>
            </div>

            <RecordTable records={records}/>
        </div>
    )
}
