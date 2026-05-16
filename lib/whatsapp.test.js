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
