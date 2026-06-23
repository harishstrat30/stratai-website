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
    images: [{ url: '/stratai-logo.png', width: 500, height: 500, alt: 'StratAI — Anthropic Claude Partner Network Member' }],
  },
}

const REQUIREMENTS = [
  { num: '01', label: 'Committed to 10+ Certified Practitioners', desc: 'All active Anthropic Claude certifications through the Anthropic Partner Academy', met: true },
  { num: '02', label: '2+ Production Deployments Active',  desc: 'Live AI systems running in production for client businesses — not pilots or prototypes', met: true },
  { num: '03', label: 'Client-Endorsed Outcomes',   desc: 'Publicly verifiable client outcomes — measurable results in the P&L', met: true },
]

const DEPLOYMENTS = [
  {
    client: 'Precot Limited',
    sector: 'Textile / Cotton Spinning · ₹900 Crore Revenue · Listed',
    systems: ['AI-powered email intelligence across 1L+ emails', 'Procurement AI — ₹1 Crore annual saving identified', '9 use cases identified · 7 approved and in build', 'ARIA/RIYA SAP HANA chatbot across 17 SAP modules'],
    tag: 'Production',
  },
  {
    client: 'Lakshmi Krishna Naturals (LKN)',
    sector: 'D2C Personal Care Manufacturing · $5M Revenue',
    systems: ['MIRA — marketplace intelligence agent via Amazon Ads API', 'Cross-channel analytics (Shopify, Meta Ads, GA4)', 'AI-driven attribution and campaign intelligence'],
    tag: 'Production',
  },
]

const WHAT_THIS_MEANS = [
  {
    icon: '🎓',
    title: 'Certified Expertise — Not Just Familiarity',
    desc: 'Select status requires a minimum of 10 Anthropic-certified practitioners. Our team has completed the Anthropic Partner Academy certification programme. When we build Claude systems, we build them the way Anthropic trains its partners to build them — reliably, safely, and measurably.',
  },
  {
    icon: '⚙️',
    title: 'Production-Proven — Not Prototype-Tested',
    desc: 'The Select tier requires at least two client deployments operating in production. Both our qualifying deployments are live, in use by real teams, and connected to real operational outcomes. We do not count pilots. Neither does Anthropic.',
  },
  {
    icon: '📋',
    title: 'Client-Endorsed — Not Self-Certified',
    desc: 'Select status requires at least one publicly available customer story. Our engagements are verified by the clients who commissioned them. This is the credential that separates firms who have built Claude systems from firms who have only sold them.',
  },
  {
    icon: '🤝',
    title: 'Anthropic Partnership — Not Just API Access',
    desc: 'The Claude Partner Network launched in March 2026. Anthropic received over 40,000 applications and began with approximately 100 companies worldwide — including Accenture, Cognizant, and Deloitte. StratAI is among that first cohort, and one of the first Registered Partners in India.',
  },
]

