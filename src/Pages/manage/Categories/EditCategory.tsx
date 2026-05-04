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
import type { Category } from "./AddCategory"

interface EditCategoryProps {
    category: Category
    onSuccess?: () => void
    onClose: () => void
}

export function EditCategory({ category, onSuccess, onClose }: EditCategoryProps) {
    const [title, setTitle] = React.useState(category.title)
    const [slug, setSlug] = React.useState(category.slug)
    const [status, setStatus] = React.useState<string>(category.status)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // TODO: Gọi API sửa category
        console.log("Update Category:", { id: category.id, title, slug, status })
        onSuccess?.()
        onClose()
    }

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Chỉnh sửa category</DialogTitle>
                <DialogDescription>Cập nhật thông tin category.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-category-title">Tên category</Label>
                    <Input
                        id="edit-category-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-category-slug">Slug</Label>
                    <Input
                        id="edit-category-slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                    />
                    <p className="text-xs text-muted-foreground">
                        URL: /categories/<span className="font-mono">{slug}</span>
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-category-status">Trạng thái</Label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger id="edit-category-status" className="w-full">
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
                    <Button type="submit">Cập nhật</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
