import { DESTINATIONS } from '@/data/destinations'
import { DEMO_PACKAGES } from '@/data/packages'
import HeroSection from '@/components/landing/HeroSection'
import HighlightsSection from '@/components/landing/HighlightsSection'
import ItineraryPreview from '@/components/landing/ItineraryPreview'
import FAQSection from '@/components/landing/FAQSection'
import WhatsAppCTA from '@/components/landing/WhatsAppCTA'

const dest = DESTINATIONS.find(d => d.slug === 'north-east')
const pkg = DEMO_PACKAGES.find(p => p.id === 'northeast-001')

export const metadata = {
  title: { absolute: dest.metaTitle },
  description: dest.metaDescription,
  keywords: ['North East tour package', 'Meghalaya tour package', 'Shillong Dawki Cherrapunjee itinerary', 'Dawki river tour', 'Mawlynnong tour', 'Cherrapunjee waterfalls'],
  openGraph: {
    title: dest.metaTitle,
    description: dest.metaDescription,
    url: 'https://himalayanholidays.in/north-east-tour-package',
    type: 'website',
    images: [{ url: dest.heroImage, width: 1200, height: 630, alt: 'North East Tour Package — Meghalaya' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: dest.metaTitle,
    description: dest.metaDescription,
    images: [dest.heroImage],
  },
  alternates: { canonical: 'https://himalayanholidays.in/north-east-tour-package' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  name: 'North East Tour Package — 4 Nights 5 Days',
  description: dest.metaDescription,
  url: 'https://himalayanholidays.in/north-east-tour-package',
  image: dest.heroImage,
  touristType: ['Adventure', 'Family', 'Group', 'Nature'],
  geo: { '@type': 'GeoCoordinates', latitude: 25.5788, longitude: 91.8933 },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    bestRating: '5',
    worstRating: '1',
    reviewCount: '300',
  },
  offers: {
    '@type': 'Offer',
    name: 'North East 4N/5D Holiday Package',
    price: '19500',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-01-01',
    seller: { '@type': 'TravelAgency', name: 'Himalayan Holidays', url: 'https://himalayanholidays.in' },
  },
}

export default function NorthEastTourPackage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <HeroSection destination={dest} pkg={pkg} />
      <HighlightsSection highlights={dest.highlights} destination="North East" />
      <ItineraryPreview itinerary={pkg.itinerary} />

      {/* Inclusions / Exclusions */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-10">
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <h3 className="font-semibold text-green-800 text-lg mb-4">✅ Inclusions</h3>
              <ul className="space-y-2">
                {pkg.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-green-500 mt-0.5">✔</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 className="font-semibold text-red-700 text-lg mb-4">❌ Exclusions</h3>
              <ul className="space-y-2">
                {pkg.exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-red-400 mt-0.5">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {pkg.notes && (
            <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800"><span className="font-semibold">📝 Travel Note:</span> {pkg.notes}</p>
            </div>
          )}
        </div>
      </section>

      <FAQSection faqs={dest.faqs} pageTitle="North East Tour Package" />
      <WhatsAppCTA pkg={pkg} label={dest.ctaLabel} />
    </>
  )
}
