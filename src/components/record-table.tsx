import type { Record } from '#/db/schema'
import { Table as TableIcon } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from './ui/empty'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from './ui/table'
import { Link } from '@tanstack/react-router'

export function RecordTable({ records }: { records: Array<Record> }) {
    if (records.length === 0) {
        return (
            <Empty className="border border-dashed">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <TableIcon />
                    </EmptyMedia>
                    <EmptyTitle>No Records</EmptyTitle>
                    <EmptyDescription>You are healthy!</EmptyDescription>
                </EmptyHeader>
            </Empty>
        )
    } else {
        return (
            <Table>
                <TableHeader>
                    <TableRow className="hover: bg-transparent">
                        <TableHead>Record ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Created On</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {records.map(record => (
                        <RecordTableRow key={record.id} record={record} />
                    ))}
                </TableBody>
            </Table>
        )
    }
}

function RecordTableRow({ record }: { record: Record }) {
    const { id, title, createdAt } = record

    return (
        <Link to="/patient/$id" params={{ id }}>
            <TableRow>
                <TableCell className="font-medium">
                    {id}
                </TableCell>
                <TableCell className="font-medium">
                    {title}
                </TableCell>
                <TableCell className="test-sm text-muted-foreground">
                    {formatDate(createdAt)}
                </TableCell>
            </TableRow>
        </Link>
    )
}

function formatDate(date: Date | null) {
    const formatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: "short"
    })

    return formatter.format(date!)
}