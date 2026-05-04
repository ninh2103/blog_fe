import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export interface Category {
  id: number
  title: string
  slug: string
  posts: number
  status: "active" | "inactive"
}

interface AddCategoryProps {
  onSuccess?: () => void
  onClose: () => void
}

export function AddCategory({ onSuccess, onClose }: AddCategoryProps) {
  const [title, setTitle] = React.useState("")
  const [slug, setSlug] = React.useState("")
  const [status, setStatus] = React.useState<string>("active")

  // Auto-generate slug from title
  React.useEffect(() => {
    const generated = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
    setSlug(generated)
  }, [title])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: Gọi API tạo category
    console.log("Create Category:", { title, slug, status })
    onSuccess?.()
    onClose()
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Tạo category mới</DialogTitle>
        <DialogDescription>
          Thêm category mới để phân loại bài viết.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="add-category-title">Tên category</Label>
          <Input
            id="add-category-title"
            placeholder="Ví dụ: Công nghệ, Lập trình..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="add-category-slug">Slug</Label>
          <Input
            id="add-category-slug"
            placeholder="cong-nghe"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            URL: /categories/<span className="font-mono">{slug || "..."}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="add-category-status">Trạng thái</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="add-category-status" className="w-full">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit">Tạo category</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