export default function ClaudePartnerPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background: 'var(--bg-dark)', padding: 'clamp(56px,7vw,96px) clamp(16px,4vw,24px) clamp(48px,6vw,80px)', borderBottom: '1px solid #1f1f1e', position: 'relative', overflow: 'hidden' }}>
        <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.10 }} />
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,85,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>

          {/* Partner badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', borderRadius: '9999px', border: '1px solid rgba(255,85,0,0.45)', background: 'rgba(255,85,0,0.10)', marginBottom: '28px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FF5500" stroke="#FF5500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.12em', fontWeight: 700 }}>
              OFFICIAL ANTHROPIC CLAUDE PARTNER NETWORK MEMBER · INDIA
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,6vw,80px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff', marginBottom: '24px' }}>
            OFFICIAL ANTHROPIC CLAUDE PARTNER —
            <span style={{ background: 'linear-gradient(135deg, var(--orange) 0%, #FF8C00 50%, #FFD700 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              AI CONSULTING &amp; IMPLEMENTATION SERVICES.
            </span>
          </h1>

          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.6)', maxWidth: '620px', margin: '0 auto 40px', lineHeight: '1.7' }}>
            Official Anthropic Claude Partner Network member. As your AI consulting services partner and AI integration specialist for manufacturers, StratAI delivers Claude-powered AI implementation across mid-market manufacturing companies in India.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ padding: '12px 28px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
              → Book Your Free Half-Day Audit
            </Link>
            <a href="https://www.anthropic.com/news/services-track-partner-hub" target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.18)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
              About the Claude Partner Network →
            </a>
          </div>
        </div>
      </div>

      {/* ── Select Tier Requirements — all three met ── */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '12px' }}>CLAUDE PARTNER NETWORK</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.05 }}>
            What Is the Anthropic Claude Partner Network?
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text2)', lineHeight: '1.75', marginBottom: '40px', maxWidth: '640px' }}>
            StratAI joined the Claude Partner Network as a Registered Partner — the programme's official entry level. Registered status is the foundation. We are actively working toward Select tier: 10+ certified practitioners, 2+ production deployments, and client endorsement.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }} className="about-3-grid">
            {REQUIREMENTS.map((r, i) => (
              <div key={r.num} style={{ background: 'var(--bg2)', padding: 'clamp(24px,4vw,40px)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--ok)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text3)' }}>{r.num}</div>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--ok)', fontWeight: 700 }}>✓</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--ok)', letterSpacing: '0.06em' }}>MET</div>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,2vw,22px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '10px', lineHeight: 1.2 }}>{r.label}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.7', margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Production Deployments ── */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '12px' }}>QUALIFYING DEPLOYMENTS</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: '12px', lineHeight: 1.05 }}>
            Claude AI Consulting Services We Deliver.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text2)', marginBottom: '40px', maxWidth: '560px', lineHeight: 1.7 }}>
            The Select tier requires active client deployments running in production. These are not demos or pilots. They are live AI systems in use by real manufacturing companies today.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)' }} className="contrast-grid">
            {DEPLOYMENTS.map((dep, i) => (
              <div key={dep.client} style={{ background: 'var(--bg)', padding: 'clamp(24px,4vw,40px)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--orange)' }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', margin: 0, lineHeight: 1.1 }}>{dep.client}</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ok)', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', padding: '3px 9px', borderRadius: '9999px', flexShrink: 0 }}>{dep.tag}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.06em', marginBottom: '20px' }}>{dep.sector}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {dep.systems.map((s, j) => (
                    <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--orange)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: '11px', marginTop: '2px' }}>→</span>
                      <span style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.6 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── What Registered Partnership Means ── */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '12px' }}>WHAT THIS MEANS FOR YOU</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: '40px', lineHeight: 1.05 }}>
            Benefits of Working with a Certified Claude Partner.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: 'var(--border)' }}>
            {WHAT_THIS_MEANS.map((item, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg2)', padding: 'clamp(24px,4vw,36px)' }}>
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,2vw,19px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '10px', lineHeight: 1.3 }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.75', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── About the Claude Partner Network ── */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }} className="contrast-grid">
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '12px' }}>ABOUT THE PROGRAMME</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.5vw,40px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: '20px', lineHeight: 1.05 }}>
                The Claude Partner Network. Launched March 2026.
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text2)', lineHeight: '1.75', marginBottom: '16px' }}>
                Anthropic launched the Claude Partner Network with a $100M investment and received over 40,000 applications. Approximately 100 companies were selected to begin the programme — ranging from global professional services firms to specialist consulting companies.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--text2)', lineHeight: '1.75', marginBottom: '24px' }}>
                The Services Track, announced June 3, 2026, formalised the tier structure: Select, Preferred, and Global Premier. StratAI joined as a Registered Partner — one of the first in India and among the first in manufacturing AI.
              </p>
              <a href="https://www.anthropic.com/news/services-track-partner-hub" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--orange)', textDecoration: 'none', letterSpacing: '0.06em' }}>
                Read the Anthropic announcement →
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {[
                { tier: 'SELECT',        req: '10+ certified · 2+ deployments · 1+ endorsement',     active: true },
                { tier: 'PREFERRED',     req: '100+ certified · 15+ deployments · 3+ endorsements',  active: false },
                { tier: 'GLOBAL PREMIER',req: '1,000+ certified · 100+ deployments · 15+ endorsements', active: false },
              ].map((t) => (
                <div key={t.tier} style={{ background: t.active ? 'rgba(255,85,0,0.06)' : 'var(--bg)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', border: t.active ? '1px solid rgba(255,85,0,0.2)' : 'none' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: t.active ? 'var(--orange)' : 'var(--text3)', letterSpacing: '0.1em', marginBottom: '4px' }}>{t.tier}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>{t.req}</div>
                  </div>
                  {t.active && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ok)', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', padding: '3px 9px', borderRadius: '9999px', flexShrink: 0 }}>✓ STRATAI
(REGISTERED)</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,24px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '14px' }}>WORK WITH A CLAUDE PARTNER NETWORK MEMBER</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.1 }}>
            Build Claude systems that show up in your P&L.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text2)', marginBottom: '32px', lineHeight: 1.7 }}>
            Start with a free half-day audit. We identify 3–5 high-value AI use cases specific to your manufacturing business — no fee, no commitment. As a Claude Partner Network Member, every system we build is built on certified expertise and proven deployment methodology.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ padding: '12px 28px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
              → Book Your Free Half-Day Audit
            </Link>
            <Link href="/advantage-systems" style={{ padding: '12px 24px', borderRadius: '9999px', border: '1px solid var(--border2)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text2)', textDecoration: 'none' }}>
              Our AI Advantage Systems →
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
