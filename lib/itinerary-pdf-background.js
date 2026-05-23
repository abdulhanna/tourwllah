import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

let cachedDataUri = null

/**
 * Load itinerary PDF background from disk as a data URI (works offline in Puppeteer).
 */
export function getItineraryBackgroundDataUri() {
  if (cachedDataUri) return cachedDataUri

  const candidates = [
    join(process.cwd(), 'public', 'background-itinerary.jpg'),
    join(process.cwd(), 'public', 'home_banner.png'),
  ]

  const path = candidates.find(p => existsSync(p))
  if (!path) {
    console.warn('itinerary-pdf: no background image found in public/')
    return null
  }

  const ext = path.endsWith('.png') ? 'png' : 'jpeg'
  const buf = readFileSync(path)
  cachedDataUri = `data:image/${ext};base64,${buf.toString('base64')}`
  return cachedDataUri
}
