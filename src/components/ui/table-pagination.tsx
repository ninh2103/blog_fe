import * as React from "react"
import { type Table } from "@tanstack/react-table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface TablePaginationProps<TData> {
  table: Table<TData>
  pageSizeOptions?: number[]
  rowsPerPageId?: string
}

export function TablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 50],
  rowsPerPageId = "rows-per-page",
}: TablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()

  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = []

    if (pageCount <= 5) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={pageIndex === i}
              onClick={(e) => { e.preventDefault(); table.setPageIndex(i) }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      // First page
      pages.push(
        <PaginationItem key={0}>
          <PaginationLink
            href="#"
            isActive={pageIndex === 0}
            onClick={(e) => { e.preventDefault(); table.setPageIndex(0) }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      )

      if (pageIndex > 2) {
        pages.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      const start = Math.max(1, pageIndex - 1)
      const end = Math.min(pageCount - 2, pageIndex + 1)

      for (let i = start; i <= end; i++) {
        if (i === 0 || i === pageCount - 1) continue
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={pageIndex === i}
              onClick={(e) => { e.preventDefault(); table.setPageIndex(i) }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (pageIndex < pageCount - 3) {
        pages.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      // Last page
      pages.push(
        <PaginationItem key={pageCount - 1}>
          <PaginationLink
            href="#"
            isActive={pageIndex === pageCount - 1}
            onClick={(e) => { e.preventDefault(); table.setPageIndex(pageCount - 1) }}
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return pages
  }

  if (pageCount <= 0) return null

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <Label
          htmlFor={rowsPerPageId}
          className="text-sm font-medium text-muted-foreground whitespace-nowrap"
        >
          Hiển thị
        </Label>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
            table.setPageIndex(0)
          }}
        >
          <SelectTrigger size="sm" className="w-18" id={rowsPerPageId}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">hàng / trang</span>
      </div>

      {/* Page navigation */}
      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text="Trước"
              onClick={(e) => { e.preventDefault(); table.previousPage() }}
              className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              href="#"
              text="Sau"
              onClick={(e) => { e.preventDefault(); table.nextPage() }}
              className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
