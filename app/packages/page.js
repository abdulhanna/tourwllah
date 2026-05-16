import { DEMO_PACKAGES } from '@/data/packages'
import { DESTINATIONS } from '@/data/destinations'
import PublicPackageCard from '@/components/packages/PublicPackageCard'
import QuoteButton from '@/components/packages/QuoteButton'

export const metadata = {
  title: { absolute: 'Tour Packages | Kashmir, Manali, Rajasthan & North East — Tripcart Holidays' },
  description:
    'Browse handcrafted Kashmir, Manali, Rajasthan and North East tour packages from Tripcart Holidays. Compare itineraries and get an instant quote on WhatsApp.',
  keywords: ['tour packages India', 'Kashmir Manali Rajasthan North East tour', 'India holiday packages', 'WhatsApp travel booking', 'Tripcart Holidays'],
  alternates: { canonical: 'https://tripcartholidays.com/packages' },
  openGraph: {
    title: 'Tour Packages — Tripcart Holidays',
    description:
      'Handcrafted Kashmir, Manali, Rajasthan and North East tour packages. Get an instant WhatsApp quote.',
    url: 'https://tripcartholidays.com/packages',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tripcart Holidays Tour Packages' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tour Packages — Tripcart Holidays',
    description: 'Handcrafted India tour packages. Get an instant WhatsApp quote.',
    images: ['/twitter-image.png'],
  },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: DEMO_PACKAGES.map((pkg, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: pkg.title,
    url: `https://tripcartholidays.com/${pkg.slug}`,
  })),
}

const trustChips = [
  { icon: '🏆', label: '10+ Years' },
  { icon: '😊', label: '5000+ Travellers' },
  { icon: '📞', label: '24/7 Support' },
]

export default function PackagesCatalog() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="bg-gradient-to-br from-brand to-brand-dark text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/75 text-xs uppercase tracking-widest mb-2">Tripcart Holidays</p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-3">Tour Packages</h1>
          <p className="text-white/85 max-w-xl mb-6">
            Handcrafted holidays across Kashmir, Manali, Rajasthan &amp; North East — every itinerary is fully customisable.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {trustChips.map(c => (
              <span
                key={c.label}
                className="bg-white/15 border border-white/25 text-sm px-4 py-1.5 rounded-full"
              >
                <span aria-hidden="true">{c.icon}</span> {c.label}
              </span>
            ))}
            <QuoteButton className="sm:ml-auto bg-accent text-slate-900 font-bold text-sm px-6 py-2.5 rounded-full hover:brightness-95 transition cursor-pointer" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">All Tour Packages</h2>
          <p className="text-slate-500 text-sm mb-6">
            {DEMO_PACKAGES.length} packages · all customisable
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_PACKAGES.map(pkg => {
              const dest = DESTINATIONS.find(d => d.landingSlug === pkg.slug)
              return <PublicPackageCard key={pkg.id} pkg={pkg} dest={dest} />
            })}
          </div>
        </div>
      </section>

      <section className="bg-green-600 py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Not sure which to pick?
          </h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            Tell us your dates &amp; budget — we&apos;ll craft a custom itinerary in minutes.
          </p>
          <QuoteButton className="bg-white text-green-700 font-bold px-8 py-4 rounded-full text-lg shadow-md hover:bg-green-50 transition cursor-pointer">
            <span aria-hidden="true">✦</span> Get Free Quote
          </QuoteButton>
        </div>
      </section>
    </>
  )
}
