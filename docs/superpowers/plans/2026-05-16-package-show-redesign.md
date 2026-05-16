# Package Show Redesign (P0 Funnel) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the public-facing `/packages` route (currently an internal localStorage agent CRM) with a real server-rendered package catalog, relocate the CRM to `/admin`, and add click-to-call + a reusable "Get Free Quote" WhatsApp modal.

**Architecture:** The catalog is a pure server component reading `data/packages.js`; cards link to existing landing pages. The only client-interactive piece is a quote modal opened by a small client `QuoteButton`. All lead capture is a WhatsApp deep-link — no backend, nothing persisted. Pure WhatsApp message/URL builders are unit-tested with Vitest (TDD); UI/routing is verified via `next build` + `eslint` + a manual walkthrough.

**Tech Stack:** Next.js 16.2.4 (App Router), React 19, Tailwind CSS v4, Vitest (new dev dependency).

**Spec:** `docs/superpowers/specs/2026-05-16-package-show-redesign-design.md`

**Preflight (AGENTS.md requirement):** Before the UI tasks (Task 4+), skim these Next.js 16 guides — APIs may differ from training data:
- `node_modules/next/dist/docs/01-app` — server vs client components, `metadata` export, route file conventions.
The existing repo already demonstrates the working patterns: `app/page.js` (server component + `export const metadata`), `app/manali-tour-package/page.js` (JSON-LD `<script type="application/ld+json">`), `app/packages/page.js` (`'use client'`). Follow those patterns.

**Conventions confirmed in this repo:**
- Path alias `@/*` → project root (`jsconfig.json`).
- `next.config.mjs` already whitelists `images.moneycontrol.com` and `s7ap1.scene7.com` — **no image config change needed** for the catalog.
- Tailwind theme colors `brand`, `brand-dark`, `brand-light`, `accent`, `accent-light` are already in use (`app/page.js`, `app/packages/page.js`).
- Business contact: WhatsApp `917004015511` (already `DEFAULT_PHONE` in `lib/whatsapp.js`); call link `tel:+917004015511`.

---

## File Structure

| File | Action | Responsibility |
| --- | --- | --- |
| `vitest.config.mjs` | Create | Vitest config (node env, `lib/**/*.test.js`) |
| `package.json` | Modify | Add `vitest` devDep + `test` script |
| `lib/whatsapp.js` | Modify | Add pure `buildQuoteMessage`, `buildQuoteWhatsAppURL`, `isValidPhone`, + `openWhatsAppQuote` wrapper |
| `lib/whatsapp.test.js` | Create | Vitest unit tests for the pure builders |
| `components/packages/PublicPackageCard.js` | Create | Customer-facing card (server component) |
| `components/packages/QuoteModal.js` | Create | Quote form modal (client) |
| `components/packages/QuoteButton.js` | Create | Client trigger that owns modal open state |
| `app/admin/page.js` | Create | Relocated agent CRM list (old `/packages` content) |
| `app/packages/page.js` | Rewrite | Public catalog (server component) |
| `components/layout/Navbar.js` | Modify | Remove "+ Create Package" buttons |
| `components/layout/Footer.js` | Modify | Relabel "My Packages"; remove "Create Package" |
| `app/page.js` | Modify | Relabel "View All My Packages →" |
| `app/robots.js` | Modify | Disallow `/admin` |
| `app/sitemap.js` | Modify | Upgrade `/packages` priority/frequency |
| `components/layout/StickyWhatsApp.js` | Modify | Hide on `/admin` |
| `app/create-package/page.js` | Modify | Fix pre-existing `set-state-in-effect` lint error; redirect post-save to `/admin` |

> **Scope addendum (user-authorized 2026-05-16):** the baseline had 2 pre-existing
> `react-hooks/set-state-in-effect` errors (`app/packages/page.js:15`,
> `app/create-package/page.js:38`). The user authorized fixing both as part of this
> work. The first moves into `app/admin/page.js` and is fixed there (Task 7); the
> second is fixed in place (Task 9). Both are client-only `localStorage`-backed
> screens that legitimately load data on mount behind a loading guard (to avoid a
> hydration mismatch) — exactly the case the `set-state-in-effect` rule's guidance
> exempts. The rule follows the call graph, so a `refresh()`/helper indirection does
> NOT silence it (verified empirically). The fix is therefore a scoped
> `// eslint-disable-next-line react-hooks/set-state-in-effect` with a rationale
> comment on the data-load line, plus the `mounted` boolean replaced by a `null`
> data-sentinel. A `useSyncExternalStore` refactor was considered and rejected as
> out-of-scope for an internal, non-SEO tool.

