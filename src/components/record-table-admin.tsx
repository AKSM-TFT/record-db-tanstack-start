import { EditIcon, Table as TableIcon, Trash2Icon } from 'lucide-react'
import { Link, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'

import type { AdminRecord } from '#/db/schema'
import { RecordSectionHeader } from '#/components/record-shell'
import { ActionButton } from '#/components/ui/action-button'
import { Button } from '#/components/ui/button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '#/components/ui/empty'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import { deleteRecordById } from '#/services/records'

export function RecordTableAdmin({ records }: { records: AdminRecord[] }) {
  if (records.length === 0) {
    return (
      <section className="records-section" aria-label="Assigned records">
        <RecordSectionHeader
          count={0}
          description="Records for patients assigned to your account"
          title="Assigned records"
        />
        <div className="records-section__empty">
          <Empty className="empty-state">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <TableIcon aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>No assigned records</EmptyTitle>
              <EmptyDescription>
                Records for your assigned patients will appear here. Use Add
                record to create the first one.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </section>
    )
  }

  return (
    <section className="records-section" aria-label="Assigned records">
      <RecordSectionHeader
        count={records.length}
        description="Records for patients assigned to your account"
        title="Assigned records"
      />
      <div className="records-table-scroll">
        <Table className="records-table records-table--admin">
          <TableHeader>
            <TableRow>
              <TableHead>Record ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <RecordTableRow key={record.id} record={record} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

function RecordTableRow({ record }: { record: AdminRecord }) {
  const { id, name, title, createdAt } = record
  const router = useRouter()
  const deleteFn = useServerFn(deleteRecordById)

  return (
    <TableRow>
      <TableCell>
        <span className="record-id" title={id}>
          {id}
        </span>
      </TableCell>
      <TableCell>
        <span className="record-patient">{name ?? 'Unassigned patient'}</span>
        <span className="record-id record-id--mobile" title={id}>
          {id}
        </span>
      </TableCell>
      <TableCell>
        <Link
          aria-label={`Edit record ${title}`}
          className="record-title-link"
          params={{ id }}
          to="/staff/$id/edit"
        >
          {title}
        </Link>
      </TableCell>
      <TableCell>
        <time className="record-date" dateTime={createdAt?.toISOString()}>
          {formatDate(createdAt)}
        </time>
      </TableCell>
      <TableCell>
        <div className="record-actions">
          <Button
            aria-label={`Edit record ${title}`}
            asChild
            size="icon-sm"
            title="Edit record"
            variant="ghost"
          >
            <Link params={{ id }} to="/staff/$id/edit">
              <EditIcon aria-hidden="true" />
            </Link>
          </Button>
          <ActionButton
            action={async () => {
              try {
                const response = await deleteFn({ data: { id } })
                await router.invalidate()
                return response
              } catch {
                return {
                  error: true,
                  message: 'Unable to delete this record. Please try again.',
                }
              }
            }}
            areYouSureDescription={`Delete “${title}”? This action cannot be undone.`}
            aria-label={`Delete record ${title}`}
            requireAreYouSure
            size="icon-sm"
            title="Delete record"
            variant="ghost"
          >
            <Trash2Icon aria-hidden="true" />
          </ActionButton>
        </div>
      </TableCell>
    </TableRow>
  )
}

function formatDate(date: Date | null) {
  if (!date) return '—'

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(date)
}
