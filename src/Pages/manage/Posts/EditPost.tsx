import * as React from "react"
import { ImageIcon, Link, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { RichEditor } from "@/components/ui/rich-editor"
import { CATEGORY_OPTIONS, TAG_OPTIONS, type Post } from "./types"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface EditPostProps {
  post: Post
  onSuccess?: () => void
  onClose: () => void
}

export function EditPost({ post, onSuccess, onClose }: EditPostProps) {
  const [title, setTitle] = React.useState(post.title)
  const [slug, setSlug] = React.useState(post.slug)
  const [category, setCategory] = React.useState(post.category)
  const [tags, setTags] = React.useState<string[]>(post.tags)
  const [status, setStatus] = React.useState<string>(post.status)
  const [description, setDescription] = React.useState(post.description)

  // Image state
  const [thumbnailUrl, setThumbnailUrl] = React.useState(post.thumbnail ?? "")
  const [thumbnailPreview, setThumbnailPreview] = React.useState(post.thumbnail ?? "")
  const [imageMode, setImageMode] = React.useState<"upload" | "url">("url")
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setThumbnailPreview(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  function handleUrlChange(url: string) {
    setThumbnailUrl(url)
    setThumbnailPreview(url)
  }

  function handleRemoveImage() {
    setThumbnailPreview("")
    setThumbnailUrl("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function toggleTag(value: string) {
    setTags((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log("Update Post:", { id: post.id, title, slug, category, tags, status, description, thumbnailPreview })
    onSuccess?.()
    onClose()
  }

  return (
    <DialogContent className="sm:max-w-2xl p-0 gap-0">
      <DialogHeader className="px-6 pt-6 pb-4 border-b">
        <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
        <DialogDescription>
          Cập nhật thông tin bài viết.
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="max-h-[70vh]">
        <form id="edit-post-form" onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-5">

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <Label>Ảnh bìa</Label>
            <div className="flex gap-2 mb-2">
              <Button
                type="button"
                variant={imageMode === "upload" ? "default" : "outline"}
                size="sm"
                onClick={() => setImageMode("upload")}
                className="gap-1.5 h-8"
              >
                <Upload className="size-3.5" />
                Upload
              </Button>
              <Button
                type="button"
                variant={imageMode === "url" ? "default" : "outline"}
                size="sm"
                onClick={() => setImageMode("url")}
                className="gap-1.5 h-8"
              >
                <Link className="size-3.5" />
                Paste URL
              </Button>
            </div>

            {imageMode === "upload" ? (
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors cursor-pointer",
                  thumbnailPreview ? "border-border" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
                )}
                onClick={() => !thumbnailPreview && fileInputRef.current?.click()}
              >
                {thumbnailPreview ? (
                  <div className="relative w-full">
                    <img
                      src={thumbnailPreview}
                      alt="Preview"
                      className="w-full h-44 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 size-7"
                      onClick={(e) => { e.stopPropagation(); handleRemoveImage() }}
                    >
                      <X className="size-3.5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
                    <ImageIcon className="size-10 opacity-40" />
                    <p className="text-sm font-medium">Kéo thả hoặc click để upload</p>
                    <p className="text-xs">PNG, JPG, WEBP tối đa 5MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={thumbnailUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                />
                {thumbnailPreview && (
                  <div className="relative">
                    <img
                      src={thumbnailPreview}
                      alt="Preview"
                      className="w-full h-44 object-cover rounded-lg border"
                      onError={() => setThumbnailPreview("")}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 size-7"
                      onClick={handleRemoveImage}
                    >
                      <X className="size-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-post-title">Tiêu đề <span className="text-destructive">*</span></Label>
            <Input
              id="edit-post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-post-slug">Slug <span className="text-destructive">*</span></Label>
            <Input
              id="edit-post-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              URL: /posts/<span className="font-mono">{slug}</span>
            </p>
          </div>

          {/* Category + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-post-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="edit-post-category" className="w-full">
                  <SelectValue placeholder="Chọn category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-post-status">Trạng thái</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="edit-post-status" className="w-full">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleTag(opt.value)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    tags.includes(opt.value)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label>Nội dung <span className="text-destructive">*</span></Label>
            <RichEditor
              value={description}
              onChange={setDescription}
              placeholder="Nhập nội dung bài viết..."
            />
          </div>

        </form>
      </ScrollArea>

      <DialogFooter className="px-6 py-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit" form="edit-post-form">
          Cập nhật
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