---

## Task 1: Vitest setup + `buildQuoteMessage` (TDD)

**Files:**
- Create: `vitest.config.mjs`
- Modify: `package.json` (scripts + devDependencies)
- Modify: `lib/whatsapp.js`
- Test: `lib/whatsapp.test.js`

- [ ] **Step 1: Install Vitest**

Run:
```bash
npm install -D vitest
```
Expected: `package.json` gains `vitest` under `devDependencies`; `package-lock.json` updated.

- [ ] **Step 2: Add the `test` script**

In `package.json`, change the `scripts` block from:
```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
```
to:
```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run"
  },
```

- [ ] **Step 3: Create `vitest.config.mjs`**

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['lib/**/*.test.js'],
  },
})
```

- [ ] **Step 4: Write the failing test**

Create `lib/whatsapp.test.js`:
```js
import { describe, it, expect } from 'vitest'
import { buildQuoteMessage } from './whatsapp.js'

describe('buildQuoteMessage', () => {
  it('includes required fields and closing line, omits optional lines', () => {
    const msg = buildQuoteMessage({ name: 'Rahul', phone: '+91 98765 43210' })
    expect(msg).toContain('🌸 Tripcart Holidays — Quote Request')
    expect(msg).toContain('👤 Rahul')
    expect(msg).toContain('📞 +91 98765 43210')
    expect(msg).toContain('Please share the best quote & itinerary.')
    expect(msg).not.toContain('📍')
    expect(msg).not.toContain('📦')
    expect(msg).not.toContain('📝')
  })

  it('includes optional fields when provided', () => {
    const msg = buildQuoteMessage({
      name: 'Asha',
      phone: '9999999999',
      destination: 'Kashmir',
      dates: 'Jun 2026',
      travellers: '2 travellers',
      packageTitle: 'Kashmir Paradise Package',
      message: '  Honeymoon  ',
    })
    expect(msg).toContain('📍 Kashmir')
    expect(msg).toContain('🗓 Jun 2026 · 2 travellers')
    expect(msg).toContain('📦 Kashmir Paradise Package')
    expect(msg).toContain('📝 Honeymoon')
  })

  it('omits the note line for whitespace-only messages', () => {
    const msg = buildQuoteMessage({ name: 'A', phone: '1234567', message: '   ' })
    expect(msg).not.toContain('📝')
  })
})
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `buildQuoteMessage is not a function` / not exported from `./whatsapp.js`.

- [ ] **Step 6: Implement `buildQuoteMessage`**

In `lib/whatsapp.js`, append at the end of the file:
```js
export function buildQuoteMessage({ name, phone, destination, dates, travellers, packageTitle, message }) {
  const lines = [
    '🌸 Tripcart Holidays — Quote Request',
    '',
    `👤 ${name}`,
    `📞 ${phone}`,
  ]
  if (destination) lines.push(`📍 ${destination}`)
  const when = [dates, travellers].filter(Boolean).join(' · ')
  if (when) lines.push(`🗓 ${when}`)
  if (packageTitle) lines.push(`📦 ${packageTitle}`)
  if (message && message.trim()) lines.push(`📝 ${message.trim()}`)
  lines.push('', 'Please share the best quote & itinerary.')
  return lines.join('\n')
}
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — 3 tests in `lib/whatsapp.test.js`.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.mjs lib/whatsapp.js lib/whatsapp.test.js
git commit -m "test: add Vitest + buildQuoteMessage for quote form"
```

---

## Task 2: `isValidPhone` (TDD)

**Files:**
- Modify: `lib/whatsapp.js`
- Test: `lib/whatsapp.test.js`

- [ ] **Step 1: Add the failing test**

