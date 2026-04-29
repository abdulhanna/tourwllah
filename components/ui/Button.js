'use client'

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark shadow-sm',
  secondary: 'border-2 border-brand text-brand hover:bg-brand hover:text-white',
  whatsapp: 'bg-green-500 text-white hover:bg-green-600 shadow-sm',
  ghost: 'text-brand hover:bg-teal-50',
  accent: 'bg-accent text-white hover:bg-amber-700 shadow-sm',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  disabled = false,
  type = 'button',
  target,
  rel,
}) {
  const base = 'inline-flex items-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/50 cursor-pointer'
  const classes = `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
