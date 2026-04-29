import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function BlogHero({ blog }) {
  return (
    <section className="relative min-h-[480px] lg:min-h-[540px] flex items-end text-white overflow-hidden">
      {blog.heroImage ? (
        <Image
          src={blog.heroImage}
          alt={blog.title}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${blog.heroGradient}`} />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-10">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: blog.title, href: `/blog/${blog.slug}` },
          ]}
        />
        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
              {blog.category}
            </span>
            <span className="text-white/65 text-sm">
              <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
            </span>
            <span className="text-white/65 text-sm">· {blog.readTime}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
            {blog.title}
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl leading-relaxed">
            {blog.excerpt}
          </p>
        </div>
      </div>
    </section>
  )
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}
