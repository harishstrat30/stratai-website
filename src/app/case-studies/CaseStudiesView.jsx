'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  GOALS, GOALS_BY_SLUG, FEATURED, FIXED_STATS, FIRST_RESULTS, HERO_COPY,
  WHAT_EVERY_ONE_SHOWS, SOLUTIONS, FAQS, WHATSAPP_HREF,
} from './content'
import { CS_CSS, mono, display, orangeLink, CaseCard, caseCover } from './shared'
import DiagnosticForm from './DiagnosticForm'
import QuoteSlider from './QuoteSlider'

function Hero({ stats }) {
  return (
    <section style={{ background: 'var(--bg-dark)', color: '#fff', padding: '28px 0 76px' }}>
      <div className="cs-wrap">
        <nav aria-label="Breadcrumb" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '44px' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Home</Link> › Case Studies
        </nav>
        <div className="cs-hero-grid">
          <div>
            <div style={{ ...mono, fontSize: '12.5px', fontWeight: 600, color: 'var(--orange2)', marginBottom: '18px' }}>Case studies · Measured in the P&amp;L</div>
            <h1 style={{ ...display, fontSize: 'clamp(34px,3.8vw,53px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.06, margin: '0 0 22px' }}>AI Case Studies: Results From Real Manufacturing Projects</h1>
            <p style={{ fontSize: '18.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', margin: 0 }}>{HERO_COPY}</p>
          </div>
          <div className="cs-stats">
            {stats.map(s => (
              <div key={s.label} style={{ padding: '22px 22px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}>
                <div style={{ ...display, fontSize: '34px', fontWeight: 600, lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginTop: '6px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Filters({ goal, setGoal, counts }) {
  const chip = active => ({
    padding: '9px 18px', borderRadius: '9999px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
    border: `1px solid ${active ? 'var(--text)' : 'var(--border)'}`, background: active ? 'var(--text)' : 'var(--bg)', color: active ? '#fff' : 'var(--text)',
  })
  return (
    <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
      <div className="cs-wrap" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '27px 24px' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text3)' }}>Filter by goal:</span>
        <button className="cs-chip" style={chip(goal === 'all')} onClick={() => setGoal('all')} aria-pressed={goal === 'all'}>All</button>
        {GOALS.map(g => (
          <button key={g.key} className="cs-chip" style={chip(goal === g.key)} onClick={() => setGoal(g.key)} aria-pressed={goal === g.key}>
            {g.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Featured() {
  return (
    <article className="cs-featured">
      <div>
        <img src={caseCover(FEATURED)} alt="" decoding="async" width="1280" height="720" style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 9', objectFit: 'cover', borderBottom: '1px solid var(--border)' }} />
        <div style={{ padding: '36px 44px 40px' }}>
        <div style={{ ...mono, fontSize: '12.5px', fontWeight: 700, color: 'var(--orange)', marginBottom: '16px' }}>{FEATURED.eyebrow}</div>
        <h2 style={{ ...display, fontSize: 'clamp(26px,2.4vw,33px)', fontWeight: 600, lineHeight: 1.15, margin: '0 0 18px', color: 'var(--text)' }}>{FEATURED.title}</h2>
        <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'var(--text2)', margin: '0 0 20px' }}>
          <strong style={{ color: 'var(--text)' }}>Challenge:</strong> {FEATURED.challenge} <strong style={{ color: 'var(--text)' }}>What we built:</strong> {FEATURED.built}
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px' }}>
          {FEATURED.chips.map(c => <span key={c} style={{ padding: '6px 12px', borderRadius: '9999px', background: 'var(--bg4)', fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>{c}</span>)}
        </div>
        <Link href={FEATURED.href} style={orangeLink}>Read the full case study →</Link>
        </div>
      </div>
      <div style={{ background: 'var(--bg-dark)', color: '#fff', padding: '44px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '28px' }}>
        {FEATURED.metrics.map((m, i) => (
          <div key={m.label}>
            <div style={{ ...display, fontSize: '44px', fontWeight: 600, lineHeight: 1.05, color: i === 0 ? 'var(--orange2)' : '#fff' }}>{m.value}</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginTop: '6px' }}>{m.label}</div>
          </div>
        ))}
      </div>
    </article>
  )
}

function CtaCard() {
  return (
    <div className="cs-cta-card" style={{ display: 'flex', flexDirection: 'column', padding: '24px 26px', borderRadius: '14px', background: 'var(--bg-dark)', color: '#fff' }}>
      <div style={{ ...mono, fontSize: '10.5px', fontWeight: 700, color: 'var(--orange2)', marginBottom: '14px' }}>Your plant · Next case study</div>
      <h3 style={{ ...display, fontSize: '24px', fontWeight: 700, lineHeight: 1.2, margin: '0 0 10px' }}>Could your plant be our next result?</h3>
      <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', margin: '0 0 20px', maxWidth: '420px' }}>A free 30-minute diagnostic shows which result is within reach and what it would take.</p>
      <a href="#diagnostic" style={{ display: 'block', textAlign: 'center', padding: '12px 18px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Book a plant diagnostic</a>
    </div>
  )
}

export default function CaseStudiesView({ items, quotes }) {
  const [goal, setGoal] = useState('all')
  const industries = new Set([FEATURED.industry, ...items.map(i => i.industry).filter(Boolean)])
  const stats = [
    { value: String(items.length + 1), label: 'Case studies published' },
    { value: String(industries.size), label: 'Industries served' },
    FIRST_RESULTS,
    ...FIXED_STATS,
  ]
  const inGoal = slug => goal === 'all' || (GOALS_BY_SLUG[slug] || []).includes(goal)
  const counts = {}
  for (const g of GOALS) counts[g.key] = [FEATURED.slug, ...items.map(i => i.slug)].filter(s => (GOALS_BY_SLUG[s] || []).includes(g.key)).length
  const showFeatured = inGoal(FEATURED.slug)
  const shown = items.filter(i => inGoal(i.slug))
  const none = !showFeatured && shown.length === 0
  // Like the mockup: the "Could your plant be our next result?" card sits third in the first row.
  const cells = shown.map(item => <CaseCard key={item.id || item.slug} item={item} />)
  cells.splice(Math.min(2, cells.length), 0, <CtaCard key="cta" />)

  return (
    <div style={{ background: 'var(--bg)' }}>
      <style dangerouslySetInnerHTML={{ __html: CS_CSS }} />
      <Hero stats={stats} />
      <Filters goal={goal} setGoal={setGoal} counts={counts} />

      <section style={{ padding: '72px 0 24px' }}>
        <div className="cs-wrap">
          {none ? (
            <div style={{ textAlign: 'center', padding: '56px 24px', border: '1px dashed var(--border2)', borderRadius: '14px' }}>
              <h2 style={{ ...display, fontSize: '24px', margin: '0 0 8px', color: 'var(--text)' }}>No published case study for this goal yet</h2>
              <p style={{ color: 'var(--text2)', margin: '0 0 18px' }}>Book a diagnostic and we will show you what is within reach.</p>
              <a href="#diagnostic" style={orangeLink}>Book a plant diagnostic →</a>
            </div>
          ) : (
            <>
              {showFeatured && <Featured />}
              <h2 style={{ ...display, fontSize: '34px', fontWeight: 700, margin: showFeatured ? '56px 0 24px' : '0 0 24px', color: 'var(--text)' }}>{showFeatured ? 'More AI case studies' : 'AI case studies'}</h2>
              <div className="cs-grid">
                {cells}
              </div>
            </>
          )}
        </div>
      </section>

      <section style={{ background: 'var(--bg2)', padding: '96px 0', marginTop: '56px' }}>
        <div className="cs-wrap cs-two">
          <QuoteSlider quotes={quotes} />
          <div>
            <h2 style={{ ...display, fontSize: '28px', fontWeight: 700, margin: '0 0 18px', color: 'var(--text)' }}>What every StratAI case study shows</h2>
            <div className="cs-four">
              {WHAT_EVERY_ONE_SHOWS.map(w => (
                <div key={w.title} style={{ padding: '18px 20px', border: '1px solid var(--orange-border)', borderRadius: '10px', background: 'var(--orange-light)' }}>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)', marginBottom: '4px' }}>{w.title}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text2)' }}>{w.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 0' }}>
        <div className="cs-wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <h2 style={{ ...display, fontSize: '34px', fontWeight: 700, margin: 0, color: 'var(--text)' }}>Get results like these in your plant</h2>
            <Link href="/advantage-systems" style={orangeLink}>All AI solutions →</Link>
          </div>
          <div className="cs-solutions">
            {SOLUTIONS.map(s => (
              <Link key={s.name} href={s.href} className="cs-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg)', textDecoration: 'none', color: 'inherit' }}>
                {s.image && <img src={s.image} alt="" loading="lazy" decoding="async" width="1000" height="563" style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 9', objectFit: 'cover', borderBottom: '1px solid var(--border)' }} />}
                <div style={{ padding: '18px 20px 20px' }}>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)', marginBottom: '6px', lineHeight: 1.3 }}>{s.name}</div>
                  <div style={{ fontSize: '13.5px', color: 'var(--text2)' }}>{s.outcome}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg2)', padding: '72px 0' }}>
        <div className="cs-wrap">
          <h2 style={{ ...display, fontSize: '34px', fontWeight: 700, margin: '0 0 24px', color: 'var(--text)' }}>Questions about our results</h2>
          <div style={{ maxWidth: '860px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((f, i) => (
              <details key={f.q} className="cs-faq" open={i === 0} style={{ border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg)', padding: '18px 22px' }}>
                <summary style={{ fontWeight: 600, fontSize: '17.5px', color: 'var(--text)' }}>{f.q}</summary>
                <p style={{ fontSize: '15.6px', lineHeight: 1.7, color: 'var(--text2)', margin: '12px 0 0' }}>
                  {f.a}{f.link && <> <Link href={f.link.href} style={{ color: 'var(--orange)', textDecoration: 'underline' }}>{f.link.text}</Link>.</>}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="diagnostic" style={{ background: 'var(--bg-dark)', color: '#fff', padding: '80px 0' }}>
        <div className="cs-wrap cs-cta">
          <div>
            <h2 style={{ ...display, fontSize: 'clamp(30px,4vw,44px)', fontWeight: 700, lineHeight: 1.1, margin: '0 0 18px' }}>Want results like these?</h2>
            <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', margin: '0 0 26px', maxWidth: '460px' }}>Book a free 30-minute plant diagnostic. We will show you which result is within reach for your plant, and what it would take.</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.28)', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Chat on WhatsApp</a>
              <Link href="/engagement-model" style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.28)', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>See pricing</Link>
            </div>
          </div>
          <DiagnosticForm />
        </div>
      </section>
    </div>
  )
}
