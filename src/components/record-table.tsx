import { Table as TableIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import type { Record as PatientRecord } from '#/db/schema'
import { RecordSectionHeader } from '#/components/record-shell'
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

export function RecordTable({ records }: { records: Array<PatientRecord> }) {
  if (records.length === 0) {
    return (
      <section className="records-section" aria-label="Patient record history">
        <RecordSectionHeader
          count={0}
          description="Your saved record entries"
          title="Record history"
        />
        <div className="records-section__empty">
          <Empty className="empty-state">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <TableIcon aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>No records yet</EmptyTitle>
              <EmptyDescription>
                Records associated with your account will appear here when they
                are added.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </section>
    )
  }

  return (
    <section className="records-section" aria-label="Patient record history">
      <RecordSectionHeader
        count={records.length}
        description="Your saved record entries"
        title="Record history"
      />
      <div className="records-table-scroll">
        <Table className="records-table records-table--patient">
          <TableHeader>
            <TableRow>
              <TableHead>Record ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <span className="record-id" title={record.id}>
                    {record.id}
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    aria-label={`Open record ${record.title}`}
                    className="record-title-link"
                    params={{ id: record.id }}
                    to="/patient/$id"
                  >
                    {record.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <time
                    className="record-date"
                    dateTime={record.createdAt?.toISOString()}
                  >
                    {formatDate(record.createdAt)}
                  </time>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

function formatDate(date: Date | null) {
  if (!date) return '—'

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(date)
}
