import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').$type<'patient' | 'staff'>().default('patient').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const patientRecordsTable = pgTable('records', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade'}),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const recordAssignmentTable = pgTable('assignments', {
  patientId: uuid('patient_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade'}),
  staffId: uuid('staff_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade'}),
})

export const UserSchema = createSelectSchema(usersTable, {createdAt: z.coerce.date(),}).omit({ passwordHash: true})

export type User = z.infer<typeof UserSchema>

export interface AuthContext {
  user: User | null
  isAuthenticated: boolean
}

export const RecordSchema = createSelectSchema(patientRecordsTable)

export type Record = z.infer<typeof RecordSchema>