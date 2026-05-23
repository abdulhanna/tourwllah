'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SITE_LOGO, SITE_LOGO_HEIGHT, SITE_LOGO_WIDTH } from '@/lib/brand'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Packages', href: '/packages' },
  { label: 'Treks', href: '/treks' },
  { label: 'Leh Ladakh', href: '/leh-ladakh' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kashmir', href: '/kashmir-tour-package' },
  { label: 'Manali', href: '/manali-tour-package' },
  { label: 'Rajasthan', href: '/rajasthan-tour-package' },
  { label: 'North East', href: '/north-east-tour-package' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 sm:h-24">
        {/* Logo */}
        <Link href="/" aria-label="Tripcart Holidays — home" className="flex shrink-0 items-center py-1">
          <Image
            src={SITE_LOGO}
            alt="Tripcart Holidays"
            width={SITE_LOGO_WIDTH}
            height={SITE_LOGO_HEIGHT}
            priority
            quality={100}
            unoptimized
            className="h-[4.75rem] sm:h-[5.75rem] w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand rounded-md hover:bg-teal-50 transition-all"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + mobile menu */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <ul className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-brand hover:bg-teal-50 rounded-md transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
