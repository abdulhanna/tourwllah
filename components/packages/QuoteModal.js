'use client'

import { useEffect, useRef, useState } from 'react'
import { buildQuoteWhatsAppURL, isValidPhone, openWhatsAppQuote } from '@/lib/whatsapp'

const DESTINATION_OPTIONS = ['Kashmir', 'Manali', 'Rajasthan', 'North East', 'Not sure / Any']
const TRAVELLER_OPTIONS = ['1', '2', '3', '4', '5', '6+']

export default function QuoteModal({ open, onClose, destination, packageTitle }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    destination: destination || 'Not sure / Any',
    month: '',
    travellers: '2',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [fallbackUrl, setFallbackUrl] = useState(null)
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (!open) return
    setForm(f => ({ ...f, destination: destination || 'Not sure / Any' }))
    setErrors({})
    setFallbackUrl(null)
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    firstFieldRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, destination, onClose])

  if (!open) return null

  const update = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name'
    if (!isValidPhone(form.phone)) errs.phone = 'Enter a valid phone number'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const data = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      destination: form.destination === 'Not sure / Any' ? '' : form.destination,
      dates: form.month,
      travellers: `${form.travellers} traveller${form.travellers === '1' ? '' : 's'}`,
      packageTitle,
      message: form.message,
    }
    const win = openWhatsAppQuote(data)
    if (!win) {
      setFallbackUrl(buildQuoteWhatsAppURL(data))
    } else {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Get a free quote"
    >
      <div className="absolute inset-0 bg-slate-900/70" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-br from-brand to-brand-dark text-white px-5 py-4 relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-4 text-white/70 hover:text-white text-xl cursor-pointer"
          >
            ✕
          </button>
          <h2 className="font-display font-bold text-lg">Get a Free Quote</h2>
          <p className="text-white/85 text-sm">We reply on WhatsApp within minutes</p>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-3" noValidate>
          <div>
            <label className="block text-xs text-slate-600 mb-1">Your name *</label>
            <input
              ref={firstFieldRef}
              value={form.name}
              onChange={update('name')}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              placeholder="e.g. Rahul Sharma"
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs text-slate-600 mb-1">Phone / WhatsApp *</label>
            <input
              value={form.phone}
              onChange={update('phone')}
              inputMode="tel"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              placeholder="+91 …"
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-xs text-slate-600 mb-1">Destination</label>
            <select
              value={form.destination}
              onChange={update('destination')}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
            >
              {DESTINATION_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs text-slate-600 mb-1">Travel month</label>
              <input
                type="month"
                value={form.month}
                onChange={update('month')}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-slate-600 mb-1">Travellers</label>
              <select
                value={form.travellers}
                onChange={update('travellers')}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
              >
                {TRAVELLER_OPTIONS.map(n => (
                  <option key={n} value={n}>{n} traveller{n === '1' ? '' : 's'}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-600 mb-1">Anything else? (optional)</label>
            <textarea
              value={form.message}
              onChange={update('message')}
              rows={2}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm resize-none"
              placeholder="Honeymoon, veg meals…"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-sm py-3 rounded-lg transition-colors cursor-pointer"
          >
            💬 Send on WhatsApp
          </button>
          {fallbackUrl && (
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm text-green-700 underline"
            >
              Tap here to open WhatsApp
            </a>
          )}
          <p className="text-center text-[11px] text-slate-400">
            No spam. We only use this to send your quote.
          </p>
        </form>
      </div>
    </div>
  )
}
