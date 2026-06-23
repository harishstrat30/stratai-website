import Link from 'next/link'
import Script from 'next/script'

export const metadata = {
  title: { absolute: 'AI Advantage Systems for Manufacturing | QAS · TAS · DAS · RAS · PAS | StratAI™' },
  description: "Explore StratAI's five Manufacturing AI Solutions: Quality, Throughput, Delivery, Revenue and Procurement Advantage Systems. Each built for measurable P&L impact in Indian mid-market manufacturing.",
  keywords: [
    'ai defect detection', 'ai predictive maintenance', 'ai supply chain services',
    'ai quality control services', 'ai vision inspection services', 'ai scrap reduction',
    'ai oee improvement', 'ai downtime reduction', 'ai demand forecasting manufacturing',
    'Quality Advantage System QAS', 'Throughput Advantage System TAS', 'Procurement Advantage System PAS',
  ],
  alternates: { canonical: 'https://stratai.io/advantage-systems' },
  openGraph: {
    title: 'AI Defect Detection, Predictive Maintenance & Supply Chain | StratAI™',
    description: 'StratAI builds 5 AI Advantage Systems for mid-market manufacturers. Quality, Throughput, Delivery, Revenue & Procurement Advantage — measurable in your P&L within 6 months.',
    url: 'https://stratai.io/advantage-systems',
  },
}

const SYSTEMS = [
  {
    id: 'qas', num: '01', abbr: 'QAS',
    name: 'AI Defect Detection for Manufacturing — Quality Advantage System (QAS)',
    purpose: 'Reduce rejection rates and scrap through AI defect detection and AI quality control services. Protect margins with AI-driven vision inspection and root cause analysis.',
    outcome: 'Lower rejection rates. Higher first-pass yield. Margin recovery through AI scrap reduction.',
    detail: [
      'AI defect detection integrated into production line inspection',
      'AI vision inspection services: real-time camera-based quality checks',
      'AI quality assurance manufacturing: root cause analysis linking defect patterns to process variables',
      'AI quality system integration: real-time alerts to shift supervisors and plant heads',
    ],
  },
  {
    id: 'tas', num: '02', abbr: 'TAS',
    name: 'AI Predictive Maintenance & Throughput Optimization — TAS',
    purpose: 'Increase production output with AI predictive maintenance and AI throughput optimization. AI OEE improvement and AI downtime reduction — without proportional cost increase.',
    outcome: 'More output per shift. AI uptime support with maintenance before breakdown. OEE improvement without capex.',
    detail: [
      'AI predictive maintenance: detect equipment failure before it causes downtime',
      'AI OEE improvement: scheduling engine that sequences jobs for maximum machine utilisation',
      'AI downtime reduction: real-time bottleneck identification across production stages',
      'AI performance monitoring dashboard: actionable gaps surfaced to supervisors every shift',
    ],
  },
  {
    id: 'das', num: '03', abbr: 'DAS',
    name: 'Delivery Advantage System',
    purpose: 'Reduce delays and improve on-time delivery reliability. AI-powered demand sensing and production planning.',
    outcome: 'Higher on-time delivery rate. Fewer customer escalations. Stronger repeat order rates.',
    detail: [
      'Demand sensing across customer orders, historical patterns, and market signals',
      'AI-generated production plans aligned to delivery commitments',
      'Early-warning system for orders at risk of missing delivery dates',
      'Customer communication intelligence — proactive updates, not reactive fire-fighting',
    ],
  },
  {
    id: 'ras', num: '04', abbr: 'RAS',
    name: 'Revenue Advantage System',
    purpose: 'Increase leads, conversion rates, and revenue through AI-driven B2B sales and marketing systems.',
    outcome: 'More qualified leads. Higher conversion rate. Sales team time freed for closing, not admin.',
    detail: [
      'AI-powered lead identification from market signals and buyer behaviour',
      'Automated outreach sequences personalised to each prospect\'s context',
      'CRM intelligence — pipeline scoring, follow-up triggers, deal risk alerts',
      'Marketing automation across email, WhatsApp, and LinkedIn',
    ],
  },
  {
    id: 'pas', num: '05', abbr: 'PAS',
    name: 'AI Supply Chain Services & Procurement Advantage System (PAS)',
    purpose: 'Reduce purchase cost with AI supply chain services, AI demand forecasting for manufacturing, and AI MRP integration. Improve sourcing quality through AI-powered supplier analysis.',
    outcome: 'Lower procurement cost. Better supplier selection via AI warehouse integration and AI demand forecasting. Fewer supply disruptions.',
    detail: [
      'AI analysis of vendor quotes, historical pricing, and market benchmarks',
      'Supplier performance scoring — quality, delivery reliability, responsiveness',
      'Purchase order intelligence — identify anomalies, duplicates, and rate deviations',
      'Demand-linked procurement planning to reduce excess inventory',
    ],
  },
]

const QAS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Defect Detection & Quality Control — Quality Advantage System (QAS)',
  description: 'AI defect detection, AI vision inspection services, and AI quality control for manufacturing companies. Reduce rejection rates and protect margins.',
  provider: { '@type': 'Organization', name: 'StratAI', url: 'https://stratai.io' },
  serviceType: 'AI Quality Control Services',
  areaServed: { '@type': 'Country', name: 'India' },
  url: 'https://stratai.io/advantage-systems#qas',
}