Append to `lib/whatsapp.test.js` (add `isValidPhone` to the existing import line so it reads `import { buildQuoteMessage, isValidPhone } from './whatsapp.js'`):
```js
describe('isValidPhone', () => {
  it('accepts 7-15 digit numbers with separators', () => {
    expect(isValidPhone('+91 98765-43210')).toBe(true)
    expect(isValidPhone('1234567')).toBe(true)
    expect(isValidPhone('(070) 040 15511')).toBe(true)
  })

  it('rejects short, empty, or non-numeric input', () => {
    expect(isValidPhone('')).toBe(false)
    expect(isValidPhone(undefined)).toBe(false)
    expect(isValidPhone('12345')).toBe(false)
    expect(isValidPhone('abcdefg')).toBe(false)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `isValidPhone is not a function`.

- [ ] **Step 3: Implement `isValidPhone`**

Append to `lib/whatsapp.js`:
```js
export function isValidPhone(raw) {
  if (!raw) return false
  const digits = String(raw).replace(/[\s\-()+]/g, '')
  return /^\d{7,15}$/.test(digits)
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — all tests including the 2 new `isValidPhone` tests.

- [ ] **Step 5: Commit**

```bash
git add lib/whatsapp.js lib/whatsapp.test.js
git commit -m "test: add isValidPhone validator"
```

---

## Task 3: `buildQuoteWhatsAppURL` + `openWhatsAppQuote` (TDD the pure URL builder)

**Files:**
- Modify: `lib/whatsapp.js`
- Test: `lib/whatsapp.test.js`

- [ ] **Step 1: Add the failing test**

Append to `lib/whatsapp.test.js` (add `buildQuoteWhatsAppURL` to the import line so it reads `import { buildQuoteMessage, isValidPhone, buildQuoteWhatsAppURL } from './whatsapp.js'`):
```js
describe('buildQuoteWhatsAppURL', () => {
  it('targets the business number and round-trips the message', () => {
    const data = { name: 'A & B', phone: '1234567' }
    const url = buildQuoteWhatsAppURL(data)
    expect(url.startsWith('https://wa.me/917004015511?text=')).toBe(true)
    const text = decodeURIComponent(url.split('?text=')[1])
    expect(text).toBe(buildQuoteMessage(data))
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `buildQuoteWhatsAppURL is not a function`.

- [ ] **Step 3: Implement the URL builder and the client wrapper**

Append to `lib/whatsapp.js`:
```js
export function buildQuoteWhatsAppURL(data, phone = DEFAULT_PHONE) {
  const text = encodeURIComponent(buildQuoteMessage(data))
  return `https://wa.me/${phone}?text=${text}`
}

export function openWhatsAppQuote(data, phone = DEFAULT_PHONE) {
  const url = buildQuoteWhatsAppURL(data, phone)
  return window.open(url, '_blank', 'noopener,noreferrer')
}
```
Note: `DEFAULT_PHONE` is already defined at the top of `lib/whatsapp.js` (`'917004015511'`). `openWhatsAppQuote` touches `window` so it is not unit-tested; it is exercised in the manual walkthrough (Task 10).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — all tests including the new `buildQuoteWhatsAppURL` test.

- [ ] **Step 5: Commit**

```bash
git add lib/whatsapp.js lib/whatsapp.test.js
git commit -m "test: add buildQuoteWhatsAppURL + openWhatsAppQuote"
```

---

## Task 4: `PublicPackageCard` (server component)

UI component — verified by build + manual walkthrough (no unit test; the project has no component-test infra and adding one is out of scope per the spec).

**Files:**
- Create: `components/packages/PublicPackageCard.js`

- [ ] **Step 1: Create the component**

```jsx
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
          🗓 {pkg.duration}
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
        <p className="text-slate-500 text-sm mb-4">📍 {pkg.destination}</p>
        <ul className="space-y-1 mb-5 flex-1">
          {pkg.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
              <span className="text-brand">✔</span> {h}
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
```
Note: `buildWhatsAppURL(pkg)` already exists in `lib/whatsapp.js`, is pure, and does not touch `window` — safe in a server component.

- [ ] **Step 2: Lint the new file**

Run: `npm run lint`
Expected: PASS — no errors for `components/packages/PublicPackageCard.js`.

- [ ] **Step 3: Commit**

```bash
git add components/packages/PublicPackageCard.js
git commit -m "feat: customer-facing PublicPackageCard"
```

---

## Task 5: `QuoteModal` (client component)

**Files:**
- Create: `components/packages/QuoteModal.js`

- [ ] **Step 1: Create the component**

```jsx
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

  // Side-effects only. State is fresh per open because QuoteButton (Task 6)
  // conditionally MOUNTS this component ({open && <QuoteModal .../>}), so the
  // useState initializers above run on every open — no state reset in the effect
  // (which would trip the react-hooks/set-state-in-effect rule and fail lint).
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    firstFieldRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

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
```

- [ ] **Step 2: Lint the new file**

Run: `npm run lint`
Expected: PASS — no errors for `components/packages/QuoteModal.js`.

- [ ] **Step 3: Commit**

```bash
git add components/packages/QuoteModal.js
git commit -m "feat: QuoteModal WhatsApp lead form"
```

---

## Task 6: `QuoteButton` (client trigger)

**Files:**
- Create: `components/packages/QuoteButton.js`

- [ ] **Step 1: Create the component**

```jsx
'use client'

import { useState } from 'react'
import QuoteModal from './QuoteModal'

export default function QuoteButton({ destination, packageTitle, className, children }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children || '✦ Get Free Quote'}
      </button>
      {open && (
        <QuoteModal
          open
          onClose={() => setOpen(false)}
          destination={destination}
          packageTitle={packageTitle}
        />
      )}
    </>
  )
}
```

**Why conditional mount (`{open && ...}`):** QuoteModal must mount fresh on each
open so its `useState` initializers reset the form — this is what lets QuoteModal's
effect avoid the `react-hooks/set-state-in-effect` lint error (see Task 5). Always
rendering `<QuoteModal open={open} />` would keep a stale instance and re-introduce
the need for an in-effect reset. The `open` prop is passed (always truthy here) so
QuoteModal's internal `if (!open) return null` guard and prop contract stay intact.

- [ ] **Step 2: Lint the new file**

Run: `npx eslint components/packages/QuoteButton.js`
Expected: PASS — 0 errors for `components/packages/QuoteButton.js`.

- [ ] **Step 3: Commit**

```bash
git add components/packages/QuoteButton.js
git commit -m "feat: QuoteButton modal trigger"
```

---

## Task 7: Relocate the agent CRM to `/admin`

This moves the **current** `app/packages/page.js` CRM into `app/admin/page.js`, applying the authorized `set-state-in-effect` lint fix: drop the `mounted` boolean, use a `null` data-sentinel, and put a scoped `// eslint-disable-next-line react-hooks/set-state-in-effect` (with a rationale comment) on the mount-time data load. The rule follows the call graph so a `refresh()` indirection does NOT silence it — the disable is required and legitimate (client-only `localStorage` load behind a loading guard to avoid hydration mismatch). Everything else is unchanged: `'use client'`, `PackageCard`, `getPackages`, heading "My Packages". After this task both `/packages` (old CRM) and `/admin` (CRM) work — `/packages` is replaced in Task 8. This ordering keeps the app working at every commit.

