import { Button } from '#/components/ui/button'
import { Textarea } from '#/components/ui/textarea'
import { useForm } from '@tanstack/react-form'
import { addRecord, fetchUsersWithName } from '#/services/records'
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '#/components/ui/select'

export const Route = createFileRoute('/staff/new')({
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

        const uniqueNames = await fetchUsersWithName({
            data: { id: context.user.id }
        })

        return uniqueNames
    },
    component: RouteComponent,
})

function RouteComponent() {
    const router = useRouter()
    const addRecordFn = useServerFn(addRecord)
    const [error, setError] = useState<string | null>(null)
    const uniqueNames = Route.useLoaderData()

    const form = useForm({
        defaultValues: {
            title: '',
            patientId: '',
            description: '',
        },
        onSubmit: async ({ value }) => {
            setError(null)
            const response = await addRecord({ data: value })

            if (!response.error) {
                await router.navigate({ to: "/staff" })
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
                        Patient:
                        <form.Field name="patientId">
                            {(field) => (
                                <Select
                                    value={field.state.value}
                                    onValueChange={field.handleChange}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Patient" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Patients</SelectLabel>
                                            {uniqueNames.map((patient) => (
                                                <SelectItem key={patient.patientId} value={patient.patientId}>
                                                    {patient.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        </form.Field>
                    </label>
                </div>
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
