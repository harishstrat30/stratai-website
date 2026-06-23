'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const FEATURES = [
  {
    num: '01',
    title: 'AI TRANSFORMATION\nSTRATEGY',
    slug: 'ai-transformation-strategy',
    desc: 'End-to-end AI roadmaps built around your business architecture. We audit your operations, identify high-ROI automation opportunities, and design the system before we write a single line of code.',
    tags: ['ROADMAPPING', 'AUDIT', 'ROI ANALYSIS'],
    code: `// StratAI Transformation Stack\nconst roadmap = await stratai.audit({\n  org: 'YOUR_COMPANY',\n  focus: ['operations','data','cx'],\n  timeline: '90_days'\n})\n\nawait roadmap.deploy({ env: 'production' })`,
  },
  {
    num: '02',
    title: 'AUTONOMOUS AGENT\nSYSTEMS',
    slug: 'autonomous-agent-systems',
    desc: 'Multi-agent architectures built on Claude. Each agent owns a domain — marketplace, CRM, SEO, ads — and reports to an orchestrator. Real autonomy, real production.',
    tags: ['MULTI-AGENT', 'ORCHESTRATION', 'CLAUDE API'],
    code: `const lkn = new AgentSystem({\n  orchestrator: 'lkn-boss',\n  agents: [\n    'lkn-market',  // Amazon + Flipkart\n    'lkn-shop',    // Shopify ops\n    'lkn-seo',     // Content + rankings\n    'lkn-ads',     // Paid media\n    'lkn-crm',     // Lifecycle\n  ]\n})`,
  },
  {
    num: '03',
    title: 'MARKETING\nAUTOMATION',
    slug: 'marketing-automation',
    desc: 'AI-powered lifecycle marketing across MoEngage, WATI, Interakt, and Shopify. Behavioural triggers, personalised sequences, and autonomous campaign management at enterprise scale.',
    tags: ['MOENGAGE', 'WATI', 'SHOPIFY'],
    code: `moengage.on('user:cart_abandoned', async (u) => {\n  const seq = await ai.generateSequence({\n    user: u,\n    product: u.cart,\n    tone: 'urgent_but_helpful',\n    channels: ['whatsapp', 'email']\n  })\n  await seq.execute()\n})`,
  },
  {
    num: '04',
    title: 'CRM & SALES\nINTELLIGENCE',
    slug: 'crm-sales-intelligence',
    desc: 'Zoho CRM implementations enriched with AI lead scoring, pipeline forecasting, and automated outreach. Your sales team focuses on closing — the AI handles everything else.',
    tags: ['ZOHO CRM', 'AI SCORING', 'FORECASTING'],
    code: `const lead = await zoho.leads.get(id)\nconst score = await ai.score(lead, {\n  model: 'conversion_v3',\n  factors: ['recency', 'fit', 'intent']\n})\nawait lead.update({\n  score,\n  priority: score > 0.8 ? 'hot' : 'warm'\n})`,
  },
  {
    num: '05',
    title: 'E-COMMERCE\nAI OPS',
    slug: 'ecommerce-ai',
    desc: 'Amazon, Flipkart, and Shopify intelligence — listing optimisation, ad budget allocation, inventory forecasting, and automated repricing. Built for Indian marketplaces from day one.',
    tags: ['AMAZON', 'FLIPKART', 'SHOPIFY'],
    code: `const forecast = await stratai.forecast({\n  platform: ['amazon_in', 'flipkart'],\n  sku: product.skuId,\n  horizon: '30d'\n})\n\nawait inventory.reorder(\n  forecast.recommended\n)`,
  },
]

