import * as React from "react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  Columns3,
  Plus,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import { type Tag, AddTag } from "./AddTag"
import { TableTag, columns } from "./TableTag"

// ─── Fake data (sẽ thay bằng API thực) ──────────────────────────────
const initialTags: Tag[] = [
  { id: 1, title: "React", slug: "react", posts: 24, status: "active" },
  { id: 2, title: "TypeScript", slug: "typescript", posts: 18, status: "active" },
  { id: 3, title: "Next.js", slug: "nextjs", posts: 12, status: "active" },
  { id: 4, title: "Tailwind CSS", slug: "tailwind-css", posts: 15, status: "active" },
  { id: 5, title: "Node.js", slug: "nodejs", posts: 9, status: "inactive" },
  { id: 6, title: "GraphQL", slug: "graphql", posts: 6, status: "inactive" },
  { id: 7, title: "Docker", slug: "docker", posts: 3, status: "active" },
  { id: 8, title: "Kubernetes", slug: "kubernetes", posts: 2, status: "inactive" },
  { id: 9, title: "PostgreSQL", slug: "postgresql", posts: 7, status: "active" },
  { id: 10, title: "MongoDB", slug: "mongodb", posts: 5, status: "active" },
  { id: 11, title: "Redis", slug: "redis", posts: 4, status: "active" },
  { id: 12, title: "AWS", slug: "aws", posts: 8, status: "active" },
  { id: 13, title: "Firebase", slug: "firebase", posts: 1, status: "inactive" },
  { id: 14, title: "Vite", slug: "vite", posts: 11, status: "active" },
  { id: 15, title: "Prisma", slug: "prisma", posts: 6, status: "active" },
]

// ─── Main Tag Page ──────────────────────────────────────────────────
export default function Tag() {
  const [data] = React.useState<Tag[]>(() => initialTags)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [isAddOpen, setIsAddOpen] = React.useState(false)

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const totalCount = table.getFilteredRowModel().rows.length

  return (
    <section className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="m-0 text-2xl! font-semibold tracking-tight text-foreground">
          Quản lý Tags
        </h1>
        <p className="text-sm text-muted-foreground">
          Tạo và quản lý các tag để phân loại bài viết trên blog.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          {/* Search */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm tag..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* Status filter */}
          <Select
            value={
              (table.getColumn("status")?.getFilterValue() as string[] | undefined)?.[0] ??
              "all"
            }
            onValueChange={(value) => {
              if (value === "all") {
                table.getColumn("status")?.setFilterValue(undefined)
              } else {
                table.getColumn("status")?.setFilterValue([value])
              }
            }}
          >
            <SelectTrigger className="w-32 hidden sm:flex">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {/* Column visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Columns3 className="size-4" />
                <span className="hidden lg:inline">Cột hiển thị</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" && column.getCanHide(),
                )
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add tag */}
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="size-4" />
                <span className="hidden sm:inline">Thêm tag</span>
              </Button>
            </DialogTrigger>
            <AddTag
              onClose={() => setIsAddOpen(false)}
              onSuccess={() => {
                // Re-fetch data if needed
              }}
            />
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <TableTag table={table} />

      {/* Footer Info */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedCount > 0
            ? `Đã chọn ${selectedCount} / ${totalCount} tag.`
            : `Tổng ${totalCount} tag.`}
        </div>
        
        <div className="flex items-center gap-2">
            <Label htmlFor="rows-per-page" className="text-sm font-medium whitespace-nowrap">
              Hiển thị
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger size="sm" className="w-18" id="rows-per-page">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
      </div>
    </section>
  )
}
