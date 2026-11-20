'use client'
import { useEffect, useRef, useState } from 'react'
import { display, mono } from './shared'
import { logoFor } from './clientLogos'

// Client reviews as a slideshow: auto-advances, pauses on hover/focus, arrows + dots,
// left/right keys and swipe. Slides share one grid cell so the box keeps the height of the
// tallest review and nothing jumps when the slide changes.
const AUTO_MS = 7000

function Chevron({ dir }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'left' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'} />
    </svg>
  )
}

export default function QuoteSlider({ quotes }) {
  const list = (quotes || []).filter(q => q && q.quote)
  const n = list.length
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef(null)
  const go = d => setI(v => (v + d + n) % n)

  // `i` is a dependency so a manual change restarts the countdown.
  useEffect(() => {
    if (n < 2 || paused) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI(v => (v + 1) % n), AUTO_MS)
    return () => clearInterval(t)
  }, [n, paused, i])

  if (!n) return <div />

  const onTouchEnd = e => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={e => { if (e.key === 'ArrowLeft') go(-1); else if (e.key === 'ArrowRight') go(1) }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={onTouchEnd}
    >
      <div style={{ ...mono, fontSize: '12px', fontWeight: 600, color: 'var(--orange)', marginBottom: '18px' }}>Client reviews</div>

      <div className="cs-slides" aria-live={paused ? 'polite' : 'off'}>
        {list.map((q, k) => {
          const initials = (q.client_name || '').split(' ').map(w => w[0]).slice(0, 2).join('')
          const stars = Math.max(0, Math.min(5, Math.round(q.rating || 0)))
          const logo = logoFor(q.company)
          // Fit the logo into a 64px-high tile: tall marks (badges) stay narrow, wide wordmarks cap at 176px.
          const lh = logo ? Math.min(44, Math.round((176 * logo.h) / logo.w)) : 0
          return (
            <figure key={q.id ?? k} className={'cs-slide' + (k === i ? ' on' : '')} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}`} aria-hidden={k !== i} style={{ margin: 0 }}>
              {stars > 0 && (
                <div aria-label={`${stars} out of 5`} style={{ color: 'var(--orange)', fontSize: '17px', letterSpacing: '3px', marginBottom: '14px' }}>
                  {'★'.repeat(stars)}<span style={{ color: 'var(--border2)' }}>{'★'.repeat(5 - stars)}</span>
                </div>
              )}
              <blockquote style={{ ...display, fontSize: 'clamp(20px,2vw,24px)', fontWeight: 500, lineHeight: 1.45, margin: '0 0 26px', color: 'var(--text)' }}>
                “{q.quote.replace(/\s*\n\s*/g, ' ')}”
              </blockquote>
              <figcaption style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {logo ? (
                  <span className="cs-logo-tile">
                    <img src={logo.src} alt={logo.alt} width={logo.w} height={logo.h} loading="lazy" decoding="async" style={{ height: `${lh}px`, width: 'auto', maxWidth: '176px', display: 'block' }} />
                  </span>
                ) : (
                  <span style={{ width: '54px', height: '54px', flexShrink: 0, borderRadius: '50%', background: 'var(--bg4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--text2)', fontSize: '16px' }}>{initials}</span>
                )}
                <span>
                  <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text)' }}>{q.client_name}</strong>
                  <span style={{ fontSize: '14px', color: 'var(--text2)' }}>{[q.role, q.company].filter(Boolean).join(', ')}</span>
                </span>
              </figcaption>
            </figure>
          )
        })}
      </div>

      {n > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}>
          <button type="button" className="cs-arrow" onClick={() => go(-1)} aria-label="Previous review"><Chevron dir="left" /></button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {list.map((q, k) => (
              <button key={q.id ?? k} type="button" className="cs-dot" onClick={() => setI(k)} aria-label={`Show review ${k + 1} of ${n}`} aria-current={k === i ? 'true' : undefined}>
                <span className={k === i ? 'on' : undefined} />
              </button>
            ))}
          </div>
          <button type="button" className="cs-arrow" onClick={() => go(1)} aria-label="Next review"><Chevron dir="right" /></button>
          <span style={{ ...mono, fontSize: '12px', color: 'var(--text3)', marginLeft: '6px' }}>{i + 1} / {n}</span>
        </div>
      )}
    </div>
  )
}
