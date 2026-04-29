import Image from 'next/image'
import Link from 'next/link'

export default function BlogCard({ blog }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
      <div className="relative h-52 overflow-hidden">
        {blog.cardImage ? (
          <Image
            src={blog.cardImage}
            alt={blog.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${blog.heroGradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            {blog.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
          <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
          <span>·</span>
          <span>{blog.readTime}</span>
        </div>
        <h3 className="font-display font-bold text-slate-900 text-lg leading-snug mb-3 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">{blog.excerpt}</p>
        <Link
          href={`/blog/${blog.slug}`}
          className="inline-flex items-center gap-1.5 text-brand font-semibold text-sm hover:gap-2.5 transition-all"
        >
          Read More <span>→</span>
        </Link>
      </div>
    </article>
  )
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}
