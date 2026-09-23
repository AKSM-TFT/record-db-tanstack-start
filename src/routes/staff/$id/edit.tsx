import { Button } from '#/components/ui/button'
import { Textarea } from '#/components/ui/textarea'
import { editRecordById, fetchPatientRecordById } from '#/services/records'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'

export const Route = createFileRoute('/staff/$id/edit')({
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
    const router = useRouter()
    const recordDetails = Route.useLoaderData()
    const editRecord = useServerFn(editRecordById)
    const [error, setError] = useState<string | null>(null)

    const form = useForm({
        defaultValues: {
            id: recordDetails.id,
            title: recordDetails.title,
            description: recordDetails.description || '',
        },
        onSubmit: async ({ value }) => {
            setError(null)
            const response = await editRecord({ data: value })
            
            if (!response.error) {
                await router.navigate({ to: "/staff"})
            } else {
                setError("Unable to edit!")
            }
        }
    })

    return (
        <div className="max-w-100 border rounded-sm p-20 max-h-110 justify-center align-center">
            <Link to="/staff">
                Go back to records page
            </Link>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <div className="mb-2">
                    <label>
                        Title:
                        <form.Field name="title">
                            {(field) => (
                                <Textarea
                                    placeholder="Give the record a name..."
                                    className="flex-1"
                                    aria-label="title"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            )}
                        </form.Field>
                    </label>
                </div>
                <div className="mb-2">
                    <label>
                        Description:
                        <form.Field name="description">
                            {(field) => (
                                <Textarea
                                    placeholder="Enter the description of the record..."
                                    className="flex-1"
                                    aria-label="title"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            )}
                        </form.Field>
                    </label>
                </div>

                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                <div className="flex gap-2 mt-10">
                    <Button
                        type="submit"
                        className="flex-1"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}
