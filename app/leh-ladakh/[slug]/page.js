import { LEH_PACKAGES } from '@/data/leh-packages'
import { notFound } from 'next/navigation'
import LehHeroSection from '@/components/leh/LehHeroSection'
import HighlightsSection from '@/components/landing/HighlightsSection'
import ItineraryPreview from '@/components/landing/ItineraryPreview'
import LehPricingSection from '@/components/leh/LehPricingSection'
import TrekPoliciesSection from '@/components/treks/TrekPoliciesSection'
import FAQSection from '@/components/landing/FAQSection'
import WhatsAppCTA from '@/components/landing/WhatsAppCTA'
import ItineraryPdfExportSection from '@/components/itinerary/ItineraryPdfExportSection'
import { lehPackageToPdfData } from '@/lib/itinerary-pdf-adapters'

export async function generateStaticParams() {
  return LEH_PACKAGES.map(pkg => ({ slug: pkg.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const pkg = LEH_PACKAGES.find(p => p.slug === slug)
  if (!pkg) return {}
  return {
    title: { absolute: pkg.metaTitle },
    description: pkg.metaDescription,
    openGraph: {
      title: pkg.metaTitle,
      description: pkg.metaDescription,
      url: `https://tripcartholidays.com/leh-ladakh/${pkg.slug}`,
      images: [{ url: pkg.heroImage, width: 1200, height: 630, alt: pkg.title }],
    },
    alternates: { canonical: `https://tripcartholidays.com/leh-ladakh/${pkg.slug}` },
  }
}

export default async function LehPackageDetailPage({ params }) {
  const { slug } = await params
  const pkg = LEH_PACKAGES.find(p => p.slug === slug)
  if (!pkg) notFound()

  const waPkg = {
    title: pkg.title,
    duration: pkg.duration,
    price: pkg.price,
    highlights: pkg.highlights.map(h => h.label),
  }

  const policies = {
    paymentPolicy: pkg.paymentPolicy || [],
    documentsRequired: ['Government-issued photo ID', 'Valid driving licence (for bike packages)'],
    cancellationPolicy: pkg.cancellationPolicy || [
      'Contact Tripcart Holidays on WhatsApp for cancellation terms on your booking.',
    ],
  }

  return (
    <>
      <LehHeroSection pkg={pkg} />

      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 leading-relaxed">{pkg.overview}</p>
        </div>
      </section>

      <HighlightsSection
        highlights={pkg.highlights}
        destination="Leh Ladakh"
        title="Package Highlights"
        subtitle="Key experiences on this Leh Ladakh route"
      />
      <ItineraryPreview itinerary={pkg.itinerary} />
      <ItineraryPdfExportSection pdfData={lehPackageToPdfData(pkg)} />
      <LehPricingSection pkg={pkg} />

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
                    <span className="text-green-500">✔</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 className="font-semibold text-red-700 text-lg mb-4">❌ Exclusions</h3>
              <ul className="space-y-2">
                {pkg.exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-red-400">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {pkg.notes && (
            <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">📝 Note:</span> {pkg.notes}
              </p>
            </div>
          )}
        </div>
      </section>

      {(policies.paymentPolicy.length > 0 || policies.cancellationPolicy.length > 0) && (
        <TrekPoliciesSection
          paymentPolicy={policies.paymentPolicy}
          documentsRequired={policies.documentsRequired}
          cancellationPolicy={policies.cancellationPolicy}
        />
      )}

      <FAQSection faqs={pkg.faqs} pageTitle={pkg.shortTitle} />
      <WhatsAppCTA pkg={waPkg} label={pkg.ctaLabel} />
    </>
  )
}
