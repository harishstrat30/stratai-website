'use client'

const FALLBACK = ['TECHNO TACKLE','KOVAI PAZHAMUDHIR NILAYAM','LAKSHMI KRISHNA NATURALS','SYMPHONY FURNISHINGS','STEP8UP ACADEMY','PRECOT LIMITED','GOSUPER EDTECH','AISHWARYAM OILS']

export default function ClientMarquee({ clients = [] }) {
  const names = clients.length > 0 ? clients.map(c => (c.name||c).toUpperCase()) : FALLBACK
  const tripled = [...names, ...names, ...names]

  return (
    <div style={{ background: 'var(--bg-dark)', overflow: 'hidden', padding: '14px 0', borderTop: '1px solid #222', borderBottom: '1px solid #222', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, var(--bg-dark), transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div className="marquee-track" style={{ width: 'max-content' }}>
        {tripled.map((name, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap', padding: '0 24px' }}>{name}</span>
            <span style={{ color: 'rgba(255,85,0,0.5)', fontSize: '9px', flexShrink: 0 }}>◆</span>
          </span>
        ))}
      </div>
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, var(--bg-dark), transparent)', zIndex: 2, pointerEvents: 'none' }} />
    </div>
  )
}