**Files:**
- Create: `app/admin/page.js`

- [ ] **Step 1: Create `app/admin/page.js`**

Create `app/admin/page.js` with exactly this content (this is the CRM with the lint fix already applied):

```jsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PackageCard from '@/components/packages/PackageCard'
import { getPackages } from '@/lib/storage'

export default function MyPackages() {
  const [packages, setPackages] = useState(null)

  const refresh = () => setPackages(getPackages())

  useEffect(() => {
    // Client-only localStorage read on mount; the null-sentinel + loading guard
    // below prevents a hydration mismatch. Intentional setState-on-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [])

  if (packages === null) return <div className="min-h-screen flex items-center justify-center"><div className="text-brand text-4xl animate-pulse">🏔</div></div>

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
```

- [ ] **Step 2: Lint the new file**

Run: `npx eslint app/admin/page.js`
Expected: PASS — 0 errors, 0 warnings. The `set-state-in-effect` error is suppressed by the scoped `// eslint-disable-next-line react-hooks/set-state-in-effect` on the `refresh()` line (with its rationale comment). Verify the disable comment is present and immediately precedes `refresh()`.

- [ ] **Step 3: Verify it renders**

Run: `npm run dev`, open `http://localhost:3000/admin`.
Expected: the "My Packages" CRM renders with the seeded demo packages and working Edit/Copy/WhatsApp/PDF/Delete actions. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/admin/page.js
git commit -m "feat: relocate agent package CRM to /admin (with set-state-in-effect fix)"
```

---

## Task 8: Rewrite `/packages` as the public catalog

**Files:**
- Rewrite: `app/packages/page.js`

- [ ] **Step 1: Replace the entire file**

Overwrite `app/packages/page.js` with:
```jsx
import { DEMO_PACKAGES } from '@/data/packages'
import { DESTINATIONS } from '@/data/destinations'
import PublicPackageCard from '@/components/packages/PublicPackageCard'
import QuoteButton from '@/components/packages/QuoteButton'

