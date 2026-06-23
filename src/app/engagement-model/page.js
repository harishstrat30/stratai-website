import Link from 'next/link'
import Script from 'next/script'

const HOWTO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'AI Implementation Roadmap — How StratAI Engages',
  description: 'Step-by-step AI implementation roadmap for manufacturing companies in India. From free AI audit support to long-term build and retainer.',
  step: [
    { '@type': 'HowToStep', name: 'Free AI Audit Support', text: 'Half-day audit with no fee or commitment. Identify 3–5 high-value AI use cases specific to your business.' },
    { '@type': 'HowToStep', name: 'AI Implementation Consulting — Deep Dive', text: 'One-month paid deep dive into your processes, data, and systems. Full AI implementation roadmap with P&L impact projections.' },
    { '@type': 'HowToStep', name: 'Long-Term AI Build & Retainer', text: 'Long-term retainer: design, configure, integrate, and implement AI Advantage Systems with ongoing AI change management support.' },
  ],
}

export const metadata = {
  title: { absolute: 'AI Implementation Roadmap & Engagement Model | StratAI™' },
  description: 'Learn how StratAI delivers your AI implementation roadmap — from a free half-day audit to long-term AI build and retainer. No experiments. Only outcomes in your P&L.',
  keywords: [
    'ai implementation roadmap', 'ai pilot program manufacturing', 'ai audit support',
    'ai implementation consulting', 'ai change management manufacturing',
    'free AI audit manufacturing', 'AI engagement model manufacturing',
  ],
  alternates: { canonical: 'https://stratai.io/engagement-model' },
  openGraph: {
    title: 'AI Implementation Roadmap & Engagement Model | StratAI™',
    description: 'Learn how StratAI delivers your AI implementation roadmap — from a free half-day audit to long-term AI build and retainer. No experiments. Only outcomes in your P&L.',
    url: 'https://stratai.io/engagement-model',
  },
}

const STEPS = [
  {
    num: '01',
    title: 'Step 1: Free AI Audit Support',
    paid: false,
    desc: 'We spend half a day with your leadership and operations teams. No fee. No commitment. Our free AI audit support identifies 3–5 high-value AI use cases specific to your business and shows you which ones will move your P&L.',
    detail: [
      'Leadership briefing: your business model, current operations, strategic priorities',
      'Operations walkthrough: where the real friction lives — not where management assumes it does',
      'Data maturity assessment: what data exists, where it lives, what is ready',
      'Shortlist of 3–5 AI use cases ranked by P&L impact, specific to your business',
    ],
    outcome: 'You leave with a clear picture of where AI can create real advantage in your business — before spending a rupee.',
  },
  {
    num: '02',
    title: 'Step 2: AI Implementation Consulting — Deep Dive',
    paid: true,
    desc: 'Paid engagement. Our AI implementation consulting goes deep into your business — processes, data, systems, people. We identify exactly where AI implementation will have measurable P&L impact. At month-end, we present findings and recommendations to management.',
    detail: [
      'Floor-level process observation — understanding how work actually happens, not how it is described',
      'Data audit: quality, completeness, accessibility across systems (ERP, MES, spreadsheets)',
      'Stakeholder interviews across management and frontline teams',
      'Full AI implementation roadmap with P&L impact projections',
    ],
    outcome: 'A complete AI Advantage System recommendation — which systems to build, in which order, with which expected P&L outcomes.',
  },
  {
    num: '03',
    title: 'Management Prioritisation',
    paid: false,
    desc: 'Based on management\'s strategic priorities, we agree on which AI Advantage Systems to build first. This decision drives the retainer scope.',
    detail: [
      'Presentation of findings and recommendations to the leadership team',
      'Discussion of priorities: which P&L lever matters most right now',
      'Agreement on which AI Advantage System to build first',
      'Retainer scope defined — clear deliverables, clear P&L targets',
    ],
    outcome: 'A shared commitment on what to build, in what sequence, and what success looks like in measurable terms.',
  },
  {
    num: '04',
    title: 'Step 3: Long-Term AI Build & Retainer',
    paid: true,
    desc: 'We move into long-term retainer. Design the system architecture, configure the technology, integrate with existing systems, and implement with your teams through structured AI change management for manufacturers.',
    detail: [
      'AI implementation consulting: use case refinement and P&L target confirmation',
      'AI systems architecture: full blueprint — data flows, integrations, change management',
      'AI pilot program manufacturing: build, configure, test against your real production data',
      'AI implementation: phased rollout with your teams — adoption, not just deployment',
    ],
    outcome: 'A working, tested, and adopted AI Advantage System — with real users, real data, and P&L impact tracking from day one.',
  },
  {
    num: '05',
    title: 'AI Change Management for Manufacturers — Measure & Expand',
    paid: true,
    desc: 'We track P&L impact against agreed metrics. Typically visible at Month 4–6. We manage AI change management for manufacturers, iterate continuously, and expand to the next Advantage System as the first delivers results.',
    detail: [
      'KPI dashboards tracking P&L impact metrics agreed in Month 2',
      'Monthly reviews with management on system performance and next iterations',
      'Continuous improvement based on what the production data shows — never static',
      'Expansion planning: as System 1 delivers, we begin designing System 2',
    ],
    outcome: 'Compounding AI advantage. Each system builds on the last. Your operations improve continuously.',
  },
]

