'use client'
// CLA-147: Clientele section with 12 clients
const CLIENTS = [
  { name: 'Precot',                   type: 'Textile Spinning & Cotton Value Added Manufacturing',   detail: 'Listed company · 800+ Cr revenue' },
  { name: 'Compass Tex',              type: 'Textile Manufacturing',                                 detail: 'German buying house · 25 contract factories across Bangladesh, Turkey, Tirupur' },
  { name: 'Lakshmi Krishna Naturals', type: 'D2C + Personal Care Manufacturing',                     detail: '$5M annual revenue' },
  { name: 'Symphony',                 type: 'Furnishings Retail & Manufacturing',                    detail: 'Market leader in Tamil Nadu' },
  { name: 'Padma Raj Jewellers',      type: 'Gold Manufacturing',                                    detail: 'Supplies GRT, Thangamayil, Joyalukkas' },
  { name: 'B-Arm',                    type: 'Consumer Medical Devices',                              detail: 'Series A funded · Hyper-growth' },
  { name: 'Aishwaryam Oils',          type: 'D2C + Cold-Pressed Oil Manufacturing',                  detail: 'Native food products' },
  { name: 'Kovi Palamudur Nilayam',   type: 'F&V Retail',                                            detail: '200+ stores across South India' },
  { name: 'Step8Up',                  type: 'Skills Bootcamp Training',                              detail: 'UK' },
  { name: 'Techno Tackle',            type: 'IT Services',                                           detail: '100+ members · 95% employee retention' },
  { name: 'Car Pluz',                 type: 'Car Accessories & Service',                             detail: 'Erode' },
  { name: 'Vazhikatti Mental Health', type: 'Healthcare',                                            detail: 'Leader in mental health · Tamil Nadu' },
]

export default function ClienteleSection() {
  return (
    <section style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '12px' }}>
          CLIENTELE
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: '12px', lineHeight: 1.05 }}>
          Companies we build for.
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text2)', marginBottom: '48px', maxWidth: '480px', lineHeight: 1.7 }}>
          Mid-market manufacturers and growth-stage businesses across India and globally.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1px', background: 'var(--border)' }}>
          {CLIENTS.map(client => (
            <div key={client.name} style={{ background: 'var(--bg)', padding: '24px', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '6px' }}>
                {client.name}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.06em', marginBottom: '4px', lineHeight: 1.4 }}>
                {client.type}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', lineHeight: 1.5 }}>
                {client.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
