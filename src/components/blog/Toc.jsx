'use client'
import { useEffect, useState } from 'react'

// "On this page" list. The section that is currently near the top of the screen gets highlighted.
export default function Toc({ items }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const els = items.map(i => document.getElementById(i.id)).filter(Boolean)
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(entries => {
      const seen = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (seen[0]) setActive(seen[0].target.id)
    }, { rootMargin: '-90px 0px -65% 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav className="bt-toc" aria-label="On this page">
      <p className="bt-toc-h">On this page</p>
      <ul>
        {items.map(i => (
          <li key={i.id}><a href={`#${i.id}`} className={i.id === active ? 'on' : undefined} aria-current={i.id === active ? 'true' : undefined}>{i.label}</a></li>
        ))}
      </ul>
    </nav>
  )
}
