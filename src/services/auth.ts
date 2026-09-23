import { db } from "#/db";
import { UserSchema, usersTable } from "#/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { setCookie, deleteCookie, getCookie } from '@tanstack/react-start/server'
import z from "zod";
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
})

export const fetchSessionUser = createServerFn({ method: "GET" })
    .handler( async () => {
        const session = await getCookie('session')

        if (!session) return null

        try {
            const rawUser = JSON.parse(session)
            const result = UserSchema.safeParse(rawUser)
            return result.success ? result.data : null
        } catch {
            try {
                const rawUser = JSON.parse(decodeURIComponent(session))
                const result = UserSchema.safeParse(rawUser)
                return result.success ? result.data : null
            } catch {
                return null
            }
        }
    })

export const loginFn = createServerFn({ method:"POST" })
    .validator(LoginSchema)
    .handler( async ({data}) => {
        const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, data.email))
            .limit(1)

        const isPasswordValid = user ? await bcrypt.compare(data.password, user.passwordHash) : false

        if (!user || !isPasswordValid) {
            throw new Error('Invalude email or password')
        }

        const safeUser = UserSchema.parse(user)

        await setCookie('session', JSON.stringify(safeUser), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })

        return { success: true, user: safeUser }
    })

export const logoutFn = createServerFn({ method:"POST" })
    .handler(async () => {
        await deleteCookie('session', { path: '/' })
        return { success:true }
    })