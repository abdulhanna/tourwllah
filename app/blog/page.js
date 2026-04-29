import { BLOGS } from '@/data/blogs'
import BlogCard from '@/components/blog/BlogCard'
import Link from 'next/link'

const OG_IMAGE = 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80&auto=format&fit=crop'

export const metadata = {
  title: { absolute: 'Travel Blog — India Tour Tips & Destination Guides | Himalayan Holidays' },
  description:
    'Explore our travel blog for expert tips on Kashmir, Manali and Rajasthan. Destination guides, itinerary ideas and travel inspiration from Himalayan Holidays.',
  openGraph: {
    title: 'Travel Blog | Himalayan Holidays',
    description: 'Destination guides, travel tips and itinerary ideas from Himalayan Holidays.',
    url: 'https://himalayanholidays.in/blog',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Himalayan Holidays Travel Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Blog | Himalayan Holidays',
    description: 'Destination guides, travel tips and itinerary ideas from Himalayan Holidays.',
    images: [OG_IMAGE],
  },
  alternates: { canonical: 'https://himalayanholidays.in/blog' },
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-brand-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-light font-semibold text-sm uppercase tracking-wider mb-3">Travel Inspiration</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Our Travel Blog</h1>
          <p className="text-white/70 max-w-xl mx-auto text-lg">
            Destination guides, itinerary tips and travel stories to fuel your wanderlust
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOGS.map(blog => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-brand rounded-2xl p-10 text-white">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Ready to Plan Your Trip?</h2>
          <p className="text-white/80 mb-6">Chat with our travel experts on WhatsApp for a personalised itinerary</p>
          <a
            href="https://wa.me/91XXXXXXXXXX?text=Hi!%20I%20want%20to%20plan%20a%20trip%20after%20reading%20your%20travel%20blog."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-brand px-7 py-3.5 rounded-full font-bold hover:bg-slate-50 transition-colors"
          >
            💬 Book on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
