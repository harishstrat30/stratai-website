import Link from 'next/link'
import Script from 'next/script'
import SystemsAccordion from '@/components/sections/SystemsAccordion'

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
    name: 'Quality Advantage System',
    tabDesc: 'AI defect detection & quality control',
    heading: 'AI Defect Detection & Quality Control for Manufacturers',
    purpose: 'Lower rejection rates. Higher first-pass yield. Margin recovery through AI-driven scrap reduction.',
    plOutcome: '↓ Rejection Rate\n↑ First-Pass Yield',
    plSub: 'Margin recovery through AI-driven scrap reduction. Measurable within 6 months of deployment.',
    detail: [
      'AI defect detection integrated into production line inspection',
      'AI vision inspection services: real-time camera-based quality checks',
      'Root cause analysis linking defect patterns to process variables',
      'Real-time alerts to shift supervisors and plant heads',
    ],
  },
  {
    id: 'tas', num: '02', abbr: 'TAS',
    name: 'Throughput Advantage System',
    tabDesc: 'AI predictive maintenance & OEE',
    heading: 'AI Predictive Maintenance & OEE Improvement',
    purpose: 'Increase production output with AI predictive maintenance and OEE optimisation — without proportional cost increase.',
    plOutcome: '↑ Output Per Shift\n↓ Unplanned Downtime',
    plSub: 'OEE improvement without capex. Maintenance before breakdown. Measurable within 6 months.',
    detail: [
      'AI predictive maintenance: detect equipment failure before it causes downtime',
      'AI OEE improvement: scheduling engine for maximum machine utilisation',
      'Real-time bottleneck identification across production stages',
      'Performance monitoring dashboard: actionable gaps surfaced every shift',
    ],
  },
  {
    id: 'das', num: '03', abbr: 'DAS',
    name: 'Delivery Advantage System',
    tabDesc: 'AI demand sensing & planning',
    heading: 'AI-Powered Demand Sensing & Delivery Planning',
    purpose: 'Reduce delays and improve on-time delivery reliability across your customer base.',
    plOutcome: '↑ On-Time Delivery\n↓ Customer Escalations',
    plSub: 'Stronger repeat order rates. Fewer delays. Better customer relationships.',
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
    tabDesc: 'AI-driven B2B sales & marketing',
    heading: 'AI-Driven B2B Sales & Marketing for Manufacturers',
    purpose: 'Increase leads, conversion rates, and revenue through AI-powered sales intelligence.',
    plOutcome: '↑ Qualified Leads\n↑ Conversion Rate',
    plSub: 'Sales team time freed for closing, not admin. More deals. Better pipeline visibility.',
    detail: [
      'AI-powered lead identification from market signals and buyer behaviour',
      'Automated outreach sequences personalised to each prospect',
      'CRM intelligence — pipeline scoring, follow-up triggers, deal risk alerts',
    ],
  },
  {
    id: 'pas', num: '05', abbr: 'PAS',
    name: 'Procurement Advantage System',
    tabDesc: 'AI supply chain & vendor intelligence',
    heading: 'AI Supply Chain Services & Vendor Intelligence',
    purpose: 'Reduce purchase cost with AI demand forecasting, AI MRP integration, and AI-powered supplier analysis. Better sourcing decisions. Fewer supply disruptions.',
    plOutcome: '↓ Procurement Cost\n↑ Supplier Quality',
    plSub: 'Better vendor selection. Fewer supply disruptions. Lower inventory carrying cost.',
    detail: [
      'AI analysis of vendor quotes, historical pricing, and market benchmarks',
      'Supplier performance scoring — quality, delivery reliability, responsiveness',
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
            MANUFACTURING AI SOLUTIONS —<br />QUALITY, THROUGHPUT, DELIVERY,<br />REVENUE &amp; PROCUREMENT.
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '17px', maxWidth: '600px', lineHeight: '1.65', marginBottom: '32px' }}>
            Five AI Advantage Systems for mid-market manufacturers in India. Each one built to move a specific P&amp;L line — measurable within 6 months of deployment.
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

        {/* Accordion system detail */}
        <SystemsAccordion systems={SYSTEMS} />
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
