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
import type { Tag } from "./AddTag"

interface EditTagProps {
    tag: Tag
    onSuccess?: () => void
    onClose: () => void
}

export function EditTag({ tag, onSuccess, onClose }: EditTagProps) {
    const [title, setTitle] = React.useState(tag.title)
    const [slug, setSlug] = React.useState(tag.slug)
    const [status, setStatus] = React.useState<string>(tag.status)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // TODO: Gọi API sửa tag
        console.log("Update Tag:", { id: tag.id, title, slug, status })
        onSuccess?.()
        onClose()
    }

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Chỉnh sửa tag</DialogTitle>
                <DialogDescription>Cập nhật thông tin tag.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-tag-title">Tên tag</Label>
                    <Input
                        id="edit-tag-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-tag-slug">Slug</Label>
                    <Input
                        id="edit-tag-slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                    />
                    <p className="text-xs text-muted-foreground">
                        URL: /tags/<span className="font-mono">{slug}</span>
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="edit-tag-status">Trạng thái</Label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger id="edit-tag-status" className="w-full">
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
