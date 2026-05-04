// ─── Post Types ──────────────────────────────────────────────────────
export interface Post {
  id: number
  title: string
  slug: string
  thumbnail?: string
  category: string
  tags: string[]
  createdBy: string
  createdAt: string   // ISO date string
  status: "published" | "draft" | "archived"
  description: string
}

export interface PostFilters {
  search: string
  category: string
  tag: string
  createdBy: string
  fromDate: Date | undefined
  toDate: Date | undefined
  status: string
}

// ─── Fake Options ────────────────────────────────────────────────────
export const CATEGORY_OPTIONS = [
  { value: "cong-nghe", label: "Công nghệ" },
  { value: "lap-trinh", label: "Lập trình" },
  { value: "thiet-ke", label: "Thiết kế" },
  { value: "devops", label: "DevOps" },
  { value: "ai", label: "Trí tuệ nhân tạo" },
  { value: "mobile", label: "Mobile" },
]

export const TAG_OPTIONS = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "nextjs", label: "Next.js" },
  { value: "tailwind-css", label: "Tailwind CSS" },
  { value: "nodejs", label: "Node.js" },
  { value: "docker", label: "Docker" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "vite", label: "Vite" },
]

export const AUTHOR_OPTIONS = [
  { value: "nguyen-van-a", label: "Nguyễn Văn A" },
  { value: "tran-thi-b", label: "Trần Thị B" },
  { value: "le-van-c", label: "Lê Văn C" },
]

// ─── Fake Data ───────────────────────────────────────────────────────
export const initialPosts: Post[] = [
  {
    id: 1,
    title: "Bắt đầu với React 19 và các tính năng mới",
    slug: "bat-dau-voi-react-19",
    thumbnail: "https://picsum.photos/seed/react19/400/225",
    category: "lap-trinh",
    tags: ["react", "typescript"],
    createdBy: "Nguyễn Văn A",
    createdAt: "2024-12-15T09:30:00Z",
    status: "published",
    description: "<p>React 19 mang đến nhiều tính năng mới thú vị...</p>",
  },
  {
    id: 2,
    title: "Hướng dẫn Tailwind CSS v4 từ A đến Z",
    slug: "huong-dan-tailwind-v4",
    thumbnail: "https://picsum.photos/seed/tailwind/400/225",
    category: "thiet-ke",
    tags: ["tailwind-css", "typescript"],
    createdBy: "Trần Thị B",
    createdAt: "2024-12-10T14:00:00Z",
    status: "published",
    description: "<p>Tailwind CSS v4 có nhiều thay đổi lớn...</p>",
  },
  {
    id: 3,
    title: "Docker và Kubernetes cho người mới bắt đầu",
    slug: "docker-kubernetes-beginner",
    thumbnail: "https://picsum.photos/seed/docker/400/225",
    category: "devops",
    tags: ["docker"],
    createdBy: "Lê Văn C",
    createdAt: "2024-11-28T08:00:00Z",
    status: "draft",
    description: "<p>Tìm hiểu về containerization...</p>",
  },
  {
    id: 4,
    title: "Xây dựng REST API với Node.js và PostgreSQL",
    slug: "rest-api-nodejs-postgresql",
    thumbnail: "https://picsum.photos/seed/nodejs/400/225",
    category: "lap-trinh",
    tags: ["nodejs", "postgresql"],
    createdBy: "Nguyễn Văn A",
    createdAt: "2024-11-20T10:15:00Z",
    status: "published",
    description: "<p>Hướng dẫn tạo REST API...</p>",
  },
  {
    id: 5,
    title: "TypeScript nâng cao: Generic và Utility Types",
    slug: "typescript-generic-utility",
    thumbnail: "https://picsum.photos/seed/typescript/400/225",
    category: "lap-trinh",
    tags: ["typescript"],
    createdBy: "Trần Thị B",
    createdAt: "2024-11-05T16:30:00Z",
    status: "archived",
    description: "<p>Tìm hiểu sâu về TypeScript...</p>",
  },
  {
    id: 6,
    title: "Tối ưu hiệu suất ứng dụng React với Vite",
    slug: "toi-uu-react-vite",
    thumbnail: "https://picsum.photos/seed/vite/400/225",
    category: "cong-nghe",
    tags: ["react", "vite"],
    createdBy: "Lê Văn C",
    createdAt: "2024-10-30T11:00:00Z",
    status: "draft",
    description: "<p>Vite giúp tăng tốc quá trình phát triển...</p>",
  },
  {
    id: 7,
    title: "AI trong lập trình: GitHub Copilot thực chiến",
    slug: "ai-github-copilot",
    thumbnail: "https://picsum.photos/seed/ai/400/225",
    category: "ai",
    tags: ["react", "typescript"],
    createdBy: "Nguyễn Văn A",
    createdAt: "2024-10-18T09:00:00Z",
    status: "published",
    description: "<p>Sử dụng AI trong lập trình hàng ngày...</p>",
  },
  {
    id: 8,
    title: "Next.js App Router: Hướng dẫn toàn diện",
    slug: "nextjs-app-router",
    thumbnail: "https://picsum.photos/seed/nextjs/400/225",
    category: "lap-trinh",
    tags: ["nextjs", "react", "typescript"],
    createdBy: "Trần Thị B",
    createdAt: "2024-10-05T13:45:00Z",
    status: "published",
    description: "<p>App Router trong Next.js 14...</p>",
  },
]
