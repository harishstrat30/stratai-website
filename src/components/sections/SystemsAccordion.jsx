'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SystemsAccordion({ systems }) {
  const [active, setActive] = useState(systems[0].id)

  useEffect(() => {
    const ids = systems.map(s => s.id)
    const openFromHash = (hash) => {
      const id = (hash || '').replace('#', '').toLowerCase()
      if (!ids.includes(id)) return
      setActive(id)
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }))
    }
    openFromHash(window.location.hash)
    const onHashChange = () => openFromHash(window.location.hash)
    // Next.js same-page <Link href="#x"> uses pushState, which fires no hashchange event
    const onClick = (e) => {
      const a = e.target.closest?.('a[href*="#"]')
      if (!a || a.pathname !== window.location.pathname) return
      openFromHash(a.hash)
    }
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onHashChange)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onHashChange)
      document.removeEventListener('click', onClick)
    }
  }, [systems])

  const select = (id) => {
    setActive(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', marginBottom: '64px' }}>
      {/* Tab row */}
      <div role="tablist" aria-label="AI Advantage Systems" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderBottom: '1px solid var(--border)' }}>
        {systems.map((s, i) => {
          const isActive = s.id === active
          return (
            <button
              key={s.id}
              id={s.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${s.id}-panel`}
              onClick={() => select(s.id)}
              style={{
                display: 'block', width: '100%', padding: '20px 16px', textAlign: 'left',
                background: isActive ? 'var(--bg)' : 'var(--bg2)',
                borderRight: i < 4 ? '1px solid var(--border)' : 'none',
                borderBottom: isActive ? '2px solid var(--orange)' : '2px solid transparent',
                border: 'none', borderRight: i < 4 ? '1px solid var(--border)' : 'none',
                borderBottom: isActive ? '2px solid var(--orange)' : '2px solid transparent',
                cursor: 'pointer', transition: 'background 0.15s', scrollMarginTop: '96px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: 'var(--orange)', marginBottom: '6px' }}>{s.abbr}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{s.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: 1.4 }}>{s.tabDesc}</div>
            </button>
          )
        })}
      </div>

      {/* Content panels: all five are in the HTML so crawlers see every system */}
      {systems.map(sys => (
      <section
        key={sys.id}
        id={`${sys.id}-panel`}
        role="tabpanel"
        aria-labelledby={sys.id}
        hidden={sys.id !== active}
        style={{ display: sys.id === active ? 'grid' : 'none', gridTemplateColumns: '1fr 1fr' }}
      >
        {/* Left */}
        <div style={{ padding: '36px 40px', borderRight: '1px solid var(--orange)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: '14px' }}>
            {sys.abbr} — {sys.name.toUpperCase()} ({sys.abbr})
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.2, marginBottom: '16px' }}>
            {sys.heading}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.7', marginBottom: '24px' }}>{sys.purpose}</p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text3)', marginBottom: '12px' }}>WHAT WE BUILD</div>
          {sys.detail.map((d, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <span style={{ color: 'var(--orange)', flexShrink: 0 }}>→</span>
              <span style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.6' }}>{d}</span>
            </div>
          ))}
        </div>

        {/* Right: P&L */}
        <div style={{ padding: '36px 40px', background: 'var(--bg2)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: '20px' }}>P&L OUTCOME</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.2, marginBottom: '20px', whiteSpace: 'pre-line' }}>
            {sys.plOutcome}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.7', marginBottom: '28px' }}>{sys.plSub}</p>
          <Link href="/contact" style={{ display: 'inline-flex', padding: '12px 28px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
            Get Started →
          </Link>
        </div>
      </section>
      ))}
    </div>
  )
}
