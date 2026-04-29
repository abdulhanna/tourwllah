const variants = {
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-800',
  teal: 'bg-teal-100 text-teal-800',
  amber: 'bg-amber-100 text-amber-800',
  gray: 'bg-slate-100 text-slate-700',
  blue: 'bg-blue-100 text-blue-800',
}

export default function Badge({ children, variant = 'teal', className = '' }) {
  return (
    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${variants[variant] || variants.teal} ${className}`}>
      {children}
    </span>
  )
}
