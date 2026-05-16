# Package Show Redesign — P0 Funnel Fix

**Date:** 2026-05-16
**Status:** Approved design — ready for implementation planning
**Scope:** P0 funnel only (public catalog + agent CRM split + click-to-call + quote modal)

## Problem

Every customer-facing "see packages" CTA points at `/packages`:

- Home hero "Explore Packages →" (`app/page.js`)
- Home "View All My Packages →" (`app/page.js`)
- Every landing page hero "View All Packages →" (`components/landing/HeroSection.js`)

But `/packages` is an **internal agent CRM** — "My Packages — Manage your saved tour
packages", with Edit / Copy / **Delete** / PDF actions, rendered `'use client'` from
`localStorage` and invisible to search engines (`app/packages/page.js`). A customer
clicking "Explore Packages":

1. Lands on an agent dashboard, and
2. Can **delete the only catalog**, because `getPackages()` seeds `localStorage` with
   `DEMO_PACKAGES` and the public mutates that same store (`lib/storage.js`).

There is **no public package catalog page**, no click-to-call anywhere, and no
lead-capture form. The funnel is broken.

## Goal

A real, SEO-friendly public package catalog with conversion-focused CTAs
(View / WhatsApp / Call) and a reusable "Get Free Quote" modal, while relocating the
agent CRM out of public reach. Benchmarked against the Yaarana Holiday reference
(`https://yaaranaholiday.com/Himachal-tour/`).

## Decisions (locked with the user)

| Decision | Choice |
| --- | --- |
| Pass scope | P0 funnel only (price block, amenity icons, reviews, dynamic `[slug]`, self-hosted images are **deferred**) |
| Lead capture | WhatsApp deep-link only — **no backend, nothing persisted** |
| Agent CRM | Relocate to `/admin`, keep `/create-package`; both hidden from public nav, robots, sitemap |
| Quote form | Approach A — reusable client **modal** |
| Catalog filters | **None** — only 4 packages (YAGNI) |
| Card design | Image-forward (consistent with existing home-page card) + a Call button |
| Call number | Existing WhatsApp number `+91 70040 15511` (`tel:+917004015511`) |
| Testing | Add Vitest; TDD the pure WhatsApp builders; UI/routing verified manually + build/lint |

## Architecture

### Route changes

| Route | Before | After |
| --- | --- | --- |
| `/packages` | Client-only agent CRM (localStorage) | **Public catalog** — server component from `data/packages.js` |
| `/admin` | — | **New** — agent CRM list (old `app/packages/page.js` content moved verbatim) |
| `/create-package` | Public-reachable, in navbar | Unchanged code; **delinked** from public nav |

### Components & files

**New:**

- `app/packages/page.js` — rewritten as a **server component** (no `'use client'`, no
  `localStorage`). Imports `DEMO_PACKAGES` directly. Page `metadata` + `ItemList`
  JSON-LD for SEO. Header band (title + trust chips + "Get Free Quote"), responsive
  grid, green bottom CTA band.
- `app/admin/page.js` — the relocated agent CRM list. Moves the old `'use client'` +
  `getPackages()` + `PackageCard` UI here verbatim.
- `components/packages/PublicPackageCard.js` — customer-facing card: image (gradient
  fallback), destination + duration overlay, title, price (`pkg.price`, omitted if
  absent), top 3 highlights, actions: **View Package** (→ `/${pkg.slug}` existing
  landing page), **WhatsApp**, **Call**. Kept separate from the agent
  `components/packages/PackageCard.js` so the two concerns don't entangle.
- `components/packages/QuoteModal.js` — `'use client'` reusable modal. Props:
  `open`, `onClose`, optional `destination` / `packageTitle` to pre-fill.
