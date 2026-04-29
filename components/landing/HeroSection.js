'use client'

import Image from 'next/image'
import { openWhatsApp, openWhatsAppGeneral } from '@/lib/whatsapp'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function HeroSection({ destination, pkg }) {
  const { heroHeading, heroSubheading, heroImage, heroGradient, ctaLabel, stats } = destination

  return (
    <section className="relative min-h-[600px] lg:min-h-[680px] text-white overflow-hidden flex items-end">
      {/* Background image */}
      {heroImage ? (
        <Image
          src={heroImage}
          alt={heroHeading}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${heroGradient}`} />
      )}

      {/* Layered gradient overlay — dark at bottom for text, subtle at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: destination.heroHeading.split('—')[0].trim(), href: `/${destination.landingSlug}` },
          ]}
        />

        <div className="mt-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest border border-white/20">
            ✈ Himalayan Holidays · Tour Package
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
            {heroHeading}
          </h1>
          <p className="text-lg sm:text-xl text-white/85 mb-8 leading-relaxed">{heroSubheading}</p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => pkg ? openWhatsApp(pkg) : openWhatsAppGeneral()}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-7 py-4 rounded-full font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <WhatsAppIcon />
              {ctaLabel}
            </button>
            <a
              href="/packages"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white px-7 py-4 rounded-full font-semibold text-base transition-all duration-200"
            >
              View All Packages →
            </a>
          </div>
        </div>

        {stats && (
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 hover:bg-white/15 transition-colors">
                <div className="font-display text-2xl sm:text-3xl font-bold text-white drop-shadow">{stat.value}</div>
                <div className="text-white/65 text-xs mt-1 font-medium">{stat.label}</div>
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
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
