import Link from 'next/link'
import { CARD_EYEBROW, CARD_KPI_INDEX } from './content'

export const CS_CSS = `
.cs-wrap{max-width:1280px;margin:0 auto;padding:0 24px}
.cs-hero-grid{display:grid;grid-template-columns:minmax(0,1.33fr) minmax(0,1fr);gap:87px;align-items:end}
.cs-stats{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.cs-featured{display:grid;grid-template-columns:1.05fr 1fr;border:1px solid var(--border);border-radius:16px;overflow:hidden;background:var(--bg)}
.cs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.cs-two{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:start}
.cs-four{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.cs-solutions{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.cs-cta{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
.cs-cta-card{align-self:start}
.cs-card{transition:border-color .15s,transform .15s}
.cs-card:hover{border-color:var(--orange);transform:translateY(-2px)}
.cs-slides{display:grid}
.cs-slide{grid-area:1/1;opacity:0;visibility:hidden;transition:opacity .45s ease,visibility .45s}
.cs-slide.on{opacity:1;visibility:visible}
.cs-logo-tile{display:flex;align-items:center;justify-content:center;flex-shrink:0;min-width:64px;height:64px;padding:0 14px;background:#fff;border:1px solid var(--border2);border-radius:12px}
.cs-arrow{width:40px;height:40px;border-radius:50%;border:1px solid var(--border2);background:var(--bg);color:var(--text);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .15s,color .15s}
.cs-arrow:hover{border-color:var(--orange);color:var(--orange)}
.cs-dot{background:none;border:0;padding:9px 5px;cursor:pointer;display:flex}
.cs-dot span{display:block;width:8px;height:8px;border-radius:99px;background:var(--border2);transition:width .25s,background .25s}
.cs-dot span.on{width:24px;background:var(--orange)}
@media (prefers-reduced-motion:reduce){.cs-slide,.cs-dot span{transition:none}}
.cs-chip{transition:background .15s,color .15s,border-color .15s}
.cs-chip:hover{border-color:var(--text)}
.cs-faq summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:10px}
.cs-faq summary::-webkit-details-marker{display:none}
.cs-faq summary::before{content:'▶';font-size:10px}
.cs-faq[open] summary::before{content:'▼'}
@media (max-width:980px){
  .cs-hero-grid,.cs-featured,.cs-two,.cs-cta{grid-template-columns:1fr}
  .cs-hero-grid{gap:32px}.cs-two,.cs-cta{gap:32px}
  .cs-grid{grid-template-columns:1fr 1fr}
  .cs-solutions{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:620px){
  .cs-grid,.cs-four,.cs-stats{grid-template-columns:1fr}
  .cs-solutions{grid-template-columns:1fr}
}
`

export const mono = { fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }
export const display = { fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }
export const orangeLink = { color: 'var(--orange)', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }

export function firstSentence(t = '', max = 130) {
  const s = t.replace(/\s+/g, ' ').trim()
  const cut = s.split(/(?<=[.!?])\s/)[0] || s
  return cut.length > max ? cut.slice(0, max - 1).trimEnd() + '…' : cut
}

// Cover image: the one uploaded in the CMS if there is one, else the bundled flat cover in /public/case-covers.
export const caseCover = item => item.featured_image_public_url || `/case-covers/${item.slug}.webp`

export function CaseCard({ item }) {
  const kpi = Array.isArray(item.kpis) && (item.kpis[CARD_KPI_INDEX[item.slug] ?? 0] || item.kpis[0])
  const sentence = s => (s ? s.charAt(0) + s.slice(1).toLowerCase() : '')
  const kpiCaption = kpi && (kpi.description && kpi.description.length >= 30 ? kpi.description : [sentence(kpi.label), kpi.description].filter(Boolean).join(' · '))
  const eyebrow2 = CARD_EYEBROW[item.slug] || item.tags?.[1] || item.client
  return (
    <Link href={`/case-studies/${item.slug}`} className="cs-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--bg)', textDecoration: 'none', color: 'inherit' }}>
      <img src={caseCover(item)} alt="" loading="lazy" decoding="async" width="1280" height="720" style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 9', objectFit: 'cover', borderBottom: '1px solid var(--border)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '28px' }}>
      <div style={{ ...mono, fontSize: '12px', fontWeight: 600, color: 'var(--text3)', marginBottom: '18px' }}>{item.industry} · {eyebrow2}</div>
      {kpi && (
        <>
          <div style={{ ...display, fontSize: '38px', fontWeight: 700, lineHeight: 1.05, color: 'var(--orange)' }}>{kpi.value}</div>
          <div style={{ fontSize: '14px', color: 'var(--text3)', margin: '6px 0 18px', lineHeight: 1.5 }}>{kpiCaption}</div>
        </>
      )}
      <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '18.5px', fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 10px', color: 'var(--text)' }}>{item.title}</h3>
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text2)', margin: '0 0 18px' }}>{firstSentence(item.challenge)}</p>
      <span style={{ ...orangeLink, marginTop: 'auto' }}>Read case study →</span>
      </div>
    </Link>
  )
}

