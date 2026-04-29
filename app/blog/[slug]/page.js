import Image from 'next/image'
import { BLOGS } from '@/data/blogs'
import { DEMO_PACKAGES } from '@/data/packages'
import BlogHero from '@/components/blog/BlogHero'
import FAQSection from '@/components/landing/FAQSection'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  return BLOGS.map(blog => ({ slug: blog.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const blog = BLOGS.find(b => b.slug === slug)
  if (!blog) return {}
  return {
    title: { absolute: blog.metaTitle },
    description: blog.metaDescription,
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      url: `https://himalayanholidays.in/blog/${blog.slug}`,
      type: 'article',
      publishedTime: blog.publishedAt,
      modifiedTime: blog.dateModified,
      authors: ['Himalayan Holidays'],
      images: [{ url: blog.heroImage, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [blog.heroImage],
    },
    alternates: { canonical: `https://himalayanholidays.in/blog/${blog.slug}` },
  }
}

export default async function BlogDetail({ params }) {
  const { slug } = await params
  const blog = BLOGS.find(b => b.slug === slug)
  if (!blog) notFound()

  const relatedPkg = DEMO_PACKAGES.find(p => p.slug === blog.content.relatedPackageSlug)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.metaDescription,
    image: blog.heroImage,
    datePublished: blog.publishedAt,
    dateModified: blog.dateModified || blog.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Himalayan Holidays',
      url: 'https://himalayanholidays.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Himalayan Holidays',
      url: 'https://himalayanholidays.in',
      logo: { '@type': 'ImageObject', url: 'https://himalayanholidays.in/og-image.jpg' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://himalayanholidays.in/blog/${blog.slug}`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <BlogHero blog={blog} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Intro */}
        <p className="text-lg text-slate-700 leading-relaxed mb-12 font-body">
          {blog.content.intro}
        </p>

        {/* Sections */}
        {blog.content.sections.map((section, idx) => (
          <section key={section.id} id={section.id} className="mb-14 scroll-mt-24">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              {section.h2}
            </h2>

            {/* Section place image */}
            {section.image && (
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 shadow-md">
                <Image
                  src={section.image}
                  alt={section.imageAlt || section.h2}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
            )}

            <p className="text-slate-600 leading-relaxed mb-6">{section.description}</p>

            {/* Highlights */}
            {section.highlights?.length > 0 && (
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 mb-5">
                <h3 className="font-semibold text-teal-800 text-sm uppercase tracking-wider mb-3">Top Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {section.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-teal-900">
                      <span className="text-brand">✔</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Best time */}
            {section.bestTime && (
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 text-sm font-medium px-4 py-2 rounded-full border border-amber-200 mb-5">
                📅 Best Time: {section.bestTime}
              </div>
            )}

            {/* Pro tip */}
            {section.h3Tip && (
              <div className="bg-slate-50 border-l-4 border-brand p-4 rounded-r-xl">
                <h3 className="font-semibold text-brand text-sm mb-1">💡 Travel Tip</h3>
                <p className="text-slate-600 text-sm">{section.h3Tip}</p>
              </div>
            )}

            {idx < blog.content.sections.length - 1 && (
              <hr className="mt-12 border-slate-100" />
            )}
          </section>
        ))}

        {/* Related Package CTA */}
        {relatedPkg && (
          <div className="my-12 bg-gradient-to-br from-brand to-brand-dark text-white rounded-2xl p-8 text-center">
            <p className="text-white/80 text-sm uppercase tracking-wider font-semibold mb-2">Recommended Package</p>
            <h3 className="font-display text-2xl font-bold mb-2">{relatedPkg.title}</h3>
            <p className="text-white/75 mb-6">{relatedPkg.duration} · {relatedPkg.price}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={`/${relatedPkg.slug}`}
                className="inline-flex items-center gap-2 bg-white text-brand px-6 py-3 rounded-full font-bold hover:bg-slate-50 transition-colors text-sm"
              >
                View Full Package →
              </Link>
              <a
                href={`https://wa.me/91XXXXXXXXXX?text=Hi! I read your blog and want to book the ${encodeURIComponent(relatedPkg.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-colors text-sm"
              >
                💬 Book on WhatsApp
              </a>
            </div>
          </div>
        )}
      </article>

      {/* FAQ */}
      {blog.content.faqs?.length > 0 && (
        <FAQSection faqs={blog.content.faqs} pageTitle={blog.title} />
      )}

      {/* More articles */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-brand text-brand px-6 py-3 rounded-lg font-semibold text-sm hover:bg-brand hover:text-white transition-all"
          >
            ← All Blog Articles
          </Link>
        </div>
      </section>
    </>
  )
}
