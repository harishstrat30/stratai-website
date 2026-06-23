'use client'
import Link from 'next/link'

// CLA-145: Core Contrast Block + 5 AI Advantage Systems strip
const SYSTEMS = [
  { abbr: 'QAS', name: 'Quality Advantage System',     desc: 'Reduce rejection rates, protect margins', anchor: '#qas' },
  { abbr: 'TAS', name: 'Throughput Advantage System',  desc: 'Increase output without proportional cost', anchor: '#tas' },
  { abbr: 'DAS', name: 'Delivery Advantage System',    desc: 'Reduce delays, improve on-time delivery', anchor: '#das' },
  { abbr: 'RAS', name: 'Revenue Advantage System',     desc: 'Increase leads, conversions, revenue', anchor: '#ras' },
  { abbr: 'PAS', name: 'Procurement Advantage System', desc: 'Reduce purchase cost, improve sourcing', anchor: '#pas' },
]

export default function ContrastBlock() {
  return (
    <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>

      {/* ── Contrast: Most AI Consulting vs StratAI ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,24px) clamp(36px,6vw,72px)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '14px' }}>
          THE DIFFERENCE
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--text)', marginBottom: '48px' }}>
          Most AI consulting ends at delivery.<br />We begin there.
        </h2>

        <div className="contrast-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)' }}>
          {/* Left: Most AI Consulting */}
          <div style={{ background: 'var(--bg2)', padding: '40px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text3)', marginBottom: '24px' }}>
              MOST AI CONSULTING
            </div>
            {[
              'Experiments and pilots',
              'Measured in activities delivered',
              'Project-based, ends on delivery',
              'Advice without accountability',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                <span style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: '13px', marginTop: '1px', flexShrink: 0 }}>✗</span>
                <span style={{ fontSize: '15px', color: 'var(--text2)', lineHeight: '1.5' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Right: StratAI */}
          <div style={{ background: 'var(--bg)', padding: '40px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--orange)' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--orange)', marginBottom: '24px' }}>
              STRATAI ADVANTAGE SYSTEMS
            </div>
            {[
              'AI Advantage Systems with defined outcomes',
              'Measured in P&L impact',
              'Long-term retainer — we stay until it works',
              'Design + Build + Implement',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                <span style={{ color: 'var(--ok)', fontFamily: 'var(--font-mono)', fontSize: '13px', marginTop: '1px', flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: '15px', color: 'var(--text)', lineHeight: '1.5', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5 AI Advantage Systems strip ── */}
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(32px,5vw,64px) clamp(16px,4vw,24px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '8px' }}>THE FIVE SYSTEMS</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1.05 }}>
                AI Advantage Systems
              </h2>
            </div>
            <Link href="/advantage-systems" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--orange)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              → Explore All Advantage Systems
            </Link>
          </div>

          <div className="systems-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1px', background: 'var(--border)' }}>
            {SYSTEMS.map((sys) => (
              <Link key={sys.abbr} href={`/advantage-systems${sys.anchor}`}
                style={{ display: 'block', background: 'var(--bg)', padding: '28px 24px', textDecoration: 'none', color: 'inherit', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 700, color: 'var(--orange)', marginBottom: '10px', letterSpacing: '-0.02em' }}>
                  {sys.abbr}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px', lineHeight: 1.3 }}>
                  {sys.name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', lineHeight: 1.5 }}>
                  {sys.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Signature line ── */}
      <div style={{ borderTop: '1px solid var(--border)', padding: 'clamp(20px,4vw,32px) 24px', background: 'var(--bg)', textAlign: 'center' }}>
        <p className="contrast-signature" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,3vw,28px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text2)', fontStyle: 'italic' }}>
          &ldquo;If AI isn&apos;t in your P&amp;L, it isn&apos;t real.&rdquo;
        </p>
      </div>
    </section>
  )
}
