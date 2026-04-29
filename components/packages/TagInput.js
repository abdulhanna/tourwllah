'use client'

import { useState } from 'react'

export default function TagInput({ tags, onChange, placeholder, color = 'teal' }) {
  const [input, setInput] = useState('')

  const colorMap = {
    teal: 'bg-teal-100 text-teal-800',
    red: 'bg-red-100 text-red-800',
    amber: 'bg-amber-100 text-amber-800',
  }

  const addTag = () => {
    const val = input.trim()
    if (val && !tags.includes(val)) {
      onChange([...tags, val])
    }
    setInput('')
  }

  const removeTag = (tag) => onChange(tags.filter(t => t !== tag))

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
    if (e.key === 'Backspace' && !input && tags.length) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border border-slate-200 rounded-lg min-h-[44px] focus-within:ring-2 focus-within:ring-brand/30 focus-within:border-brand bg-white">
      {tags.map((tag, i) => (
        <span key={i} className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${colorMap[color] || colorMap.teal}`}>
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="hover:opacity-70 cursor-pointer"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKey}
        onBlur={addTag}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] text-sm outline-none bg-transparent"
      />
    </div>
  )
}
