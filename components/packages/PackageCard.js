'use client'

import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { openWhatsApp } from '@/lib/whatsapp'
import { deletePackage, duplicatePackage } from '@/lib/storage'
import { downloadPackagePDF } from '@/lib/pdf'
import { useState } from 'react'

export default function PackageCard({ pkg, onRefresh }) {
  const [pdfLoading, setPdfLoading] = useState(false)

  const handleDelete = () => {
    if (confirm(`Delete "${pkg.title}"?`)) {
      deletePackage(pkg.id)
      onRefresh?.()
    }
  }

  const handleDuplicate = () => {
    duplicatePackage(pkg.id)
    onRefresh?.()
  }

  const handlePDF = async () => {
    setPdfLoading(true)
    const previewId = `preview-${pkg.id}`
    const el = document.createElement('div')
    el.id = previewId
    el.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;padding:32px;font-family:sans-serif;'
    el.innerHTML = buildPreviewHTML(pkg)
    document.body.appendChild(el)
    try {
      await downloadPackagePDF(previewId, `${pkg.title}.pdf`)
    } finally {
      document.body.removeChild(el)
      setPdfLoading(false)
    }
  }

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="h-3 bg-gradient-to-r from-brand to-brand-light" />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <Badge variant="teal" className="mb-2">{pkg.destination}</Badge>
            <h3 className="font-display font-bold text-slate-900 text-lg leading-snug">{pkg.title}</h3>
          </div>
          {pkg.price && (
            <span className="flex-shrink-0 text-accent font-bold text-base">{pkg.price}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-slate-600 mb-4">
          <span>🗓 {pkg.duration}</span>
          {pkg.dates && <span>📅 {pkg.dates}</span>}
          {pkg.guests && <span>👥 {pkg.guests}</span>}
        </div>

        {pkg.highlights?.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mb-5">
            {pkg.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-md">✔ {h}</li>
            ))}
            {pkg.highlights.length > 3 && (
              <li className="text-xs text-slate-400 px-2 py-1">+{pkg.highlights.length - 3} more</li>
            )}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
          <Link
            href={`/create-package?id=${pkg.id}`}
            className="flex-1 min-w-0 text-center text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            ✏️ Edit
          </Link>
          <button
            onClick={handleDuplicate}
            className="flex-1 min-w-0 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            📋 Copy
          </button>
          <button
            onClick={() => openWhatsApp(pkg)}
            className="flex-1 min-w-0 text-xs font-semibold px-3 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors cursor-pointer"
          >
            💬 WhatsApp
          </button>
          <button
            onClick={handlePDF}
            disabled={pdfLoading}
            className="flex-1 min-w-0 text-xs font-semibold px-3 py-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            {pdfLoading ? '...' : '📄 PDF'}
          </button>
          <button
            onClick={handleDelete}
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
          >
            🗑
          </button>
        </div>
      </div>
    </article>
  )
}

function buildPreviewHTML(pkg) {
  const inclusions = (pkg.inclusions || []).map(i => `<li style="margin:4px 0">✅ ${i}</li>`).join('')
  const exclusions = (pkg.exclusions || []).map(e => `<li style="margin:4px 0">❌ ${e}</li>`).join('')
  const itinerary = (pkg.itinerary || []).map(d => `
    <div style="margin:12px 0;padding:12px;border-left:4px solid #0f766e;background:#f0faf9">
      <strong>Day ${d.day}: ${d.title}</strong>
      <p style="margin:4px 0;color:#555;font-size:13px">${d.description}</p>
    </div>
  `).join('')

  return `
    <div style="color:#0f172a;font-size:14px;line-height:1.6">
      <div style="text-align:center;padding-bottom:20px;border-bottom:2px solid #0f766e;margin-bottom:20px">
        <h1 style="font-size:24px;color:#0f766e;margin:0">🏔 Himalayan Holidays</h1>
        <h2 style="font-size:18px;margin:8px 0 4px">${pkg.title}</h2>
        <p style="color:#666;margin:0">${pkg.duration} · ${pkg.destination}</p>
      </div>
      ${itinerary}
      <div style="margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div><h3 style="color:#0f766e">Inclusions</h3><ul style="padding-left:0;list-style:none">${inclusions}</ul></div>
        <div><h3 style="color:#e11d48">Exclusions</h3><ul style="padding-left:0;list-style:none">${exclusions}</ul></div>
      </div>
      ${pkg.notes ? `<div style="margin-top:16px;padding:12px;background:#fef9ee;border-radius:8px"><strong>📝 Notes:</strong> ${pkg.notes}</div>` : ''}
    </div>
  `
}
