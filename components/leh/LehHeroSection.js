'use client'

import Image from 'next/image'
import Link from 'next/link'
import { openWhatsAppLeh } from '@/lib/whatsapp'
import { LEH_PACKAGE_TYPES } from '@/data/leh-packages'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function LehHeroSection({ pkg }) {
  const type = LEH_PACKAGE_TYPES[pkg.packageType]

  return (
    <section className="relative min-h-[600px] lg:min-h-[680px] text-white overflow-hidden flex items-end">
      <Image src={pkg.heroImage} alt={pkg.heroHeading} fill className="object-cover object-center" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-indigo-950/50 to-black/30" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Leh Ladakh', href: '/leh-ladakh' },
            { label: pkg.shortTitle, href: `/leh-ladakh/${pkg.slug}` },
          ]}
        />
        <div className="mt-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest border border-white/20">
            {type.icon} Tripcart Holidays · {type.label}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
            {pkg.heroHeading}
          </h1>
          <p className="text-lg sm:text-xl text-white/85 mb-6 leading-relaxed">{pkg.heroSubheading}</p>
          <div className="flex flex-wrap gap-2 mb-8 text-sm">
            <span className="bg-white/15 px-3 py-1 rounded-full border border-white/20">📍 {pkg.route}</span>
            <span className="bg-white/15 px-3 py-1 rounded-full border border-white/20">🗓 {pkg.duration}</span>
            <span className="bg-amber-400/20 text-amber-100 px-3 py-1 rounded-full border border-amber-300/30 font-semibold">
              {pkg.price}
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => openWhatsAppLeh(pkg)}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-7 py-4 rounded-full font-bold text-base shadow-xl transition-all cursor-pointer"
            >
              <WhatsAppIcon />
              {pkg.ctaLabel}
            </button>
            <Link
              href="/leh-ladakh"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-7 py-4 rounded-full font-semibold text-base transition-all"
            >
              All Leh Packages →
            </Link>
          </div>
        </div>
        {pkg.stats && (
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            {pkg.stats.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
                <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/65 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
