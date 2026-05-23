import Image from 'next/image'
import Link from 'next/link'
import { DEMO_PACKAGES } from '@/data/packages'
import { BLOGS } from '@/data/blogs'
import { DESTINATIONS } from '@/data/destinations'
import { TREKS } from '@/data/treks'
import { LEH_PACKAGES } from '@/data/leh-packages'
import BlogCard from '@/components/blog/BlogCard'
import TrekCard from '@/components/treks/TrekCard'
import LehPackageCard from '@/components/leh/LehPackageCard'
import WhatsAppCTA from '@/components/landing/WhatsAppCTA'

export const metadata = {
  title: 'Tripcart Holidays | Kashmir, Manali, Rajasthan & North East Tour Packages',
  description:
    'Plan your perfect India holiday with Tripcart Holidays. Customized Kashmir, Manali, Rajasthan and North East tour packages with houseboat stays, adventure activities, and royal palaces. Expert-guided itineraries, best prices, and 24x7 WhatsApp support at +91 70040 15511.',
  alternates: { canonical: 'https://tripcartholidays.com' },
  openGraph: {
    title: 'Tripcart Holidays | Best Tour Packages in India',
    description:
      'Customized Kashmir, Manali, Rajasthan and North East tour packages. Houseboat stays, adventure activities, royal palaces — handcrafted itineraries with WhatsApp support.',
    url: 'https://tripcartholidays.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tripcart Holidays — Best Tour Packages in India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tripcart Holidays | Best Tour Packages in India',
    description:
      'Customized Kashmir, Manali, Rajasthan and North East tour packages. Houseboat stays, adventure activities, royal palaces — handcrafted itineraries with WhatsApp support.',
    images: ['/twitter-image.png'],
  },
}

const trustBadges = [
  { icon: '🏆', value: '10+ Years', label: 'Experience' },
  { icon: '😊', value: '5000+', label: 'Happy Travellers' },
  { icon: '📞', value: '24/7', label: 'WhatsApp Support' },
  { icon: '💰', value: 'Best', label: 'Price Guarantee' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-white/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              🌟 India&apos;s Most Trusted Travel Brand
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              Tripcart <span className="text-accent-light">Holidays</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 mb-8 max-w-2xl leading-relaxed">
              Handcrafted tour packages to Kashmir, Manali, Rajasthan and beyond. Expert-guided journeys with guaranteed best prices.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 bg-white text-brand px-7 py-4 rounded-full font-bold text-base shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all duration-200"
              >
                Explore Packages →
              </Link>
              <WAButton />
            </div>
            <a
              href="https://wa.me/917004015511"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium text-base"
            >
              <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-green-500/90">
                <WhatsAppIcon />
              </span>
              <span>WhatsApp us at <strong className="font-bold text-accent-light">+91 70040 15511</strong></span>
            </a>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-brand text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {trustBadges.map((b, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-1">{b.icon}</div>
                <div className="font-display font-bold text-2xl text-accent-light">{b.value}</div>
                <div className="text-white/70 text-sm">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-2">Top Destinations</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Our Most Popular Packages
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Carefully curated experiences for every kind of traveller
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_PACKAGES.map((pkg) => {
              const dest = DESTINATIONS.find(d => d.landingSlug === pkg.slug)
              return (
                <article key={pkg.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
                  <div className="relative h-48 overflow-hidden">
                    {dest?.cardImage ? (
                      <Image
                        src={dest.cardImage}
                        alt={pkg.destination}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-800 to-slate-800" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                      {pkg.duration}
                    </div>
                    <div className="absolute bottom-4 left-4 text-white font-display font-bold text-lg drop-shadow">
                      {pkg.destination}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display font-bold text-slate-900 text-lg leading-snug">{pkg.title}</h3>
                      {pkg.price && <span className="text-accent font-bold text-sm flex-shrink-0 ml-2">{pkg.price}</span>}
                    </div>
                    <p className="text-slate-500 text-sm mb-4">📍 {pkg.destination}</p>
                    <ul className="space-y-1 mb-5">
                      {pkg.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                          <span className="text-brand">✔</span> {h}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/${pkg.slug}`}
                      className="block text-center bg-brand text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors"
                    >
                      View Package
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 border-2 border-brand text-brand px-6 py-3 rounded-lg font-semibold text-sm hover:bg-brand hover:text-white transition-all"
            >
              View All Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* Treks */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-2">Himalayan Adventures</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Popular Treks
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Guided high-altitude treks with camping, meals and certified trek leaders
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TREKS.map(trek => (
              <TrekCard key={trek.id} trek={trek} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/treks"
              className="inline-flex items-center gap-2 border-2 border-brand text-brand px-6 py-3 rounded-lg font-semibold text-sm hover:bg-brand hover:text-white transition-all"
            >
              View All Treks →
            </Link>
          </div>
        </div>
      </section>

      {/* Leh Ladakh */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-2">Ladakh Adventures</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Leh Ladakh Packages
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Private tours &amp; group bike trips — 5N/6D to 7N/8D with Nubra, Pangong, Turtuk &amp; Umling La
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEH_PACKAGES.map(pkg => (
              <LehPackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/leh-ladakh"
              className="inline-flex items-center gap-2 border-2 border-brand text-brand px-6 py-3 rounded-lg font-semibold text-sm hover:bg-brand hover:text-white transition-all"
            >
              Compare All Leh Options →
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <WhatsAppCTA label="Plan Your Dream Trip Today 🌸" />

      {/* Blog */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-2">Travel Inspiration</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              From Our Travel Blog
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Destination guides, travel tips and itinerary ideas to plan your perfect trip
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOGS.map(blog => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border-2 border-brand text-brand px-6 py-3 rounded-lg font-semibold text-sm hover:bg-brand hover:text-white transition-all"
            >
              Read All Articles →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function WAButton() {
  return (
    <a
      href="https://wa.me/917004015511?text=Hi!%20I%20am%20interested%20in%20a%20tour%20package%20from%20Tripcart%20Holidays."
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-7 py-4 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200"
    >
      <WhatsAppIcon />
      Chat on WhatsApp
    </a>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
