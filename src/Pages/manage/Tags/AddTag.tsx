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

export interface Tag {
  id: number
  title: string
  slug: string
  posts: number
  status: "active" | "inactive"
}

interface AddTagProps {
  onSuccess?: () => void
  onClose: () => void
}

export function AddTag({ onSuccess, onClose }: AddTagProps) {
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
    // TODO: Gọi API tạo tag
    console.log("Create Tag:", { title, slug, status })
    onSuccess?.()
    onClose()
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Tạo tag mới</DialogTitle>
        <DialogDescription>
          Thêm tag mới để phân loại bài viết.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="add-tag-title">Tên tag</Label>
          <Input
            id="add-tag-title"
            placeholder="Ví dụ: React, JavaScript..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="add-tag-slug">Slug</Label>
          <Input
            id="add-tag-slug"
            placeholder="react-hooks"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            URL: /tags/<span className="font-mono">{slug || "..."}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="add-tag-status">Trạng thái</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="add-tag-status" className="w-full">
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
          <Button type="submit">Tạo tag</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
