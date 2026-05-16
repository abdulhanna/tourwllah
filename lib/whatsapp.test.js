import { describe, it, expect } from 'vitest'
import { buildQuoteMessage, isValidPhone, buildQuoteWhatsAppURL } from './whatsapp.js'

describe('buildQuoteMessage', () => {
  it('includes required fields and closing line, omits optional lines', () => {
    const msg = buildQuoteMessage({ name: 'Rahul', phone: '+91 98765 43210' })
    expect(msg).toContain('🌸 Tripcart Holidays — Quote Request')
    expect(msg).toContain('👤 Rahul')
    expect(msg).toContain('📞 +91 98765 43210')
    expect(msg).toContain('Please share the best quote & itinerary.')
    expect(msg).not.toContain('📍')
    expect(msg).not.toContain('🗓')
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

describe('buildQuoteWhatsAppURL', () => {
  it('targets the business number and round-trips the message', () => {
    const data = { name: 'A & B', phone: '1234567' }
    const url = buildQuoteWhatsAppURL(data)
    expect(url.startsWith('https://wa.me/917004015511?text=')).toBe(true)
    const text = decodeURIComponent(url.split('?text=')[1])
    expect(text).toBe(buildQuoteMessage(data))
  })
})
