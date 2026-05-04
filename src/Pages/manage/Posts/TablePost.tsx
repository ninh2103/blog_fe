import * as React from "react"
import {
  flexRender,
  type Table as TableType,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  Copy,
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

import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { toast } from "sonner"
import type { Post } from "./types"
import { EditPost } from "./EditPost"

// ─── Status Badge ────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Post["status"] }) {
  const config = {
    published: {
      label: "Published",
      className:
        "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },
    draft: {
      label: "Draft",
      className:
        "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-400",
      dot: "bg-amber-500",
    },
    archived: {
      label: "Archived",
      className:
        "bg-zinc-500/15 text-zinc-600 hover:bg-zinc-500/25 dark:text-zinc-400",
      dot: "bg-zinc-400",
    },
  }[status]

  return (
    <Badge variant="secondary" className={config.className}>
      <span className={`mr-1 inline-block size-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </Badge>
  )
}

// ─── Column Definitions ─────────────────────────────────────────────
export const columns: ColumnDef<Post>[] = [
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
        Bài viết
        <ArrowUpDown className="size-3.5" />
      </Button>
    ),
    cell: ({ row }) => {
      const post = row.original
      return (
        <div className="flex items-center gap-3 min-w-0">
          {/* Thumbnail */}
          <div className="size-14 shrink-0 overflow-hidden rounded-md border bg-muted">
            {post.thumbnail ? (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="size-full object-cover"
              />
            ) : (
              <div className="size-full flex items-center justify-center text-muted-foreground/40">
                <Search className="size-5" />
              </div>
            )}
          </div>
          {/* Title + slug */}
          <div className="min-w-0 flex flex-col gap-0.5">
            <span className="font-medium text-foreground line-clamp-2 leading-snug">
              {post.title}
            </span>
            <span className="text-xs text-muted-foreground font-mono truncate">
              /{post.slug}
            </span>
          </div>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 h-8 gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tác giả
        <ArrowUpDown className="size-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {row.getValue("createdBy")}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 h-8 gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ngày tạo
        <ArrowUpDown className="size-3.5" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm whitespace-nowrap">
            {format(date, "dd/MM/yyyy", { locale: vi })}
          </span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {format(date, "HH:mm", { locale: vi })}
          </span>
        </div>
      )
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <PostRowActions post={row.original} />,
    enableHiding: false,
  },
]

// ─── Row Actions ─────────────────────────────────────────────────────
function PostRowActions({ post }: { post: Post }) {
  const [isEditOpen, setIsEditOpen] = React.useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(window.location.origin + "/" + post.slug)
    toast.success("Đã copy link bài viết!")
  }

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
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem className="gap-2">
              <Eye className="size-4" />
              Xem bài viết
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
            <DropdownMenuItem className="gap-2" onSelect={handleCopy}>
              <Copy className="size-4" />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" className="gap-2">
              <Trash2 className="size-4" />
              Xóa bài viết
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <EditPost
          post={post}
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
interface TablePostProps {
  table: TableType<Post>
}

export function TablePost({ table }: TablePostProps) {

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
                  className="h-16"
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
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Search className="size-8 opacity-40" />
                    <span className="text-sm">Không tìm thấy bài viết nào.</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
