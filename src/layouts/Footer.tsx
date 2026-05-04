import { Link } from 'react-router-dom'
import { Rss } from 'lucide-react'

const footerLinks = {
  'Chủ đề': [
    { label: 'Công nghệ', to: '#' },
    { label: 'Lập trình', to: '#' },
    { label: 'DevOps', to: '#' },
    { label: 'Trí tuệ nhân tạo', to: '#' },
  ],
  'Thông tin': [
    { label: 'Về chúng tôi', to: '/blog/about' },
    { label: 'Liên hệ', to: '/blog/contact' },
    { label: 'Chính sách bảo mật', to: '/blog/privacy' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-gray-50 mt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="#" className="flex items-center gap-2 mb-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                <Rss className="size-4" />
              </div>
              <span className="font-bold text-lg text-gray-900">Blogify</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Chia sẻ kiến thức về công nghệ, lập trình và phát triển phần mềm dành cho cộng đồng developer Việt Nam.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 hover:text-violet-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>© {currentYear} Blogify. All rights reserved.</p>
          <p>Made with ❤️ for the developer community</p>
        </div>
      </div>
    </footer>
  )
}
