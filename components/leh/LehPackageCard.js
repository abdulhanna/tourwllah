import Image from 'next/image'
import Link from 'next/link'
import { LEH_PACKAGE_TYPES } from '@/data/leh-packages'

export default function LehPackageCard({ pkg }) {
  const type = LEH_PACKAGE_TYPES[pkg.packageType]

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={pkg.cardImage}
          alt={pkg.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
            {pkg.duration}
          </span>
          <span className="bg-amber-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
            {type.icon} {type.label}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display font-bold text-white text-lg leading-snug drop-shadow">
            {pkg.shortTitle}
          </h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-slate-500 text-sm mb-3 line-clamp-2">{pkg.overview}</p>
        <p className="text-brand font-bold text-sm mb-4">{pkg.price}</p>
        <dl className="grid grid-cols-2 gap-3 mb-5 text-xs">
          <div>
            <dt className="text-slate-400 uppercase tracking-wide">Route</dt>
            <dd className="font-semibold text-slate-800 line-clamp-2">{pkg.route}</dd>
          </div>
          <div>
            <dt className="text-slate-400 uppercase tracking-wide">Season</dt>
            <dd className="font-semibold text-slate-800">{pkg.season}</dd>
          </div>
        </dl>
        <ul className="space-y-1 mb-5">
          {pkg.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
              <span className="text-brand">✔</span> {h.label}
            </li>
          ))}
        </ul>
        <Link
          href={`/leh-ladakh/${pkg.slug}`}
          className="block text-center bg-brand text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors"
        >
          View Package Details
        </Link>
      </div>
    </article>
  )
}
