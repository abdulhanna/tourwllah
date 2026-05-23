export default function Breadcrumb({ items, variant = 'default' }) {
  const onDark = variant === 'onDark'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: `https://tripcartholidays.com${item.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center gap-1 text-sm flex-wrap ${
          onDark ? 'text-white/80' : 'text-slate-500'
        }`}
      >
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-1">
            {idx > 0 && (
              <span className={onDark ? 'text-white/50' : 'text-slate-400'} aria-hidden="true">
                /
              </span>
            )}
            {idx === items.length - 1 ? (
              <span className={onDark ? 'text-white font-medium' : 'text-slate-700 font-medium'}>
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className={
                  onDark
                    ? 'text-white/85 hover:text-white transition-colors underline-offset-2 hover:underline'
                    : 'hover:text-brand transition-colors'
                }
              >
                {item.label}
              </a>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
