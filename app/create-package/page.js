'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { savePackage, getPackageById } from '@/lib/storage'
import ItineraryBuilder from '@/components/packages/ItineraryBuilder'
import TagInput from '@/components/packages/TagInput'
import PackagePreview from '@/components/packages/PackagePreview'

const EMPTY_PKG = {
  id: '',
  destination: '',
  title: '',
  duration: '',
  dates: '',
  guests: '',
  price: '',
  hotels: '',
  transport: '',
  highlights: [],
  inclusions: [],
  exclusions: [],
  notes: '',
  itinerary: [],
  slug: '',
}

function PackageFormInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const [form, setForm] = useState(EMPTY_PKG)
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (editId) {
      const existing = getPackageById(editId)
      if (existing) setForm(existing)
    } else {
      setForm({ ...EMPTY_PKG, id: `pkg-${Date.now()}` })
    }
  }, [editId])

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.destination) {
      alert('Please fill in at least a Destination and Title.')
      return
    }
    setSaving(true)
    savePackage(form)
    router.push('/packages')
  }

  if (!mounted) return <div className="min-h-[60vh] flex items-center justify-center"><div className="text-brand text-4xl animate-pulse">🏔</div></div>

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form column */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-semibold text-slate-900 text-base mb-5 pb-3 border-b border-slate-100">Basic Information</h2>
              <div className="space-y-4">
                <Field label="Destination *" required>
                  <input type="text" placeholder="e.g. Kashmir" value={form.destination} onChange={e => set('destination', e.target.value)} className={inputCls} required />
                </Field>
                <Field label="Package Title *" required>
                  <input type="text" placeholder="e.g. Kashmir Paradise Package" value={form.title} onChange={e => set('title', e.target.value)} className={inputCls} required />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Duration">
                    <input type="text" placeholder="5 Nights / 6 Days" value={form.duration} onChange={e => set('duration', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Travel Dates">
                    <input type="text" placeholder="Apr–Jun, Sep–Nov" value={form.dates} onChange={e => set('dates', e.target.value)} className={inputCls} />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Guests">
                    <input type="text" placeholder="2 Adults" value={form.guests} onChange={e => set('guests', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Price">
                    <input type="text" placeholder="₹28,000/person" value={form.price} onChange={e => set('price', e.target.value)} className={inputCls} />
                  </Field>
                </div>
              </div>
            </div>

            {/* Hotels & Transport */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-semibold text-slate-900 text-base mb-5 pb-3 border-b border-slate-100">Accommodation & Transport</h2>
              <div className="space-y-4">
                <Field label="Hotels">
                  <input type="text" placeholder="e.g. Houseboat on Dal Lake (2N) + 3-Star Hotel (3N)" value={form.hotels} onChange={e => set('hotels', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Transport">
                  <input type="text" placeholder="e.g. Private AC cab throughout" value={form.transport} onChange={e => set('transport', e.target.value)} className={inputCls} />
                </Field>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-semibold text-slate-900 text-base mb-5 pb-3 border-b border-slate-100">Highlights, Inclusions & Exclusions</h2>
              <div className="space-y-4">
                <Field label="Highlights" hint="Press Enter or comma to add">
                  <TagInput tags={form.highlights} onChange={v => set('highlights', v)} placeholder="Add highlights..." color="teal" />
                </Field>
                <Field label="Inclusions" hint="Press Enter or comma to add">
                  <TagInput tags={form.inclusions} onChange={v => set('inclusions', v)} placeholder="Add inclusions..." color="teal" />
                </Field>
                <Field label="Exclusions" hint="Press Enter or comma to add">
                  <TagInput tags={form.exclusions} onChange={v => set('exclusions', v)} placeholder="Add exclusions..." color="red" />
                </Field>
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-semibold text-slate-900 text-base mb-5 pb-3 border-b border-slate-100">Day-wise Itinerary</h2>
              <ItineraryBuilder itinerary={form.itinerary} onChange={v => set('itinerary', v)} />
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-semibold text-slate-900 text-base mb-5 pb-3 border-b border-slate-100">Notes</h2>
              <textarea
                placeholder="Any additional notes, tips or important information for the traveller..."
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                rows={4}
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pb-10">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-brand text-white py-3.5 rounded-xl font-bold text-base hover:bg-brand-dark transition-colors cursor-pointer disabled:opacity-60"
              >
                {saving ? 'Saving...' : editId ? '💾 Update Package' : '💾 Save Package'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/packages')}
                className="px-5 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Live Preview column */}
          <div className="xl:sticky xl:top-20 xl:h-[calc(100vh-5rem)]">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 h-full flex flex-col">
              <h2 className="font-semibold text-slate-900 text-base mb-4 pb-3 border-b border-slate-100">
                📋 Live Preview
              </h2>
              <div className="flex-1 overflow-hidden">
                <PackagePreview pkg={form} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default function CreatePackage() {
  const [editMode, setEditMode] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand to-brand-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Package Builder</h1>
          <p className="text-white/75">Fill in the details — see the live preview update instantly on the right</p>
        </div>
      </section>
      <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="text-brand text-4xl animate-pulse">🏔</div></div>}>
        <PackageFormInner />
      </Suspense>
    </div>
  )
}

function Field({ label, children, hint, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
        {hint && <span className="text-xs text-slate-400 font-normal ml-2">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white placeholder:text-slate-400'
