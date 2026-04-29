'use client'

import Link from 'next/link'
import { openWhatsAppGeneral } from '@/lib/whatsapp'

const destinations = [
  { label: 'Kashmir Tour Package', href: '/kashmir-tour-package' },
  { label: 'Manali Tour Package', href: '/manali-tour-package' },
  { label: 'Rajasthan Tour Package', href: '/rajasthan-tour-package' },
]

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'My Packages', href: '/packages' },
  { label: 'Travel Blog', href: '/blog' },
  { label: 'Create Package', href: '/create-package' },
]

const blogLinks = [
  { label: 'Top Places in Kashmir', href: '/blog/top-places-in-kashmir' },
  { label: 'Things to Do in Manali', href: '/blog/things-to-do-in-manali' },
  { label: 'Rajasthan Itinerary Guide', href: '/blog/rajasthan-itinerary-guide' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏔</span>
              <span className="font-display font-bold text-lg text-white">Himalayan Holidays</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Creating unforgettable travel experiences across the Indian Himalayas and beyond since 2014.
            </p>
            <button
              onClick={() => openWhatsAppGeneral()}
              className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors cursor-pointer"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </button>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Destinations</h3>
            <ul className="space-y-2.5">
              {destinations.map(d => (
                <li key={d.href}>
                  <Link href={d.href} className="text-sm text-slate-400 hover:text-brand-light transition-colors">
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-brand-light transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Blog + Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Travel Blog</h3>
            <ul className="space-y-2.5 mb-6">
              {blogLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-brand-light transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-1.5 text-sm text-slate-400">
              <p>📧 info@himalayanholidays.in</p>
              <p>📞 +91-XXXXXXXXXX</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Himalayan Holidays. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Crafted with ♥ for wanderers
          </p>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
