import * as React from "react"
import {
    flexRender,
    type Table as TableType,
} from "@tanstack/react-table"
import {
    ArrowUpDown,
    Edit,
    Eye,
    MoreHorizontal,
    Search,
    Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Dialog } from "@/components/ui/dialog"
import { type ColumnDef } from "@tanstack/react-table"
import { EditTag } from "./EditTag"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import type { Tag } from "./AddTag"

// ─── Column Definitions ─────────────────────────────────────────────
export const columns: ColumnDef<Tag>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected()
                            ? true
                            : table.getIsSomePageRowsSelected()
                                ? "indeterminate"
                                : false
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Chọn tất cả"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Chọn hàng"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <Button
                variant="ghost"
                size="sm"
                className="-ml-2 h-8 gap-1"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Title
                <ArrowUpDown className="size-3.5" />
            </Button>
        ),
        cell: ({ row }) => (
            <span className="font-medium text-foreground">{row.getValue("title")}</span>
        ),
        enableHiding: false,
    },
    {
        accessorKey: "slug",
        header: ({ column }) => (
            <Button
                variant="ghost"
                size="sm"
                className="-ml-2 h-8 gap-1"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Slug
                <ArrowUpDown className="size-3.5" />
            </Button>
        ),
        cell: ({ row }) => (
            <span className="text-muted-foreground font-mono text-xs">
                /{row.getValue("slug")}
            </span>
        ),
    },
    {
        accessorKey: "posts",
        header: ({ column }) => (
            <div className="text-right">
                <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-2 h-8 gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Posts
                    <ArrowUpDown className="size-3.5" />
                </Button>
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-right tabular-nums font-medium">
                {row.getValue<number>("posts")}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue<string>("status")
            return (
                <Badge
                    variant={status === "active" ? "default" : "secondary"}
                    className={
                        status === "active"
                            ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-400"
                            : "bg-zinc-500/15 text-zinc-600 hover:bg-zinc-500/25 dark:text-zinc-400"
                    }
                >
                    <span
                        className={`mr-1 inline-block size-1.5 rounded-full ${status === "active" ? "bg-emerald-500" : "bg-zinc-400"
                            }`}
                    />
                    {status === "active" ? "Active" : "Inactive"}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => <TagRowActions tag={row.original} />,
        enableHiding: false,
    },
]

// ─── Row Actions ─────────────────────────────────────────────────────
function TagRowActions({ tag }: { tag: Tag }) {
    const [isEditOpen, setIsEditOpen] = React.useState(false)

    return (
        <div className="flex justify-end">
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground data-[state=open]:bg-muted"
                        >
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Mở menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="gap-2">
                            <Eye className="size-4" />
                            Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="gap-2"
                            onSelect={(e) => {
                                e.preventDefault()
                                setIsEditOpen(true)
                            }}
                        >
                            <Edit className="size-4" />
                            Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" className="gap-2">
                            <Trash2 className="size-4" />
                            Xóa tag
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <EditTag
                    tag={tag}
                    onClose={() => setIsEditOpen(false)}
                    onSuccess={() => {
                        // Re-fetch data if needed
                    }}
                />
            </Dialog>
        </div>
    )
}

// ─── Table Component ──────────────────────────────────────────────────
interface TableTagProps {
    table: TableType<Tag>
}

export function TableTag({ table }: TableTagProps) {
    const pageIndex = table.getState().pagination.pageIndex
    const pageCount = table.getPageCount()

    // Generate page numbers for pagination
    const renderPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 3

        if (pageCount <= maxVisiblePages + 2) {
            for (let i = 0; i < pageCount; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={pageIndex === i}
                            onClick={() => table.setPageIndex(i)}
                            href="#"
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                )
            }
        } else {
            // Always show first page
            pages.push(
                <PaginationItem key={0}>
                    <PaginationLink
                        isActive={pageIndex === 0}
                        onClick={() => table.setPageIndex(0)}
                        href="#"
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            )

            if (pageIndex > 1) {
                pages.push(
                    <PaginationItem key="start-ellipsis">
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }

            // Show current page and neighbors
            const start = Math.max(1, pageIndex - 1)
            const end = Math.min(pageCount - 2, pageIndex + 1)

            for (let i = start; i <= end; i++) {
                if (i === 0 || i === pageCount - 1) continue
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={pageIndex === i}
                            onClick={() => table.setPageIndex(i)}
                            href="#"
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                )
            }

            if (pageIndex < pageCount - 2) {
                pages.push(
                    <PaginationItem key="end-ellipsis">
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }

            // Always show last page
            pages.push(
                <PaginationItem key={pageCount - 1}>
                    <PaginationLink
                        isActive={pageIndex === pageCount - 1}
                        onClick={() => table.setPageIndex(pageCount - 1)}
                        href="#"
                    >
                        {pageCount}
                    </PaginationLink>
                </PaginationItem>
            )
        }
        return pages
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                                        <Search className="size-8 opacity-40" />
                                        <span>Không tìm thấy tag nào.</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Pagination className="justify-end">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={(e) => {
                                e.preventDefault()
                                table.previousPage()
                            }}
                            href="#"
                            className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                    {renderPageNumbers()}
                    <PaginationItem>
                        <PaginationNext
                            onClick={(e) => {
                                e.preventDefault()
                                table.nextPage()
                            }}
                            href="#"
                            className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
