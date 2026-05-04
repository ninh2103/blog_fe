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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TablePagination } from "@/components/ui/table-pagination"

import { type Category, AddCategory } from "./AddCategory"
import { TableCategory, columns } from "./TableCategory"

// ─── Fake data (sẽ thay bằng API thực) ──────────────────────────────
const initialCategories: Category[] = [
  { id: 1, title: "Công nghệ", slug: "cong-nghe", posts: 32, status: "active" },
  { id: 2, title: "Lập trình", slug: "lap-trinh", posts: 28, status: "active" },
  { id: 3, title: "Thiết kế", slug: "thiet-ke", posts: 15, status: "active" },
  { id: 4, title: "DevOps", slug: "devops", posts: 12, status: "active" },
  { id: 5, title: "Bảo mật", slug: "bao-mat", posts: 8, status: "inactive" },
  { id: 6, title: "Trí tuệ nhân tạo", slug: "tri-tue-nhan-tao", posts: 21, status: "active" },
  { id: 7, title: "Mobile", slug: "mobile", posts: 17, status: "active" },
  { id: 8, title: "Database", slug: "database", posts: 10, status: "active" },
  { id: 9, title: "Cloud", slug: "cloud", posts: 14, status: "active" },
  { id: 10, title: "Open Source", slug: "open-source", posts: 6, status: "inactive" },
  { id: 11, title: "Blockchain", slug: "blockchain", posts: 4, status: "inactive" },
  { id: 12, title: "UX/UI", slug: "ux-ui", posts: 9, status: "active" },
]

// ─── Main Category Page ──────────────────────────────────────────────────
export default function Category() {
  const [data] = React.useState<Category[]>(() => initialCategories)
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


  return (
    <section className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col">
        <h1 className="m-0 text-2xl! font-semibold tracking-tight text-foreground">
          Quản lý Categories
        </h1>
        <p className="text-sm text-muted-foreground">
          Tạo và quản lý các category để phân loại bài viết trên blog.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          {/* Search */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm category..."
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

          {/* Add category */}
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="size-4" />
                <span className="hidden sm:inline">Thêm category</span>
              </Button>
            </DialogTrigger>
            <AddCategory
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
        <TableCategory table={table} />
        <TablePagination table={table} rowsPerPageId="category-rows-per-page" />
      </div>
    </section>
  )
}
