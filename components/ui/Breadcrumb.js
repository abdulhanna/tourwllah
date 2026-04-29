export default function Breadcrumb({ items }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: `https://himalayanholidays.in${item.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-slate-500">
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-1">
            {idx > 0 && <span className="text-slate-400">/</span>}
            {idx === items.length - 1 ? (
              <span className="text-slate-700 font-medium">{item.label}</span>
            ) : (
              <a href={item.href} className="hover:text-brand transition-colors">
                {item.label}
              </a>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
