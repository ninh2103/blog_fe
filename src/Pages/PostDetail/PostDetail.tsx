import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, Eye, Tag, ChevronRight, Share2, BookOpen, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Post {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  thumbnail: string
  author: string
  authorAvatar: string
  publishedAt: string
  readingTime: number
  views: number
  category: string
  tags: string[]
}

// ─── Mock data (thay bằng API thực) ──────────────────────────────────────────
const mockPost: Post = {
  id: 1,
  slug: 'gioi-thieu-react-19',
  title: 'Giới thiệu React 19 — Những tính năng mới đáng chú ý nhất',
  excerpt:
    'React 19 mang đến hàng loạt cải tiến đột phá giúp developer xây dựng ứng dụng nhanh hơn, mượt mà hơn với ít boilerplate code hơn bao giờ hết.',
  content: `
    <p>React 19 là phiên bản lớn nhất kể từ React 16 với sự ra đời của Hooks. Bản cập nhật này tập trung vào việc cải thiện trải nghiệm lập trình viên và hiệu năng ứng dụng.</p>

    <h2>1. React Compiler</h2>
    <p>Tính năng đáng chú ý nhất là React Compiler — trình biên dịch tự động tối ưu hóa re-render mà không cần developer phải tự tay dùng <code>useMemo</code>, <code>useCallback</code> hay <code>React.memo</code>.</p>

    <pre><code>// Trước React 19
const expensiveValue = useMemo(() => computeExpensive(a, b), [a, b])

// Với React Compiler — tự động tối ưu
const expensiveValue = computeExpensive(a, b)</code></pre>

    <h2>2. Server Actions</h2>
    <p>Server Actions cho phép bạn gọi server-side functions trực tiếp từ client component. Điều này đơn giản hóa đáng kể việc xử lý form và mutations.</p>

    <h2>3. use() Hook</h2>
    <p>Hook mới <code>use()</code> cho phép bạn đọc giá trị từ Promise hoặc Context bên trong render, giúp code async trở nên tự nhiên hơn.</p>

    <h2>4. Document Metadata API</h2>
    <p>Bạn có thể set <code>&lt;title&gt;</code>, <code>&lt;meta&gt;</code> và các thẻ document khác trực tiếp trong component mà không cần thư viện bên thứ ba như <code>react-helmet</code>.</p>

    <h2>Kết luận</h2>
    <p>React 19 đánh dấu một bước tiến lớn trong hệ sinh thái React. Các tính năng mới không chỉ cải thiện hiệu năng mà còn giúp code trở nên clean và dễ maintain hơn.</p>
  `,
  thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop',
  author: 'Nguyễn Văn A',
  authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenVanA',
  publishedAt: '2024-05-01',
  readingTime: 8,
  views: 12450,
  category: 'Lập trình',
  tags: ['React', 'JavaScript', 'Frontend', 'Web Dev'],
}

