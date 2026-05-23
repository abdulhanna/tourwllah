import Image from 'next/image'
import Link from 'next/link'
import {
  LEH_PACKAGES,
  LEH_HEADER_IMAGE,
  getLehPackagesByType,
  LEH_PACKAGE_TYPES,
} from '@/data/leh-packages'
import LehPackageCard from '@/components/leh/LehPackageCard'

export const metadata = {
  title: { absolute: 'Leh Ladakh Tour Packages | Private & Bike Trips — Tripcart Holidays' },
  description:
    'Book Leh Ladakh packages — private 5N/6D & 6N/7D tours and group bike/tempo trips 5N to 8N with Umling La. Nubra, Pangong, Turtuk. WhatsApp quote.',
  alternates: { canonical: 'https://tripcartholidays.com/leh-ladakh' },
  openGraph: {
    title: 'Leh Ladakh Packages — Tripcart Holidays',
    description: 'Private promotional tours and Leh to Leh bike group trips with all duration options.',
    url: 'https://tripcartholidays.com/leh-ladakh',
    images: [{ url: LEH_HEADER_IMAGE, width: 1200, height: 630, alt: 'Leh Ladakh — Tripcart Holidays' }],
  },
}

function PackageGroup({ type, packages }) {
  const meta = LEH_PACKAGE_TYPES[type]
  if (!packages.length) return null

  return (
    <div className="mb-14">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl" aria-hidden="true">{meta.icon}</span>
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">{meta.label}</h2>
          <p className="text-slate-500 text-sm">
            {type === 'private'
              ? 'Custom private cab with hotel options — ideal for families & small groups'
              : 'Fixed group departures · Royal Enfield Himalayan or tempo traveller'}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <LehPackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  )
}

export default function LehLadakhPage() {
  const privatePkgs = getLehPackagesByType('private')
  const bikePkgs = getLehPackagesByType('bike')

  return (
    <>
      <section className="relative min-h-[420px] sm:min-h-[480px] text-white overflow-hidden flex items-end">
        <Image
          src={LEH_HEADER_IMAGE}
          alt="Leh Ladakh — mountain landscapes"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/40 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <p className="text-white/90 font-semibold text-sm uppercase tracking-wider mb-3">
            Ladakh Adventures
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
            Leh Ladakh Packages
          </h1>
          <p className="text-white/85 max-w-2xl text-lg leading-relaxed">
            Choose from private promotional tours or group bike &amp; tempo trips — 5N/6D to 7N/8D
            with Nubra, Pangong, Turtuk and Umling La options.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-500 text-sm mb-10">
            {LEH_PACKAGES.length} packages · {privatePkgs.length} private · {bikePkgs.length} bike &amp; tempo
          </p>
          <PackageGroup type="private" packages={privatePkgs} />
          <PackageGroup type="bike" packages={bikePkgs} />
        </div>
      </section>

      <section className="bg-green-600 py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Need help choosing a package?
          </h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            Tell us your dates, group size and whether you prefer private cab or bike — we&apos;ll
            recommend the best Leh Ladakh option.
          </p>
          <Link
            href="https://wa.me/917004015511?text=Hi!%20I%20want%20a%20Leh%20Ladakh%20package%20quote%20from%20Tripcart%20Holidays."
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
