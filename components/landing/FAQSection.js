'use client'

import { useState } from 'react'

export default function FAQSection({ faqs, pageTitle }) {
  const [openIdx, setOpenIdx] = useState(null)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <section className="py-16 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Frequently Asked Questions
          </h2>
          {pageTitle && (
            <p className="text-slate-500">Common questions about {pageTitle}</p>
          )}
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl overflow-hidden hover:border-brand/30 transition-colors"
            >
              <button
                className="w-full flex items-start justify-between gap-4 p-5 text-left cursor-pointer"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
              >
                <h3 className="font-semibold text-slate-900 text-base leading-snug">{faq.q}</h3>
                <svg
                  className={`flex-shrink-0 w-5 h-5 text-brand transition-transform mt-0.5 ${openIdx === idx ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 pt-0">
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
