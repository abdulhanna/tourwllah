import { TREKS } from '@/data/treks'
import { notFound } from 'next/navigation'
import TrekHeroSection from '@/components/treks/TrekHeroSection'
import HighlightsSection from '@/components/landing/HighlightsSection'
import TrekItinerarySection from '@/components/treks/TrekItinerarySection'
import TrekPackingSection from '@/components/treks/TrekPackingSection'
import TrekPoliciesSection from '@/components/treks/TrekPoliciesSection'
import FAQSection from '@/components/landing/FAQSection'
import WhatsAppCTA from '@/components/landing/WhatsAppCTA'
import ItineraryPdfExportSection from '@/components/itinerary/ItineraryPdfExportSection'
import { trekToPdfData } from '@/lib/itinerary-pdf-adapters'

export async function generateStaticParams() {
  return TREKS.map(trek => ({ slug: trek.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const trek = TREKS.find(t => t.slug === slug)
  if (!trek) return {}
  return {
    title: { absolute: trek.metaTitle },
    description: trek.metaDescription,
    keywords: [
      'Hampta Pass trek',
      'Chandratal Lake',
      'Manali trekking',
      'Himachal trek package',
      trek.shortTitle,
    ],
    openGraph: {
      title: trek.metaTitle,
      description: trek.metaDescription,
      url: `https://tripcartholidays.com/treks/${trek.slug}`,
      type: 'website',
      images: [{ url: trek.heroImage, width: 1200, height: 630, alt: trek.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: trek.metaTitle,
      description: trek.metaDescription,
      images: [trek.heroImage],
    },
    alternates: { canonical: `https://tripcartholidays.com/treks/${trek.slug}` },
  }
}

export default async function TrekDetailPage({ params }) {
  const { slug } = await params
  const trek = TREKS.find(t => t.slug === slug)
  if (!trek) notFound()

  const trekForWhatsApp = {
    title: trek.title,
    duration: trek.duration,
    price: trek.price,
    highlights: trek.highlights.map(h => h.label),
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trek.title,
    description: trek.metaDescription,
    url: `https://tripcartholidays.com/treks/${trek.slug}`,
    image: trek.heroImage,
    touristType: ['Adventure', 'Trekking'],
    itinerary: {
      '@type': 'ItemList',
      itemListElement: trek.itinerary.map((day, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Day ${day.day}: ${day.title}`,
        description: day.description,
      })),
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Tripcart Holidays',
      url: 'https://tripcartholidays.com',
      telephone: '+917004015511',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <TrekHeroSection trek={trek} />

      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 leading-relaxed">{trek.overview}</p>
        </div>
      </section>

      <HighlightsSection
        highlights={trek.highlights}
        destination={trek.shortTitle}
        title="Highlights of the Trek"
        subtitle="Landscapes, campsites and experiences on this route"
      />
      <TrekItinerarySection itinerary={trek.itinerary} />
      <ItineraryPdfExportSection pdfData={trekToPdfData(trek)} />

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-10">
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <h3 className="font-semibold text-green-800 text-lg mb-4">✅ Inclusions</h3>
              <ul className="space-y-2">
                {trek.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-green-500 mt-0.5">✔</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 className="font-semibold text-red-700 text-lg mb-4">❌ Exclusions</h3>
              <ul className="space-y-2">
                {trek.exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-red-400 mt-0.5">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {trek.notes && (
            <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">📝 Trek Note:</span> {trek.notes}
              </p>
            </div>
          )}
        </div>
      </section>

      <TrekPackingSection packingList={trek.packingList} />
      <TrekPoliciesSection
        paymentPolicy={trek.paymentPolicy}
        documentsRequired={trek.documentsRequired}
        cancellationPolicy={trek.cancellationPolicy}
      />
      <FAQSection faqs={trek.faqs} pageTitle={trek.shortTitle} />
      <WhatsAppCTA pkg={trekForWhatsApp} label={trek.ctaLabel} />
    </>
  )
}
