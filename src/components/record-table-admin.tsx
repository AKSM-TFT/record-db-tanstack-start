import type { Record } from '#/db/schema'
import { EditIcon, Table as TableIcon, Trash2Icon } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from './ui/empty'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from './ui/table'
import { Link, useRouter } from '@tanstack/react-router'
import { Button } from './ui/button'
import { ActionButton } from './ui/action-button'
import { useServerFn } from '@tanstack/react-start'
import { deleteRecordById } from '#/services/records'

export function RecordTableAdmin({ records }: { records: Array<Record> }) {
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
                        <TableHead>Patient</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Created On</TableHead>
                        <TableHead className="w-0"></TableHead>
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
    const { id, patientId, title, createdAt } = record
    const router = useRouter()
    const deleteFn = useServerFn(deleteRecordById)

    return (
        <TableRow>
                <TableCell className="font-medium">
                    {id}
                </TableCell>
                <TableCell className="font-medium">
                    {patientId}
                </TableCell>
                <TableCell className="font-medium">
                    {title}
                </TableCell>
                <TableCell className="test-sm text-muted-foreground">
                    {formatDate(createdAt)}
                </TableCell>
                <TableCell data-actions>
                    <div className="flex items-cnter justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" asChild>
                            <Link to="/staff/$id/edit" params={{ id }}>
                                <EditIcon />
                            </Link>
                        </Button>
                        <ActionButton action={async () => {
                            const res = await deleteFn({ data: { id } })
                            router.invalidate()
                            return res
                        }}
                            variant="destructive"
                            size="icon-sm">
                            <Trash2Icon />
                        </ActionButton>
                    </div>
                </TableCell>
            </TableRow>
    )
}

function formatDate(date: Date | null) {
    const formatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: "short"
    })

    return formatter.format(date!)
}