export const metadata = {
  title: { absolute: 'Tour Packages | Kashmir, Manali, Rajasthan & North East — Tripcart Holidays' },
  description:
    'Browse handcrafted Kashmir, Manali, Rajasthan and North East tour packages from Tripcart Holidays. Compare itineraries and get an instant quote on WhatsApp.',
  keywords: ['tour packages India', 'Kashmir Manali Rajasthan North East tour', 'India holiday packages', 'WhatsApp travel booking', 'Tripcart Holidays'],
  alternates: { canonical: 'https://tripcartholidays.com/packages' },
  openGraph: {
    title: 'Tour Packages — Tripcart Holidays',
    description:
      'Handcrafted Kashmir, Manali, Rajasthan and North East tour packages. Get an instant WhatsApp quote.',
    url: 'https://tripcartholidays.com/packages',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tripcart Holidays Tour Packages' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tour Packages — Tripcart Holidays',
    description: 'Handcrafted India tour packages. Get an instant WhatsApp quote.',
    images: ['/twitter-image.png'],
  },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: DEMO_PACKAGES.map((pkg, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: pkg.title,
    url: `https://tripcartholidays.com/${pkg.slug}`,
  })),
}

const trustChips = [
  { icon: '🏆', label: '10+ Years' },
  { icon: '😊', label: '5000+ Travellers' },
  { icon: '📞', label: '24/7 Support' },
]

export default function PackagesCatalog() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="bg-gradient-to-br from-brand to-brand-dark text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/75 text-xs uppercase tracking-widest mb-2">Tripcart Holidays</p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-3">Tour Packages</h1>
          <p className="text-white/85 max-w-xl mb-6">
            Handcrafted holidays across Kashmir, Manali, Rajasthan &amp; North East — every itinerary is fully customisable.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {trustChips.map(c => (
              <span
                key={c.label}
                className="bg-white/15 border border-white/25 text-sm px-4 py-1.5 rounded-full"
              >
                <span aria-hidden="true">{c.icon}</span> {c.label}
              </span>
            ))}
            <QuoteButton className="sm:ml-auto bg-accent text-slate-900 font-bold text-sm px-6 py-2.5 rounded-full hover:brightness-95 transition cursor-pointer" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">All Tour Packages</h2>
          <p className="text-slate-500 text-sm mb-6">
            {DEMO_PACKAGES.length} packages · all customisable
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_PACKAGES.map(pkg => {
              const dest = DESTINATIONS.find(d => d.landingSlug === pkg.slug)
              return <PublicPackageCard key={pkg.id} pkg={pkg} dest={dest} />
            })}
          </div>
        </div>
      </section>

      <section className="bg-green-600 py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Not sure which to pick?
          </h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            Tell us your dates &amp; budget — we&apos;ll craft a custom itinerary in minutes.
          </p>
          <QuoteButton className="bg-white text-green-700 font-bold px-8 py-4 rounded-full text-lg shadow-md hover:bg-green-50 transition cursor-pointer">
            <span aria-hidden="true">✦</span> Get Free Quote
          </QuoteButton>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify it renders**

Run: `npm run dev`, open `http://localhost:3000/packages`.
Expected: server-rendered catalog — teal header with trust chips + "Get Free Quote", a 3-column grid of 4 cards (Kashmir/Manali/Rajasthan/North East) with images, "View Package"/💬/📞 actions, and the green bottom CTA. Clicking "Get Free Quote" opens the modal. Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add app/packages/page.js
git commit -m "feat: public package catalog at /packages"
```

---

## Task 9: Delink the CRM + SEO updates

**Files:**
- Modify: `components/layout/Navbar.js`
- Modify: `components/layout/Footer.js`
- Modify: `app/page.js`
- Modify: `app/robots.js`
- Modify: `app/sitemap.js`
- Modify: `components/layout/StickyWhatsApp.js`
- Modify: `app/create-package/page.js`

- [ ] **Step 1: Navbar — remove the desktop "+ Create Package" button**

In `components/layout/Navbar.js`, delete this block (the desktop CTA inside `<div className="flex items-center gap-3">`):
```jsx
          <Link
            href="/create-package"
            className="hidden sm:inline-flex items-center gap-1.5 bg-brand text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors"
          >
            + Create Package
          </Link>