const relatedPosts = [
  {
    slug: 'nextjs-15-features',
    title: 'Next.js 15 — Tổng hợp những thay đổi quan trọng bạn cần biết',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=220&fit=crop',
    publishedAt: '2024-04-28',
    readingTime: 6,
  },
  {
    slug: 'typescript-5-tips',
    title: '10 mẹo TypeScript giúp code của bạn sạch và type-safe hơn',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=220&fit=crop',
    publishedAt: '2024-04-20',
    readingTime: 5,
  },
  {
    slug: 'tailwind-css-tricks',
    title: 'Tailwind CSS 4 — Những cải tiến đột phá về hiệu năng và DX',
    thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=220&fit=crop',
    publishedAt: '2024-04-15',
    readingTime: 7,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function formatViews(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

// ─── AdSense Placeholder ─────────────────────────────────────────────────────
function AdSensePlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-xs text-gray-400 ${className}`}
    >
      {/* Thay bằng <ins className="adsbygoogle" ... /> khi tích hợp AdSense */}
      Quảng cáo
    </div>
  )
}

// ─── Post Detail Page ─────────────────────────────────────────────────────────
export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>()

  // TODO: fetch post by slug từ API
  const post = mockPost

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <BookOpen className="size-16 text-gray-300" />
        <h1 className="text-2xl font-bold text-gray-800">Bài viết không tồn tại</h1>
        <p className="text-gray-500">Bài viết với slug <code className="font-mono bg-gray-100 px-1 rounded">{slug}</code> không được tìm thấy.</p>
        <Link to="/blog" className="text-sm text-violet-600 hover:underline">← Quay về trang chủ</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link to="/blog" className="hover:text-violet-600 transition-colors">Trang chủ</Link>
        <ChevronRight className="size-3.5 shrink-0" />
        <Link to={`/blog/category/${post.category}`} className="hover:text-violet-600 transition-colors">{post.category}</Link>
        <ChevronRight className="size-3.5 shrink-0" />
        <span className="text-gray-800 truncate max-w-[200px]">{post.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ── Main content ───────────────────────────────────────── */}
        <article className="flex-1 min-w-0">
          {/* Category badge */}
          <div className="mb-3">
            <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100 border-0">
              {post.category}
            </Badge>
          </div>

          {/* Title — in đậm nổi bật */}
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-snug text-gray-900 mb-4">
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-6 pb-6 border-b">
            <span className="flex items-center gap-1.5">
              <User className="size-3.5" />
              <span className="font-medium text-gray-700">{post.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {post.readingTime} phút đọc
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="size-3.5" />
              {formatViews(post.views)} lượt xem
            </span>
          </div>

          {/* Thumbnail */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-sm">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>

          {/* AdSense — trên nội dung */}
          <AdSensePlaceholder className="w-full h-24 mb-8" />

          {/* Article body */}
          <div
            className="prose prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
              prose-p:leading-relaxed prose-p:text-gray-600
              prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
              prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-violet-700
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:overflow-x-auto
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* AdSense — dưới nội dung */}
          <AdSensePlaceholder className="w-full h-24 mt-10 mb-8" />

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t mt-8">
            <Tag className="size-4 text-gray-400" />
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog/tag/${tag.toLowerCase()}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-violet-100 hover:text-violet-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t">
            <span className="text-sm font-medium text-gray-500">Chia sẻ:</span>
            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet-600 transition-colors">
              <Share2 className="size-4" />
              Sao chép liên kết
            </button>
          </div>

          {/* Author card */}
          <div className="flex items-start gap-4 p-5 mt-8 rounded-xl bg-gray-50 border">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="size-12 rounded-full object-cover shrink-0 bg-gray-200"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">{post.author}</p>
              <p className="text-xs text-gray-500 mt-0.5">Developer &amp; Content Creator</p>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Đam mê công nghệ và chia sẻ kiến thức lập trình. Mình viết về React, TypeScript, và hệ sinh thái JavaScript hiện đại.
              </p>
            </div>
          </div>
        </article>

        {/* ── Sidebar ────────────────────────────────────────────── */}
        <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-[86px] lg:self-start space-y-8">
          {/* AdSense sidebar */}
          <AdSensePlaceholder className="w-full h-64" />

          {/* Bài viết tương tự */}
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="size-4 text-violet-600" />
              Bài viết liên quan
            </h2>
            <div className="space-y-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="flex gap-3 group"
                >
                  <div className="shrink-0 w-20 h-14 rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={related.thumbnail}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 group-hover:text-violet-600 transition-colors">
                      {related.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock className="size-3" />
                      {related.readingTime} phút đọc
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* AdSense sidebar bottom */}
          <AdSensePlaceholder className="w-full h-48" />
        </aside>
      </div>

      {/* ── More related posts — full width below ─────────────────── */}
      <section className="mt-16 pt-10 border-t">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Bài viết tương tự</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((related) => (
            <Link
              key={related.slug}
              to={`/blog/${related.slug}`}
              className="group flex flex-col rounded-xl overflow-hidden border bg-white hover:shadow-md transition-shadow"
            >
              <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                <img
                  src={related.thumbnail}
                  alt={related.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-violet-600 transition-colors mb-2">
                  {related.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="size-3" />
                  <span>{formatDate(related.publishedAt)}</span>
                  <span>·</span>
                  <Clock className="size-3" />
                  <span>{related.readingTime} phút đọc</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