export default function FeaturesSection({ services = [] }) {
  const [active, setActive] = useState(0)
  // One ref per middle-column section
  const sectionRefs = useRef([])
  // Guard so a click-scroll doesn't immediately get overridden by the observer
  const clicking = useRef(false)

  const features = services.length > 0
    ? services.map((s, i) => ({
        ...FEATURES[i] || FEATURES[0],
        title: (s.title || FEATURES[i]?.title || '').toUpperCase(),
        desc:  s.short_description || FEATURES[i]?.desc,
        slug:  s.slug || FEATURES[i]?.slug,
        num:   String(i + 1).padStart(2, '0'),
      }))
    : FEATURES

  // ─── Scroll-spy ────────────────────────────────────────────────────────────
  // Each section is exactly 100vh tall so only ONE can cross the mid-point at a time.
  // rootMargin '-49% 0px -49%' creates a 2% trigger band at the viewport centre.
  useEffect(() => {
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !clicking.current) setActive(i)
        },
        { rootMargin: '-49% 0px -49% 0px', threshold: 0 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [features.length])

  // ─── Click handler ─────────────────────────────────────────────────────────
  // Scroll so the clicked section's vertical centre lands at the viewport centre.
  function goTo(i) {
    const el = sectionRefs.current[i]
    if (!el) return
    clicking.current = true
    setActive(i)
    const rect = el.getBoundingClientRect()
    const panelCentreY = window.scrollY + rect.top + rect.height / 2
    window.scrollTo({ top: panelCentreY - window.innerHeight / 2, behavior: 'smooth' })
    // Release spy guard after the smooth scroll animation finishes (~1 s)
    setTimeout(() => { clicking.current = false }, 1100)
  }

  return (
    <section style={{ background: 'var(--bg)' }}>
      {/* ── Section heading (outside the sticky grid) ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 48px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '12px',
        }}>
          WHAT WE BUILD
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 60px)',
          fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.05,
          color: 'var(--text)',
        }}>
          FIVE SYSTEMS.<br />ONE OPERATING LAYER.
        </h2>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          THE 3-COLUMN SANITY LAYOUT
          • align-items: start  ← CRITICAL — without this, grid children stretch
            to container height and position: sticky stops working inside them
          • Left  (200 px) — sticky nav
          • Middle (1fr)   — tall normal-flow column; page scrolls through it
          • Right  (360 px) — sticky code-preview panel; content swaps via JS
      ──────────────────────────────────────────────────────────────────────── */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '200px 1fr 360px',
        alignItems: 'start',
        gap: 0,
      }} className="features-grid">

        {/* ── LEFT: sticky numbered nav ── */}
        <div className="features-left-nav" style={{
          position: 'sticky',
          top: '67px',                         /* flush below the 67 px header */
          height: 'calc(100vh - 67px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingRight: '24px',
        }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {features.map((f, i) => (
              <li key={i} style={{ marginBottom: '2px' }}>
                <button
                  onClick={() => goTo(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    /* Active = dark fill + white text, exactly like Sanity */
                    background: active === i ? 'var(--text)'      : 'transparent',
                    color:      active === i ? '#fff'             : 'var(--text2)',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (active !== i) {
                      e.currentTarget.style.background = 'var(--orange-light)'
                      e.currentTarget.style.color = 'var(--orange)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (active !== i) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'var(--text2)'
                    }
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px', fontWeight: 700,
                    flexShrink: 0, minWidth: '22px', marginTop: '1px',
                    color: active === i ? 'rgba(255,255,255,0.5)' : 'var(--text3)',
                    transition: 'color 0.2s',
                  }}>
                    {f.num}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px', fontWeight: 600,
                    letterSpacing: '0.04em', lineHeight: 1.4,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {f.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ── MIDDLE ── */}
        <div className="features-middle" style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
          {features.map((f, i) => (
            <div
              key={i}
              ref={el => sectionRefs.current[i] = el}
              className="feature-panel"
              style={{
                /* Each panel is exactly 100 vh so only one lives in the trigger
                   band at a time — guarantees correct scroll-spy behaviour */
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                padding: '40px 48px',
              }}
            >
              <div style={{ width: '100%' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: 'var(--orange)', letterSpacing: '0.12em', marginBottom: '16px',
                }}>
                  {f.num} / 0{features.length}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.05,
                  color: 'var(--text)', marginBottom: '20px', whiteSpace: 'pre-wrap',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontSize: '16px', color: 'var(--text2)',
                  lineHeight: '1.8', marginBottom: '28px', maxWidth: '500px',
                }}>
                  {f.desc}
                </p>
                {f.tags && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                    {f.tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600,
                        letterSpacing: '0.08em', padding: '4px 12px', borderRadius: '9999px',
                        border: '1px solid var(--border2)', color: 'var(--text3)',
                        background: 'var(--bg2)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={`/services/${f.slug}`}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600,
                    letterSpacing: '0.08em', color: 'var(--orange)', textDecoration: 'none',
                    borderBottom: '1px solid var(--orange-border)', paddingBottom: '2px',
                  }}
                >
                  EXPLORE THIS SERVICE →
                </Link>
              </div>
            </div>
          ))}
          {/* Bottom spacer: gives the last section room to reach the trigger band */}
          <div className="features-spacer" style={{ height: '50vh' }} />
        </div>

        {/* ── RIGHT: sticky code-preview panel ── */}
        <div className="features-right-panel" style={{
          position: 'sticky',
          top: '67px',
          height: 'calc(100vh - 67px)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '40px',
        }}>
          <div style={{ width: '100%' }}>
            {/* macOS window chrome */}
            <div style={{
              background: '#0F0F0E',
              border: '1px solid #2a2a28',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
              {/* Title bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 16px',
                borderBottom: '1px solid #2a2a28',
                background: '#1a1a18',
              }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map((c, j) => (
                  <span key={j} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
                ))}
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: '#666', marginLeft: '8px',
                  transition: 'all 0.3s ease',
                }}>
                  {features[active]?.slug || 'stratai'}.ts
                </span>
              </div>
              {/* Code — key={active} triggers a quick fade-in on swap */}
              <pre
                key={active}
                style={{
                  padding: '24px 20px',
                  fontFamily: 'var(--font-mono)', fontSize: '12.5px',
                  color: '#B9B9B9', lineHeight: '1.75', margin: 0,
                  overflow: 'auto',
                  maxHeight: 'calc(100vh - 180px)',
                  whiteSpace: 'pre',
                  animation: 'fadeUp 0.3s ease both',
                }}
              >
                <code>{features[active]?.code || ''}</code>
              </pre>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
