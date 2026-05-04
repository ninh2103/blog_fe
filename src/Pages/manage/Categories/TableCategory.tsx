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
import type { Category } from "./AddCategory"
import { EditCategory } from "./EditCategory"

// ─── Column Definitions ─────────────────────────────────────────────
export const columns: ColumnDef<Category>[] = [
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
        cell: ({ row }) => <CategoryRowActions category={row.original} />,
        enableHiding: false,
    },
]

// ─── Row Actions ─────────────────────────────────────────────────────
function CategoryRowActions({ category }: { category: Category }) {
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
                            Xóa category
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <EditCategory
                    category={category}
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
interface TableCategoryProps {
    table: TableType<Category>
}

export function TableCategory({ table }: TableCategoryProps) {
    return (
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
                                    <span>Không tìm thấy category nào.</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

