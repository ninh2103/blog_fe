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
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TablePagination } from "@/components/ui/table-pagination"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Toaster } from "@/components/ui/sonner"

import { initialPosts, type Post, type PostFilters } from "./types"
import { FilterBar } from "./Fillters/FillterBar"
import { TablePost, columns } from "./TablePost"
import { AddPost } from "./AddPost"
import { isAfter, isBefore, startOfDay, endOfDay } from "date-fns"

const DEFAULT_FILTERS: PostFilters = {
  search: "",
  category: "all",
  tag: "all",
  createdBy: "all",
  fromDate: undefined,
  toDate: undefined,
  status: "all",
}

// ─── Main Post Page ──────────────────────────────────────────────────
export default function Post() {
  const [data] = React.useState<Post[]>(() => initialPosts)
  const [filters, setFilters] = React.useState<PostFilters>(DEFAULT_FILTERS)

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "createdAt", desc: true },
  ])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const [isAddOpen, setIsAddOpen] = React.useState(false)

  // Apply filters manually via globalFilterFn
  const filteredData = React.useMemo(() => {
    return data.filter((post) => {
      // Search
      if (
        filters.search &&
        !post.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false

      // Category
      if (filters.category !== "all" && post.category !== filters.category)
        return false

      // Tag
      if (filters.tag !== "all" && !post.tags.includes(filters.tag))
        return false

      // Created by (match by name)
      if (
        filters.createdBy !== "all" &&
        !post.createdBy.toLowerCase().includes(
          filters.createdBy.split("-").join(" ").toLowerCase()
        )
      )
        return false

      // Status
      if (filters.status !== "all" && post.status !== filters.status)
        return false

      // From date
      if (filters.fromDate) {
        const postDate = new Date(post.createdAt)
        if (isBefore(postDate, startOfDay(filters.fromDate))) return false
      }

      // To date
      if (filters.toDate) {
        const postDate = new Date(post.createdAt)
        if (isAfter(postDate, endOfDay(filters.toDate))) return false
      }

      return true
    })
  }, [data, filters])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const totalCount = table.getFilteredRowModel().rows.length

  return (
    <>
      <Toaster richColors position="top-right" />
      <section className="flex flex-col gap-6">

        {/* Page header */}
        <div className="flex flex-col">
          <h1 className="m-0 text-2xl! font-semibold tracking-tight text-foreground">
            Quản lý bài viết
          </h1>
          <p className="text-sm text-muted-foreground">
            Tạo, chỉnh sửa và quản lý các bài viết trên blog.
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            {selectedCount > 0
              ? `Đã chọn ${selectedCount} / ${totalCount} bài viết.`
              : `Tổng ${totalCount} bài viết.`}
          </div>

          <div className="flex items-center gap-2">
            {/* Bulk delete */}
            {selectedCount > 0 && (
              <Button variant="destructive" size="sm" className="gap-1.5">
                <Trash2 className="size-4" />
                Xóa {selectedCount} mục
              </Button>
            )}

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
                      typeof column.accessorFn !== "undefined" && column.getCanHide()
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

            {/* Add Post */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="size-4" />
                  <span className="hidden sm:inline">Thêm bài viết</span>
                </Button>
              </DialogTrigger>
              <AddPost
                onClose={() => setIsAddOpen(false)}
                onSuccess={() => {
                  // Re-fetch data if needed
                }}
              />
            </Dialog>
          </div>
        </div>

        {/* Table + Pagination */}
        <div className="flex flex-col gap-4">
          <TablePost table={table} />
          <TablePagination table={table} rowsPerPageId="post-rows-per-page" />
        </div>

      </section>
    </>
  )
}