const TAS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Predictive Maintenance & Throughput Optimization — TAS',
  description: 'AI predictive maintenance, AI OEE improvement, and AI downtime reduction for manufacturing plants. Measurable in your P&L.',
  provider: { '@type': 'Organization', name: 'StratAI', url: 'https://stratai.io' },
  serviceType: 'AI Predictive Maintenance Services',
  areaServed: { '@type': 'Country', name: 'India' },
  url: 'https://stratai.io/advantage-systems#tas',
}

const PAS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Supply Chain Services & Procurement Advantage System (PAS)',
  description: 'AI supply chain services, AI demand forecasting for manufacturing, and AI MRP integration. Reduce purchase cost and improve sourcing quality.',
  provider: { '@type': 'Organization', name: 'StratAI', url: 'https://stratai.io' },
  serviceType: 'AI Supply Chain Services',
  areaServed: { '@type': 'Country', name: 'India' },
  url: 'https://stratai.io/advantage-systems#pas',
}

export default function AIAdvantageSystemsPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Script id="qas-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(QAS_SCHEMA) }} />
      <Script id="tas-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(TAS_SCHEMA) }} />
      <Script id="pas-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAS_SCHEMA) }} />

      {/* Page header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(44px,6vw,80px) clamp(16px,4vw,24px) clamp(32px,5vw,56px)', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '12px' }}>THE PRODUCT</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,6vw,76px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--text)', marginBottom: '20px' }}>
            FIVE MANUFACTURING AI SOLUTIONS —<br />THE STRATAI<br />ADVANTAGE SYSTEMS.
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '17px', maxWidth: '600px', lineHeight: '1.65', marginBottom: '32px' }}>
            Manufacturing AI solutions built for measurable P&amp;L impact. Most manufacturers deploy AI as activity. StratAI builds AI Advantage Systems — engineered to show up in your P&L within 6 months.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', padding: '12px 28px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
            → Identify Which System Fits Your Business
          </Link>
        </div>
      </div>

      {/* Category definition */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 24px 40px' }}>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderLeft: '4px solid var(--orange)', padding: '32px 36px', borderRadius: '0 var(--r) var(--r) 0', marginBottom: '56px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: '12px' }}>WHAT IS AN AI ADVANTAGE SYSTEM?</div>
          <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: '1.75', maxWidth: '760px' }}>
            An AI Advantage System is not a software tool, automation script, or pilot project. It is a fully designed, implemented, and measured AI system built to create competitive advantage measurable in your P&L. Every system is built around a specific operational lever — quality, throughput, delivery, revenue, or procurement — and is designed to compound over time.
          </p>
        </div>

        {/* Summary table */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>THE 5 SYSTEMS</div>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', marginBottom: '64px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>
                  {['#', 'System', 'Abbreviation', 'Purpose & Outcome'].map(h => (
                    <th key={h} style={{ padding: 'clamp(8px,2vw,12px) clamp(10px,3vw,20px)', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text3)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SYSTEMS.map((sys, i) => (
                  <tr key={sys.id} style={{ borderBottom: i < SYSTEMS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <td style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--orange)' }}>{sys.num}</td>
                    <td style={{ padding: '16px 20px', fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap' }}>{sys.name}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: 'var(--orange)', background: 'rgba(255,85,0,0.08)', padding: '3px 10px', borderRadius: '4px' }}>{sys.abbr}</span>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text2)', lineHeight: 1.6, maxWidth: '500px' }}>{sys.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full detail per system */}
        {SYSTEMS.map(sys => (
          <div key={sys.id} id={sys.id} style={{ marginBottom: '56px', scrollMarginTop: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', fontWeight: 700, color: 'var(--orange)' }}>{sys.abbr}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.08em', marginBottom: '4px' }}>{sys.num} / 05</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,32px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1 }}>{sys.name}</h2>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)' }} className="system-detail-grid">
              <div style={{ background: 'var(--bg2)', padding: 'clamp(20px,4vw,32px)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text3)', marginBottom: '12px' }}>PURPOSE</div>
                <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: '1.7', marginBottom: '20px' }}>{sys.purpose}</p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text3)', marginBottom: '10px' }}>OUTCOME</div>
                <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.6' }}>{sys.outcome}</p>
              </div>
              <div style={{ background: 'var(--bg)', padding: 'clamp(20px,4vw,32px)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text3)', marginBottom: '14px' }}>WHAT WE BUILD</div>
                {sys.detail.map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ color: 'var(--orange)', flexShrink: 0, marginTop: '2px' }}>→</span>
                    <span style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.6' }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cross-links */}
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: 'clamp(28px,4vw,48px) clamp(16px,4vw,24px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="/services" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text2)', textDecoration: 'none' }}>→ AI consulting services for manufacturing</Link>
            <Link href="/engagement-model" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text2)', textDecoration: 'none' }}>→ AI implementation roadmap</Link>
            <Link href="/knowledge-hub" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text2)', textDecoration: 'none' }}>→ Knowledge Hub</Link>
            <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text2)', textDecoration: 'none' }}>← Back to Home</Link>
          </div>
          <Link href="/contact" style={{ padding: '10px 24px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            → Identify Which System Fits Your Business
          </Link>
        </div>
      </div>
    </div>
  )
}
