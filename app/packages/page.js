'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PackageCard from '@/components/packages/PackageCard'
import { getPackages } from '@/lib/storage'

export default function MyPackages() {
  const [packages, setPackages] = useState([])
  const [mounted, setMounted] = useState(false)

  const refresh = () => setPackages(getPackages())

  useEffect(() => {
    setMounted(true)
    refresh()
  }, [])

  if (!mounted) return <div className="min-h-screen flex items-center justify-center"><div className="text-brand text-4xl animate-pulse">🏔</div></div>

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand to-brand-dark text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">My Packages</h1>
          <p className="text-white/75">Manage your saved tour packages and send them to clients via WhatsApp</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-slate-500 text-sm">{packages.length} package{packages.length !== 1 ? 's' : ''} saved</p>
          <Link
            href="/create-package"
            className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors"
          >
            + Create New Package
          </Link>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-6xl block mb-4">📦</span>
            <h2 className="font-display text-xl font-bold text-slate-700 mb-2">No packages yet</h2>
            <p className="text-slate-500 mb-8">Create your first package to start generating leads</p>
            <Link
              href="/create-package"
              className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors"
            >
              + Create Package
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} onRefresh={refresh} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
