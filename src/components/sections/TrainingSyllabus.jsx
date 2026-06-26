'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function TrainingSyllabus({ modules }) {
  const [active, setActive] = useState(0)
  const mod = modules[active]

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', background: 'var(--bg)' }}>
      {/* Tab row */}
      <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        {modules.map((m, i) => {
          const isActive = i === active
          return (
            <button key={i} onClick={() => setActive(i)}
              style={{
                flexShrink: 0, padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '11px',
                fontWeight: isActive ? 700 : 500, letterSpacing: '0.06em', cursor: 'pointer',
                background: isActive ? 'var(--bg)' : 'transparent', border: 'none',
                borderRight: i < modules.length - 1 ? '1px solid var(--border)' : 'none',
                borderBottom: isActive ? '2px solid var(--orange)' : '2px solid transparent',
                color: isActive ? 'var(--orange)' : 'var(--text3)',
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}>
              {m.tab}
            </button>
          )
        })}
      </div>

      {/* Content panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="contrast-grid">
        {/* Left */}
        <div style={{ padding: 'clamp(24px,4vw,40px)', borderRight: '1px solid var(--border)' }}>
          {mod.badge && (
            <div style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--orange)', border: '1px solid rgba(255,85,0,0.35)', borderRadius: '9999px', padding: '4px 12px', marginBottom: '16px', letterSpacing: '0.06em' }}>
              {mod.badge}
            </div>
          )}
          {mod.duration && !mod.badge && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', border: '1px solid var(--border)', borderRadius: '9999px', display: 'inline-block', padding: '3px 10px', marginBottom: '16px' }}>
              {mod.duration}
            </div>
          )}
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '12px', lineHeight: 1.2 }}>
            {mod.title}
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.7', marginBottom: '24px' }}>{mod.desc}</p>

          {/* Points */}
          {mod.points[0]?.num ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {mod.points.map((p, i) => (
                <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--rs)', padding: '12px 14px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', fontWeight: 700, marginBottom: '4px' }}>{p.num}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>{p.title}</div>
                  {p.sub && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>{p.sub}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {mod.points.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--orange)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: '11px', marginTop: '2px' }}>→</span>
                  <span style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.6' }}>{p.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — outcome */}
        <div style={{ padding: 'clamp(24px,4vw,40px)', background: 'var(--bg2)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: '16px' }}>WHAT YOUR TEAM LEAVES WITH</div>
          <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: '1.75', fontWeight: 500, marginBottom: '24px' }}>{mod.outcome}</p>
          {mod.cta && (
            <Link href="/contact" style={{ display: 'inline-flex', padding: '11px 24px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
              Tell us your industry →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