```

- [ ] **Step 2: Navbar — remove the mobile "+ Create Package" list item**

In the mobile menu `<ul>`, delete this block:
```jsx
            <li>
              <Link
                href="/create-package"
                className="block px-3 py-2.5 text-sm font-semibold text-brand border border-brand rounded-md mt-2 text-center hover:bg-teal-50 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                + Create Package
              </Link>
            </li>
```

- [ ] **Step 3: Footer — relabel and remove quick links**

In `components/layout/Footer.js`, change the `quickLinks` array from:
```jsx
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'My Packages', href: '/packages' },
  { label: 'Travel Blog', href: '/blog' },
  { label: 'Create Package', href: '/create-package' },
]
```
to:
```jsx
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Tour Packages', href: '/packages' },
  { label: 'Travel Blog', href: '/blog' },
]
```

- [ ] **Step 4: Home — relabel the catalog CTA**

In `app/page.js`, change:
```jsx
              View All My Packages →
```
to:
```jsx
              View All Packages →
```

- [ ] **Step 5: robots — disallow `/admin`**

In `app/robots.js`, change:
```js
        disallow: ['/create-package', '/api/'],
```
to:
```js
        disallow: ['/admin', '/create-package', '/api/'],
```

- [ ] **Step 6: sitemap — upgrade `/packages`**

In `app/sitemap.js`, change:
```js
    { url: `${BASE}/packages`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
```
to:
```js
    { url: `${BASE}/packages`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
```

- [ ] **Step 7: StickyWhatsApp — hide on `/admin`**

In `components/layout/StickyWhatsApp.js`, change:
```jsx
  if (pathname === '/create-package') return null
```
to:
```jsx
  if (pathname === '/create-package' || pathname === '/admin') return null
```

- [ ] **Step 8: create-package — fix the pre-existing `set-state-in-effect` error**

In `app/create-package/page.js`, replace this block:
```jsx
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
```
with (drop `mounted`; use a `null` sentinel; load directly in the effect with a
scoped `set-state-in-effect` disable + rationale). The rule follows the call graph,
so a helper indirection does NOT silence it — disable it directly on the `setForm`
line. Deps stay `[editId]`; `getPackageById` (import) and `EMPTY_PKG` (module const)
are stable, so there is NO `exhaustive-deps` problem and NO second disable is needed:
```jsx
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const existing = editId ? getPackageById(editId) : null
    // Client-only localStorage read on mount / editId change; the null-sentinel
    // + loading guard below prevents a hydration mismatch. Intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(existing || { ...EMPTY_PKG, id: `pkg-${Date.now()}` })
  }, [editId])
```
Then change the loading guard from:
```jsx
  if (!mounted) return <div className="min-h-[60vh] flex items-center justify-center"><div className="text-brand text-4xl animate-pulse">🏔</div></div>
```
to:
```jsx
  if (!form) return <div className="min-h-[60vh] flex items-center justify-center"><div className="text-brand text-4xl animate-pulse">🏔</div></div>
