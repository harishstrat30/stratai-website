'use client'
import Link from 'next/link'

// CLA-146: Services 4-grid + Engagement Model 3-step teaser
const SERVICES_4 = [
  { icon: '🗺', title: 'AI Strategy Consulting',       desc: 'Identify where AI creates competitive advantage in your business' },
  { icon: '⚙️', title: 'AI Systems Architecture',      desc: 'Design the full system before a single line of code is written' },
  { icon: '🔧', title: 'Industrial AI Services & Technical Configuration',   desc: 'Build, configure, and integrate AI into your existing stack' },
  { icon: '🚀', title: 'AI Implementation & Ongoing Optimization',             desc: 'Deploy, adopt, and measure — until it shows in your P&L' },
]

export default function EngagementTeaser() {
  return (
    <>
      {/* ── Services 4-grid ── */}
      <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '8px' }}>HOW WE WORK</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1.05 }}>
                Four Services. One Outcome.
              </h2>
            </div>
            <Link href="/services" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--orange)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              → View All Services
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)' }} className="services-4-grid">
            {SERVICES_4.map((svc, i) => (
              <Link key={svc.title} href="/services"
                style={{ display: 'block', background: 'var(--bg)', padding: '32px 28px', textDecoration: 'none', color: 'inherit', position: 'relative', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}>
                {i === 0 && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--orange)' }} />}
                <div style={{ fontSize: '24px', marginBottom: '14px' }}>{svc.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '10px', lineHeight: 1.3 }}>
                  {svc.title}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.6 }}>{svc.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement Model 3-step teaser ── */}
      <section style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '8px' }}>THE JOURNEY</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1.05 }}>
                How We Engage
              </h2>
            </div>
            <Link href="/engagement-model" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--orange)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              → How We Work
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }} className="engagement-3-grid">
            {[
              { step: '01', label: 'Free AI Audit',      desc: 'Half a day. No fee. No commitment. 3–5 AI use cases ranked by P&L impact.' },
              { step: '02', label: '1-Month Deep Dive',         desc: 'Paid engagement. We go into the business — processes, data, systems, people. Findings presented to management.' },
              { step: '03', label: 'Long-Term Build & Retainer', desc: 'We design, build, integrate, and measure until the outcome shows in your P&L. AI advantage is built over time, not a sprint.' },
            ].map((s, i) => (
              <div key={s.step} style={{ background: 'var(--bg)', padding: '36px 32px', position: 'relative' }}>
                {i === 0 && <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--orange)' }} />}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 700, color: i === 0 ? 'var(--orange)' : 'var(--text3)', marginBottom: '14px', letterSpacing: '-0.02em' }}>
                  {s.step}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '10px', letterSpacing: '-0.02em' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Link href="/contact" style={{ display: 'inline-flex', padding: '12px 28px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
              → Book Your Free Half-Day Audit
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