export default function EngagementModelPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Script id="howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(HOWTO_SCHEMA) }} />

      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(44px,6vw,80px) clamp(16px,4vw,24px) clamp(32px,5vw,56px)', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '12px' }}>HOW WE WORK</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,6vw,76px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--text)', marginBottom: '20px' }}>
            YOUR AI IMPLEMENTATION<br />ROADMAP —<br />HOW STRATAI ENGAGES.
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '17px', maxWidth: '580px', lineHeight: '1.65', marginBottom: '32px' }}>
            StratAI does not run AI projects. We build long-term AI Advantage Systems through a structured engagement model that begins before you pay a rupee.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', padding: '12px 28px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
            → Book Your Free Half-Day Audit
          </Link>
        </div>
      </div>

      {/* 5-step journey */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(32px,5vw,64px) clamp(16px,4vw,24px)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '40px' }}>THE ENGAGEMENT JOURNEY</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{ background: i === 0 ? 'var(--bg)' : 'var(--bg2)', padding: '0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 0 }} className="step-grid">
                {/* Step number */}
                <div style={{ background: i === 0 ? 'rgba(255,85,0,0.06)' : 'var(--bg3)', padding: 'clamp(20px,4vw,36px) clamp(12px,3vw,24px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', borderRight: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 700, color: i === 0 ? 'var(--orange)' : 'var(--text3)', lineHeight: 1 }}>{step.num}</div>
                  {!step.paid && (
                    <div style={{ marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '8px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--ok)', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', padding: '3px 7px', borderRadius: '9999px', textAlign: 'center' }}>FREE</div>
                  )}
                </div>
                {/* Content */}
                <div style={{ padding: 'clamp(20px,4vw,36px) clamp(16px,4vw,40px)' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '12px' }}>{step.title}</h2>
                  <p style={{ fontSize: '15px', color: 'var(--text2)', lineHeight: '1.7', marginBottom: '20px', maxWidth: '640px' }}>{step.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }} className="step-detail-grid">
                    {step.detail.map((d, j) => (
                      <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', flexShrink: 0, marginTop: '2px' }}>→</span>
                        <span style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.6' }}>{d}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: i === 0 ? 'rgba(255,85,0,0.06)' : 'var(--bg3)', border: `1px solid ${i === 0 ? 'rgba(255,85,0,0.15)' : 'var(--border)'}`, padding: '12px 16px', borderRadius: 'var(--rs)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: i === 0 ? 'var(--orange)' : 'var(--text3)', letterSpacing: '0.08em' }}>OUTCOME: </span>
                    <span style={{ fontSize: '13px', color: 'var(--text2)' }}>{step.outcome}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why retainer */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderLeft: '4px solid var(--orange)', padding: '36px 40px', marginTop: '48px', borderRadius: '0 var(--r) var(--r) 0' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: '14px' }}>WHY LONG-TERM RETAINER?</div>
          <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: '1.75', maxWidth: '720px', marginBottom: '16px' }}>
            AI does not create advantage in a 3-month project. The 6-Month P&L Horizon framework shows that meaningful P&L impact requires at least Month 1–3 for diagnosis and build, Month 4–5 for adoption and early signals, and Month 6+ for visible financial results.
          </p>
          <p style={{ fontSize: '15px', color: 'var(--text2)', lineHeight: '1.7', maxWidth: '720px' }}>
            Retainer is not a pricing choice — it is what the model requires. A vendor on a fixed-cost project is incentivised to deliver the scope. A partner on a retainer is incentivised to deliver the outcome. Those are not the same thing.
          </p>
        </div>
      </div>

      {/* Cross-links */}
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: 'clamp(28px,4vw,48px) clamp(16px,4vw,24px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="/advantage-systems#qas" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text2)', textDecoration: 'none' }}>→ AI defect detection for manufacturers</Link>
            <Link href="/advantage-systems#tas" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text2)', textDecoration: 'none' }}>→ AI predictive maintenance</Link>
            <Link href="/advantage-systems#pas" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text2)', textDecoration: 'none' }}>→ AI supply chain services</Link>
            <Link href="/services" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text2)', textDecoration: 'none' }}>→ AI consulting services for manufacturing</Link>
            <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text2)', textDecoration: 'none' }}>← Back to Home</Link>
          </div>
          <Link href="/contact" style={{ padding: '10px 24px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            → Book Your Free Half-Day Audit
          </Link>
        </div>
      </div>
    </div>
  )
}
