import * as React from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { type PostFilters, CATEGORY_OPTIONS, TAG_OPTIONS, AUTHOR_OPTIONS } from "../types"
import { cn } from "@/lib/utils"

interface FilterBarProps {
  filters: PostFilters
  onChange: (filters: PostFilters) => void
  onReset: () => void
}

export function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  function set<K extends keyof PostFilters>(key: K, value: PostFilters[K]) {
    onChange({ ...filters, [key]: value })
  }

  const hasActiveFilter =
    filters.search !== "" ||
    filters.category !== "all" ||
    filters.tag !== "all" ||
    filters.createdBy !== "all" ||
    filters.status !== "all" ||
    filters.fromDate !== undefined ||
    filters.toDate !== undefined

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Search className="size-4 text-muted-foreground" />
            Bộ lọc tìm kiếm
          </CardTitle>
          {hasActiveFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" />
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          {/* Search */}
          <div className="xl:col-span-2 flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Tìm kiếm</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tiêu đề bài viết..."
                value={filters.search}
                onChange={(e) => set("search", e.target.value)}
                className="pl-8 h-9 text-sm"
              />
              {filters.search && (
                <button
                  onClick={() => set("search", "")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Category</Label>
            <Select value={filters.category} onValueChange={(v) => set("category", v)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {CATEGORY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tag */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Tag</Label>
            <Select value={filters.tag} onValueChange={(v) => set("tag", v)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {TAG_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Created By */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Tác giả</Label>
            <Select value={filters.createdBy} onValueChange={(v) => set("createdBy", v)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {AUTHOR_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Trạng thái</Label>
            <Select value={filters.status} onValueChange={(v) => set("status", v)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* From Date */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Từ ngày</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-9 w-full justify-start text-left text-sm font-normal",
                    !filters.fromDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 size-3.5" />
                  {filters.fromDate
                    ? format(filters.fromDate, "dd/MM/yyyy", { locale: vi })
                    : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.fromDate}
                  onSelect={(date) => set("fromDate", date)}
                  disabled={(date) =>
                    filters.toDate ? date > filters.toDate : false
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* To Date */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Đến ngày</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-9 w-full justify-start text-left text-sm font-normal",
                    !filters.toDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 size-3.5" />
                  {filters.toDate
                    ? format(filters.toDate, "dd/MM/yyyy", { locale: vi })
                    : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.toDate}
                  onSelect={(date) => set("toDate", date)}
                  disabled={(date) =>
                    filters.fromDate ? date < filters.fromDate : false
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
