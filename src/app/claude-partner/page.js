import Link from 'next/link'

export const metadata = {
  title: { absolute: 'Anthropic Claude Partner — AI Consulting Services for Manufacturing | StratAI™' },
  description: 'StratAI is an official Anthropic Claude Partner Network member, delivering Claude-based AI consulting services and implementation for mid-market manufacturing companies in India.',
  alternates: { canonical: 'https://stratai.io/claude-partner' },
  keywords: [
    'ai consulting services', 'ai implementation partner', 'manufacturer ai partner',
    'ai integration for manufacturers', 'ai managed services manufacturing',
    'anthropic claude partner india', 'claude AI manufacturing india',
  ],
  openGraph: {
    title: 'Anthropic Claude Partner — AI Consulting Services for Manufacturing | StratAI™',
    description: 'StratAI is an official Anthropic Claude Partner Network member, delivering Claude-based AI consulting services and implementation for mid-market manufacturing companies in India.',
    url: 'https://stratai.io/claude-partner',
  },
}

const REQUIREMENTS = [
  { num: '01', label: '10+ Certified Practitioners', desc: 'All active Anthropic Claude certifications through the Partner Academy' },
  { num: '02', label: '2+ Production Deployments Active', desc: 'Live AI systems running in client operations — not pilots or prototypes' },
  { num: '03', label: 'Client-Endorsed Outcomes', desc: 'Publicly verifiable client outcomes — measurable results in the P&L' },
]

const DEPLOYMENTS = [
  {
    client: 'PRECOT LIMITED',
    sector: 'Textile / Cotton Spinning · ₹900 Crore Revenue · Listed',
    systems: [
      'AI-powered email intelligence across 1L+ emails',
      'Procurement AI — ₹1 Crore annual saving identified',
      'ARIA/RIYA SAP HANA chatbot across 17 SAP modules',
    ],
  },
  {
    client: 'LAKSHMI KRISHNA NATURALS',
    sector: 'D2C Personal Care Manufacturing · $5M Revenue',
    systems: [
      'MIRA — marketplace intelligence agent via Amazon Ads API',
      'Cross-channel analytics (Shopify, Meta Ads, GA4)',
      'AI-driven attribution and campaign intelligence',
    ],
  },
]

const CREDENTIAL = [
  {
    title: 'Certified Expertise — Not Just Familiarity',
    desc: 'Select status requires a minimum of 10 Anthropic-certified practitioners. When we build Claude-based AI systems for manufacturing, we build them the way Anthropic trains its partners — reliably, safely, and measurably.',
  },
  {
    title: 'Production-Proven — Not Prototype-Tested',
    desc: 'Both qualifying deployments are live, in use by real teams, and connected to real operational outcomes. We do not count pilots. Neither does Anthropic.',
  },
  {
    title: 'Client-Endorsed — Not Self-Certified',
    desc: 'Our engagements are verified by the clients who commissioned them. This separates firms who have built Claude systems from firms who have only sold them.',
  },
  {
    title: 'Anthropic Partnership — Not Just API Access',
    desc: 'The Claude Partner Network launched March 2026. Anthropic selected approximately 100 companies worldwide — including Accenture, Cognizant, and Deloitte. StratAI is among that first cohort, and one of the first Registered Partners in India focused exclusively on manufacturing AI.',
  },
]

export default function ClaudePartnerPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background: 'var(--bg-dark)', padding: 'clamp(56px,7vw,96px) clamp(16px,4vw,24px) clamp(48px,6vw,80px)', borderBottom: '1px solid #1f1f1e', position: 'relative', overflow: 'hidden' }}>
        <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.10 }} />
        <div style={{ position: 'absolute', top: '40%', left: '30%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(255,85,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '7px 18px', borderRadius: '9999px', border: '1px solid rgba(255,85,0,0.45)', background: 'rgba(255,85,0,0.10)', marginBottom: '32px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#FF5500">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.12em', fontWeight: 700 }}>
              ANTHROPIC CLAUDE PARTNER NETWORK — SELECT TIER
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,84px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff', marginBottom: '24px', maxWidth: '900px' }}>
            STRATAI — ANTHROPIC{' '}
            <span style={{ color: 'var(--orange)' }}>CLAUDE PARTNER NETWORK MEMBER.</span>
          </h1>

          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', maxWidth: '600px', lineHeight: '1.7', marginBottom: '36px' }}>
            StratAI is an official Anthropic Claude Partner Network member, delivering Claude-based AI consulting services and implementation for mid-market manufacturing companies in India — focused exclusively on manufacturing AI.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ padding: '12px 28px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
              → Book Your Free Half-Day Audit
            </Link>
            <a href="https://www.anthropic.com/news/services-track-partner-hub" target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.18)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
              About the Claude Partner Network →
            </a>
          </div>
        </div>
      </div>

      {/* ── SELECT Tier Requirements ── */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>PARTNER CRITERIA MET</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,48px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '40px', lineHeight: 1.05 }}>
            What SELECT tier means.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }} className="about-3-grid">
            {REQUIREMENTS.map((r, i) => (
              <div key={r.num} style={{ background: 'var(--bg2)', padding: 'clamp(24px,4vw,40px)', borderLeft: i === 0 ? '3px solid var(--orange)' : 'none', position: 'relative' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text3)', marginBottom: '16px' }}>{r.num}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,2vw,20px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '10px', lineHeight: 1.2 }}>{r.label}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.7', margin: '0 0 16px' }}>{r.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--ok)', fontSize: '12px' }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--ok)', letterSpacing: '0.08em' }}>MET</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Qualifying Deployments ── */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>QUALIFYING DEPLOYMENTS</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,48px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '40px', lineHeight: 1.05 }}>
            Live in production. Not in a deck.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)' }} className="contrast-grid">
            {DEPLOYMENTS.map((dep) => (
              <div key={dep.client} style={{ background: 'var(--bg)', padding: 'clamp(24px,4vw,40px)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--orange)' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '0.08em', marginBottom: '6px' }}>{dep.client}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', marginBottom: '20px' }}>{dep.sector}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {dep.systems.map((s, j) => (
                    <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--orange)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: '11px', marginTop: '2px' }}>→</span>
                      <span style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.6 }}>{s}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ok)', display: 'inline-block' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--ok)', letterSpacing: '0.1em' }}>PRODUCTION</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Four things the credential proves ── */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>WHY IT MATTERS</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,48px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '40px', lineHeight: 1.05 }}>
            Four things the credential proves.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border)' }}>
            {CREDENTIAL.map((item, i) => (
              <div key={i} style={{ background: 'var(--bg)', padding: 'clamp(24px,4vw,40px)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,2vw,19px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '12px', lineHeight: 1.3 }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.75', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,24px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>THE NEXT STEP</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.1 }}>
            Work with India's first specialist Claude partner for manufacturing.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text2)', marginBottom: '32px', lineHeight: 1.7 }}>
            Start with a free half-day audit. We identify 3–5 high-value AI use cases specific to your manufacturing business — no fee, no commitment.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ padding: '12px 28px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
              → Book Your Free Half-Day Audit
            </Link>
            <Link href="/advantage-systems" style={{ padding: '12px 24px', borderRadius: '9999px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text2)', textDecoration: 'none' }}>
              Our AI Advantage Systems →
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
