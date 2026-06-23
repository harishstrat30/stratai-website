'use client'
import { useEffect, useRef, useState } from 'react'

function CountUp({ target, suffix }) {
  const [val, setVal] = useState(0)
  const ref     = useRef()
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true; obs.disconnect()
      const duration = 2200, fps = 60, totalFrames = Math.round(duration / (1000 / fps))
      let frame = 0
      const timer = setInterval(() => {
        frame++
        const progress = 1 - Math.pow(1 - frame / totalFrames, 3)
        setVal(Math.floor(progress * target))
        if (frame >= totalFrames) { setVal(target); clearInterval(timer) }
      }, 1000 / fps)
    }, { threshold: 0.25 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{val >= 1000 ? val.toLocaleString('en-IN') : val}{suffix}</span>
}

// CLA-148: Updated fallback numbers
const FALLBACK = [
  { value: 12,     suffix: '+', label: 'RETAINER CLIENTS',    sub: 'Long-term AI Advantage builds' },
  { value: 12,     suffix: '+', label: 'AI USE CASES DEPLOYED', sub: 'Running in production' },
  { value: 90,     suffix: '%+', label: 'CLIENT RETENTION',   sub: 'Proof of domain-first delivery' },
  { value: 100000, suffix: '+', label: 'EMAILS ANALYSED',     sub: 'Precot Intelligence Programme' },
]

export default function StatsSection({ stats = [] }) {
  const items = (Array.isArray(stats) && stats.length > 0) ? stats : FALLBACK
  return (
    <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="stats-grid" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: '1px', background: 'var(--border)' }}>
        {items.map((s, i) => (
          <div key={i} style={{ background: 'var(--bg)', padding: 'clamp(28px,4vw,48px) clamp(16px,3vw,28px) clamp(24px,4vw,40px)', position: 'relative' }}>
            {i === 0 && <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--orange)' }} />}
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,72px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text)', marginBottom: '12px' }}>
              <CountUp target={Number(s.value) || 0} suffix={s.suffix || ''} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: '5px', lineHeight: 1.4 }}>{s.label}</div>
            {s.sub && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.03em', lineHeight: 1.4 }}>{s.sub}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