```
Note: this preserves the original behaviour exactly — on mount (and whenever
`editId` changes) the form is populated from `getPackageById(editId)` or a fresh
`EMPTY_PKG` with a generated id; the loading spinner shows until `form` is set.

- [ ] **Step 9: create-package — redirect post-save to `/admin`**

In `app/create-package/page.js`, change BOTH internal-navigation targets from
`/packages` to `/admin`:
1. In `handleSubmit`: `router.push('/packages')` → `router.push('/admin')`.
2. The **Cancel** button's `onClick={() => router.push('/packages')}` →
   `onClick={() => router.push('/admin')}`.
Reason: `/packages` is now the public catalog; after saving OR cancelling, an agent
must land back on their CRM list (`/admin`), not the public page. (The Cancel target
was an oversight in the original plan, caught during Task 9 implementation review.)

- [ ] **Step 10: Lint (full — must be fully clean now)**

Run: `npm run lint`
Expected: PASS — **0 errors, 0 warnings**. Both pre-existing `set-state-in-effect`
errors are now resolved (one removed via the `/admin` rewrite in Task 7, one fixed
here). If any error remains, fix it before committing.

- [ ] **Step 11: Commit**

```bash
git add components/layout/Navbar.js components/layout/Footer.js app/page.js app/robots.js app/sitemap.js components/layout/StickyWhatsApp.js app/create-package/page.js
git commit -m "feat: delink agent CRM from public nav + SEO + lint fixes"
```

---

## Task 10: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Unit tests pass**

Run: `npm test`
Expected: PASS — all `lib/whatsapp.test.js` tests green.

- [ ] **Step 2: Lint passes**

Run: `npm run lint`
Expected: PASS — **0 errors, 0 warnings** (including the 2 previously pre-existing
`set-state-in-effect` errors, now fixed).

- [ ] **Step 3: Production build passes**

Run: `npm run build`
Expected: build completes with no errors; `/packages` and `/admin` both listed as routes.

- [ ] **Step 4: Manual walkthrough**

Run `npm run dev` and verify:
- `/packages` is the public catalog (SSR — view source shows the package titles and the `ItemList` JSON-LD; not a loading spinner).
- Each card: "View Package" → the matching landing page (e.g. `/manali-tour-package`); 💬 opens `wa.me` with the package message; 📞 triggers `tel:+917004015511`.
- "Get Free Quote" (header + bottom band): modal opens; submitting empty shows name/phone errors; a valid submit opens a `wa.me` tab with the structured quote message; `Esc` and backdrop close; page scroll is restored after closing.
- `/admin` renders the agent CRM (Edit/Copy/WhatsApp/PDF/Delete work); no "Chat" sticky button on `/admin` or `/create-package`.
- `/create-package`: create or edit a package, Save → lands on `/admin` (the CRM list), **not** `/packages`; the form shows the loading state then populates (no hydration error in console).
- Navbar has no "+ Create Package"; Footer shows "Tour Packages", no "Create Package"; home "View All Packages →" → `/packages`.
- `/robots.txt` disallows `/admin`; `/sitemap.xml` lists `/packages` at priority 0.8 and does **not** list `/admin`.

Stop the dev server.

- [ ] **Step 5: Final commit (if any verification fixes were needed)**

```bash
git add -A
git commit -m "chore: package show redesign verification fixes"
```
(Skip if Steps 1–4 required no changes.)

---

## Self-Review (completed during plan authoring)

**Spec coverage:** Route changes → Tasks 7, 8, 9. PublicPackageCard → Task 4. QuoteModal/QuoteButton → Tasks 5, 6. `lib/whatsapp.js` builders → Tasks 1–3. Modal fields/validation/message format → Tasks 1, 5. Error handling (popup fallback, scroll-lock cleanup, missing data) → Tasks 4, 5. robots/sitemap/StickyWhatsApp → Task 9. Vitest TDD → Tasks 1–3. Manual + build verification → Task 10. All spec sections mapped.

**Placeholder scan:** No TBD/TODO; every code step contains full code; verification steps have exact commands and expected output.

**Type/name consistency:** `buildQuoteMessage`, `buildQuoteWhatsAppURL`, `isValidPhone`, `openWhatsAppQuote` used consistently across Tasks 1–6; `PublicPackageCard` props `{ pkg, dest }` consistent between Task 4 and Task 8; `QuoteButton`/`QuoteModal` props (`open`, `onClose`, `destination`, `packageTitle`) consistent between Tasks 5 and 6. `DEFAULT_PHONE` reused from existing code, not redefined.

**Scope addendum (post-baseline, user-authorized):** 2 pre-existing
`react-hooks/set-state-in-effect` errors fixed — `app/packages/page.js` (via the
`/admin` rewrite, Task 7) and `app/create-package/page.js` (Task 9 Step 8). Also in
Task 9 Step 9, `create-package`'s post-save redirect changed `/packages` → `/admin`
(integration fix: `/packages` is now the public catalog).

**Deferred (out of scope, per spec):** landing-page price block, amenity-icon strip, reviews section, dynamic `[slug]` consolidation, self-hosted images, `aggregateRating` cleanup.
