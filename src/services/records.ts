import { db } from '#/db'
import { patientRecordsTable, recordAssignmentTable, usersTable } from '#/db/schema'
import { createServerFn } from '@tanstack/react-start'
import { eq, inArray } from 'drizzle-orm'
import z from 'zod'

export const fetchPatientRecords = createServerFn({ method: "GET" })
    .validator(z.object({
        id: z.string().uuid()
    })).handler(async ({ data }) => {
        console.log(data.id)

        return await db
            .select()
            .from(patientRecordsTable)
            .where(eq(patientRecordsTable.patientId, data.id))
    })

export const fetchPatientRecordById = createServerFn({ method: "GET" })
    .validator(z.object({
        id: z.string().uuid()
    })).handler(async ({ data }) => {
        const [record] = await db
            .select()
            .from(patientRecordsTable)
            .where(eq(patientRecordsTable.id, data.id))
            .limit(1)

        return record
    })

export const fetchAssignedRecords = createServerFn({ method: "GET" })
    .validator(z.object({
        id: z.string().uuid()
    })).handler(async ({ data }) => {
        const records = await db
            .select()
            .from(patientRecordsTable)
            .where(
                inArray(
                    patientRecordsTable.patientId,
                    db
                        .select({
                            patientId: recordAssignmentTable.patientId
                        })
                        .from(recordAssignmentTable)
                        .where(eq(recordAssignmentTable.staffId, data.id))
                )
            )

        return records
    })

export const fetchPatientNameById = createServerFn({ method: "GET" })
    .validator(z.object({
        id: z.string().uuid()
    })).handler(async ({ data }) => {
        const [patient] = await db
            .select({
                name: usersTable.name,
            })
            .from(usersTable)
            .where(eq(usersTable.id, data.id))
            .limit(1)

        return patient
    })

export const deleteRecordById = createServerFn({ method: "POST" })
    .validator(z.object({
        id: z.string().uuid()
    })).handler(async ({ data }) => {
        await db
            .delete(patientRecordsTable)
            .where(eq(patientRecordsTable, data.id))

        return { error: false }
    })

export const editRecordById = createServerFn({ method: "POST" })
    .validator(z.object({
        id: z.string().uuid(),
        title: z.string(),
        description: z.string(),
    })).handler(async ({ data }) => {
        await db
            .update(patientRecordsTable)
            .set(data)
            .where(eq(patientRecordsTable.id, data.id))

        return { error: false }
    })

export const addRecord = createServerFn({ method: "POST" })
    .validator(z.object({
        title: z.string(),
        description: z.string(),
    })).handler(async ({ data }) => {
        // await db
        //     .insert(patientRecordsTable)
        //     .values({ ...data })

        return { error: false }
    })