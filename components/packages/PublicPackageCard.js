import Image from 'next/image'
import Link from 'next/link'
import { buildWhatsAppURL } from '@/lib/whatsapp'

const PHONE_TEL = '+917004015511'

export default function PublicPackageCard({ pkg, dest }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 group flex flex-col">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
          <span aria-hidden="true">🗓</span> {pkg.duration}
        </span>
        <span className="absolute bottom-4 left-4 text-white font-display font-bold text-lg drop-shadow">
          {pkg.destination}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-display font-bold text-slate-900 text-lg leading-snug">{pkg.title}</h3>
          {pkg.price && <span className="text-accent font-bold text-sm flex-shrink-0">{pkg.price}</span>}
        </div>
        <p className="text-slate-500 text-sm mb-4"><span aria-hidden="true">📍</span> {pkg.destination}</p>
        <ul className="space-y-1 mb-5 flex-1">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h} className="text-xs text-slate-600 flex items-center gap-1.5">
              <span className="text-brand" aria-hidden="true">✔</span> {h}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Link
            href={`/${pkg.slug}`}
            className="flex-[2] text-center bg-brand text-white px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors"
          >
            View Package
          </Link>
          <a
            href={buildWhatsAppURL(pkg)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp about ${pkg.title}`}
            className="flex-1 text-center bg-green-100 text-green-700 px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-200 transition-colors"
          >
            💬
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label="Call Tripcart Holidays"
            className="flex-1 text-center bg-sky-100 text-sky-700 px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-sky-200 transition-colors"
          >
            📞
          </a>
        </div>
      </div>
    </article>
  )
}
