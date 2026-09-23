import { useForm } from "@tanstack/react-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { loginFn } from "#/services/auth";
import { Route } from "#/routes";

// Password is Test@1234

export function LoginForm() {
    const router = useRouter()
    const search = Route.useSearch()

    const [error, setError] = useState<string | null>(null)

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            setError(null)

            const response = await loginFn({ data: value })

            const userRole = response.user.role
            const redirectRoute = search.redirect

            let target = '/patient'

            if (redirectRoute) {
                const wasStaff = redirectRoute.startsWith('/staff')
                if (!(userRole === 'patient' && wasStaff)) {
                    target = redirectRoute
                }
            } else {
                target = userRole === 'patient' ? '/patient' : '/staff'
            }

            await router.navigate({ to: target, reloadDocument: true })
        }
    })

    return (
        <div className="max-w-100 border rounded-sm p-20 max-h-110 justify-center align-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <div className="mb-2">
                    <label>
                        Email:
                        <form.Field name="email">
                            {(field) => (
                                <Input
                                    placeholder="Enter your email..."
                                    className="flex-1"
                                    aria-label="email"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            )}
                        </form.Field>
                    </label>
                </div>
                <div className="mb-2">
                    <label>
                        Password:
                        <form.Field name="password">
                            {(field) => (
                                <Input
                                    placeholder="Enter your password..."
                                    type="password"
                                    className="flex-1"
                                    aria-label="password"
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
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}