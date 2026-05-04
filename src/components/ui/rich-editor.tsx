import * as React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Undo,
  Redo,
  Heading2,
  Heading3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RichEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
}

export function RichEditor({ value, onChange, placeholder = "Nhập nội dung bài viết...", className }: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "min-h-[200px] px-3 py-2 text-sm focus:outline-none prose prose-sm max-w-none",
      },
    },
  })

  if (!editor) return null

  const toolbarItems = [
    {
      group: [
        {
          icon: Bold,
          title: "Bold",
          action: () => editor.chain().focus().toggleBold().run(),
          isActive: editor.isActive("bold"),
        },
        {
          icon: Italic,
          title: "Italic",
          action: () => editor.chain().focus().toggleItalic().run(),
          isActive: editor.isActive("italic"),
        },
        {
          icon: Strikethrough,
          title: "Strikethrough",
          action: () => editor.chain().focus().toggleStrike().run(),
          isActive: editor.isActive("strike"),
        },
        {
          icon: Code,
          title: "Inline Code",
          action: () => editor.chain().focus().toggleCode().run(),
          isActive: editor.isActive("code"),
        },
      ],
    },
    {
      group: [
        {
          icon: Heading2,
          title: "Heading 2",
          action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: editor.isActive("heading", { level: 2 }),
        },
        {
          icon: Heading3,
          title: "Heading 3",
          action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: editor.isActive("heading", { level: 3 }),
        },
      ],
    },
    {
      group: [
        {
          icon: List,
          title: "Bullet List",
          action: () => editor.chain().focus().toggleBulletList().run(),
          isActive: editor.isActive("bulletList"),
        },
        {
          icon: ListOrdered,
          title: "Ordered List",
          action: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: editor.isActive("orderedList"),
        },
        {
          icon: Quote,
          title: "Blockquote",
          action: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: editor.isActive("blockquote"),
        },
        {
          icon: Minus,
          title: "Divider",
          action: () => editor.chain().focus().setHorizontalRule().run(),
          isActive: false,
        },
      ],
    },
    {
      group: [
        {
          icon: Undo,
          title: "Undo",
          action: () => editor.chain().focus().undo().run(),
          isActive: false,
          disabled: !editor.can().undo(),
        },
        {
          icon: Redo,
          title: "Redo",
          action: () => editor.chain().focus().redo().run(),
          isActive: false,
          disabled: !editor.can().redo(),
        },
      ],
    },
  ]

  return (
    <div className={cn("rounded-md border bg-background", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b px-2 py-1.5">
        {toolbarItems.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && (
              <div className="mx-1 h-5 w-px bg-border" />
            )}
            {group.group.map((item) => (
              <Button
                key={item.title}
                type="button"
                variant="ghost"
                size="icon"
                title={item.title}
                onClick={item.action}
                disabled={"disabled" in item ? item.disabled : false}
                className={cn(
                  "size-7 rounded",
                  item.isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="size-3.5" />
              </Button>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
