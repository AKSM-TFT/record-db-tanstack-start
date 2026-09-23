import { fetchPatientRecordById } from '#/services/records'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/patient/$id/')({
    beforeLoad: ({ context, location }) => {
        if (!context.isAuthenticated) {
            throw redirect({
                to: "/",
                search: { redirect: location.href }
            })
        }
    },
    loader: ({ params }) => fetchPatientRecordById({ data: params }),
    component: RouteComponent,
})

function RouteComponent() {
    const recordDetails = Route.useLoaderData()

    return (
        <div className="min-h-screen small-container space-y-8">
            <Link to="/patient">
                Go back to records page
            </Link>
            <h1 className="text-4xl font-bold">{recordDetails.title}</h1>
            <p>This record was created at {formatDate(recordDetails.createdAt)}</p>
            <hr />
            <h2>{recordDetails.description || 'No description.'}</h2>
        </div>
    )
}

function formatDate(date: Date | null) {
    const formatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: "short"
    })

    return formatter.format(date!)
}