- `components/packages/QuoteButton.js` — small `'use client'` trigger that owns modal
  open state, so server pages can drop in a quote CTA without becoming client
  components. (Used by the server catalog page's header/bottom bands and per-card.)

**Modified:**

- `lib/whatsapp.js` — add pure `buildQuoteMessage({name, phone, destination, dates,
  travellers, packageTitle, message})` and `buildQuoteWhatsAppURL(...)`, plus an
  `openWhatsAppQuote(...)` wrapper. Existing exports untouched.
- `components/layout/Navbar.js` — keep "Packages" link (now the public catalog);
  **remove** the desktop + mobile "+ Create Package" buttons.
- `components/layout/Footer.js` — relabel quick link "My Packages" → "Tour Packages"
  (same `/packages` href); **remove** the "Create Package" quick link.
- `app/page.js` — relabel "View All My Packages →" to "View All Packages →" (href
  unchanged; now resolves to the public catalog).
- `app/robots.js` — add `/admin` to `disallow` (keep `/create-package`, `/api/`).
- `app/sitemap.js` — bump `/packages` to `changeFrequency: 'weekly'`,
  `priority: 0.8`; no `/admin` entry.
- `components/layout/StickyWhatsApp.js` — also return `null` on `/admin` (currently
  only `/create-package`).

### Data flow

- **Catalog:** static / SSR from `data/packages.js`. Each card's "View Package"
  links to the existing landing page via `pkg.slug` (e.g. `/manali-tour-package`) —
  **no new detail page**. Destination image/gradient resolved from `DESTINATIONS`
  via `landingSlug === pkg.slug` (same lookup the home page uses).
- **Quote modal:** the only client-interactive piece. On submit it builds a WhatsApp
  message string, URL-encodes it, and `window.open`s `wa.me/917004015511?text=…`.
  Nothing is stored.
- **Agent CRM:** unchanged behaviour — still `localStorage` via `lib/storage.js`,
  now served from `/admin`.

## Quote modal specification

**Fields:**

- **Name** — text, required
- **Phone** — tel, required
- **Destination** — `<select>`: Kashmir, Manali, Rajasthan, North East, "Not sure / Any"
- **Travel month** — native `<input type="month">` (browsers without support degrade
  to a plain text box, which is acceptable)
- **Travellers** — `<select>`: 1, 2, 3, 4, 5, 6+ (label rendered as "N traveller(s)")
- **Note** — optional free-text `<textarea>`

When opened from a card, Destination and package title are pre-filled; when opened
from the header / bottom band they default to "Not sure / Any" with no package title.

**Message format (example):**

```
🌸 Tripcart Holidays — Quote Request

👤 <name>
📞 <phone>
📍 <destination>
🗓 <month> · <travellers>
📦 <packageTitle>          (omitted if none)
📝 <note>                  (omitted if empty)

Please share the best quote & itinerary.
```

## Error handling & edge cases

- **Validation:** Name + phone required. Phone normalized (strip spaces/dashes);
  require 7–15 digits. Invalid → inline message, submit blocked. Other fields optional.
- **Popup blocker:** submit is a direct user gesture so `window.open` is normally
  allowed. If it returns `null`, show a visible "Tap here to open WhatsApp" fallback
  link with the same URL so the lead is never lost.
- **Missing data:** card uses the existing gradient fallback when a destination has
  no `cardImage`; missing `pkg.price` simply omits the price line.
- **Modal lifecycle:** body scroll-lock applied on open and **always removed** on
  unmount/close via `useEffect` cleanup. `Esc` and backdrop click close. Focus
  trapped within the modal; focus returns to the trigger on close.
- **SEO correctness:** `/admin` disallowed in robots and absent from sitemap;
  `/packages` upgraded. Verified by inspecting generated `robots.txt` / `sitemap.xml`.

## Testing

- **TDD with Vitest** (new dev dependency, single config) for the pure builders in
  `lib/whatsapp.js`:
  - required-only message shape
  - optional fields (`packageTitle`, `note`) omitted cleanly when empty
  - phone normalization (spaces/dashes stripped)
  - URL encoding correctness in `buildQuoteWhatsAppURL`
  Tests written **before** implementation.
- **Manual + build verification** for UI/routing (no component-test infra added — the
  project has none and that would be scope creep): `next build` passes, `eslint`
  clean, dev-server walkthrough (catalog renders SSR, card CTAs, modal open/validate/
  submit, `tel:` link, `/admin` reachable, `/packages` public, `/create-package`
  delinked), robots/sitemap output inspected.

## Framework note

`AGENTS.md` warns this Next.js (16.2.4) deviates from training data. Before writing
code, read the relevant guides in `node_modules/next/dist/docs/` (app-router,
server vs client components, `metadata`, route files) rather than assume APIs.

## Out of scope (explicitly deferred)

Landing-page price block, amenity-icon strip, testimonials/reviews section, dynamic
`app/[slug]` route consolidation, self-hosting hero images, `aggregateRating` JSON-LD
cleanup. These are P1/P2 and tracked separately.
