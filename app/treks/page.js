import Link from 'next/link'
import { TREKS } from '@/data/treks'
import TrekCard from '@/components/treks/TrekCard'

export const metadata = {
  title: { absolute: 'Himalayan Treks | Hampta Pass & More — Tripcart Holidays' },
  description:
    'Explore guided Himalayan treks from Tripcart Holidays. Hampta Pass with Chandratal Lake — 4N/5D camping trek from Manali. Get trek dates and pricing on WhatsApp.',
  keywords: [
    'Hampta Pass trek',
    'Chandratal Lake trek',
    'Himachal trekking',
    'Manali treks',
    'Tripcart Holidays treks',
  ],
  alternates: { canonical: 'https://tripcartholidays.com/treks' },
  openGraph: {
    title: 'Himalayan Treks — Tripcart Holidays',
    description: 'Guided treks in Himachal Pradesh including Hampta Pass with Chandratal Lake.',
    url: 'https://tripcartholidays.com/treks',
    type: 'website',
    images: [{ url: TREKS[0].heroImage, width: 1200, height: 630, alt: 'Himalayan Treks — Tripcart Holidays' }],
  },
}

export default function TreksPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-teal-200 font-semibold text-sm uppercase tracking-wider mb-3">
            Himalayan Adventures
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Trekking Packages</h1>
          <p className="text-white/80 max-w-2xl text-lg leading-relaxed">
            Certified guides, quality camping gear, and curated high-altitude routes across Himachal
            Pradesh. Cross mountain passes, camp under the stars, and visit Chandratal Lake.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-500 text-sm mb-8">
            {TREKS.length} trek{TREKS.length !== 1 ? 's' : ''} available · custom batches on request
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TREKS.map(trek => (
              <TrekCard key={trek.id} trek={trek} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-600 py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Planning a custom trek batch?
          </h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            Share your dates and group size — we&apos;ll confirm availability and send a detailed
            itinerary on WhatsApp.
          </p>
          <Link
            href="https://wa.me/917004015511?text=Hi!%20I%20am%20interested%20in%20a%20Himalayan%20trek%20from%20Tripcart%20Holidays."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-8 py-4 rounded-full text-lg shadow-md hover:bg-green-50 transition"
          >
            Chat on WhatsApp
          </Link>
        </div>
      </section>
    </>
  )
}
