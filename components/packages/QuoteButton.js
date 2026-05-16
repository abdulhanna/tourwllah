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
