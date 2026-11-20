'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { LAYERS, BANDS, VERDICTS, RULES, MEETING_QUESTIONS } from './content'
import { rankVendors, biggestRisk } from './scoring'

const mono = { fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }
const display = { fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }
const VERDICT_STYLE = {
  strong: { bg: '#E7F5EC', fg: '#166B38', bd: '#B9E0C7' },
  probe: { bg: '#FFF4DD', fg: '#8A5A00', bd: '#F2D9A0' },
  insufficient: { bg: '#FDE9E7', fg: '#A32619', bd: '#F3C2BC' },
}
const MAX_VENDORS = 3
const NL = LAYERS.length

const VT_CSS = `
.vt-wrap{max-width:1100px;margin:0 auto;padding:0 24px}
.vt-hero-grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:56px;align-items:end}
.vt-stats{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.vt-layers{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.vt-two{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.vt-row{display:grid;grid-template-columns:130px minmax(0,1fr) 190px;gap:16px;align-items:center;padding:10px 0;border-top:1px solid var(--border)}
.vt-range{width:100%;accent-color:var(--orange);cursor:pointer;height:28px}
.vt-input{width:100%;padding:12px 14px;border:1px solid var(--border2);border-radius:8px;background:var(--bg);color:var(--text);font:inherit;font-size:15px}
.vt-input:focus,.vt-range:focus-visible,.vt-btn:focus-visible{outline:2px solid var(--orange);outline-offset:2px}
.vt-btn{cursor:pointer;border:0;font:inherit;font-weight:600;font-size:14px;border-radius:8px;padding:13px 22px;transition:opacity .15s,transform .15s}
.vt-btn:hover:not(:disabled){transform:translateY(-1px)}
.vt-btn:disabled{opacity:.45;cursor:not-allowed}
.vt-vendor{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:32px}
.vt-q{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border:1px solid var(--border);border-radius:10px;background:var(--bg2)}
@media (max-width:980px){
  .vt-hero-grid{grid-template-columns:1fr;gap:32px}
  .vt-layers{grid-template-columns:1fr 1fr}
  .vt-vendor{grid-template-columns:1fr;gap:24px}
  .vt-row{grid-template-columns:1fr;gap:4px}
}
@media (max-width:560px){
  .vt-layers,.vt-two,.vt-stats{grid-template-columns:1fr}
}
`

const band = s => BANDS.find(b => s <= b.max).label

function Hero() {
  const stats = [
    { value: '5', label: 'Layers of domain knowledge' },
    { value: '3', label: 'Vendors compared at once' },
    { value: '15 min', label: 'To score them' },
    { value: '0', label: 'Data leaves your browser' },
  ]
  return (
    <section style={{ background: 'var(--bg-dark)', color: '#fff', padding: '28px 0 76px' }}>
      <div className="vt-wrap">
        <nav aria-label="Breadcrumb" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '52px' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> › <span>5-Layer Domain Test</span>
        </nav>
        <div className="vt-hero-grid">
          <div>
            <div style={{ ...mono, fontSize: '11px', fontWeight: 600, color: 'var(--orange2)', marginBottom: '18px' }}>Free tool · AI vendor scorecard</div>
            <h1 style={{ ...display, fontSize: 'clamp(30px,4.4vw,52px)', fontWeight: 700, lineHeight: 1.1, margin: '0 0 22px' }}>Score your AI vendors with the 5-Layer Domain Test</h1>
            <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.74)', maxWidth: '600px', margin: '0 0 28px' }}>
              Most AI failures in manufacturing are domain failures, not technology failures. Rate up to three vendors on five layers of domain knowledge and get a ranked verdict, your biggest domain risk and two follow-up questions per vendor for your next meeting.
            </p>
            <a href="#scorecard" className="vt-btn" style={{ display: 'inline-block', background: 'var(--orange)', color: '#fff', textDecoration: 'none' }}>Start scoring ↓</a>
          </div>
          <div className="vt-stats">
            {stats.map(s => (
              <div key={s.label} style={{ padding: '22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}>
                <div style={{ ...display, fontSize: '32px', fontWeight: 600, lineHeight: 1.1, color: 'var(--orange2)' }}>{s.value}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', marginTop: '6px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LayersSection() {
  return (
    <section style={{ padding: '72px 0 24px' }}>
      <div className="vt-wrap">
        <h2 style={{ ...display, fontSize: '34px', fontWeight: 700, margin: '0 0 10px', color: 'var(--text)' }}>The 5 layers of domain knowledge</h2>
        <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text2)', maxWidth: '720px', margin: '0 0 28px' }}>
          Industry knowledge is only layer 1. The other four are where the real difference between a vendor and a partner lives.
        </p>
        <div className="vt-layers">
          {LAYERS.map(l => (
            <div key={l.key} style={{ padding: '22px 20px', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg)' }}>
              <div style={{ ...mono, fontSize: '12px', fontWeight: 700, color: 'var(--orange)', marginBottom: '10px' }}>Layer {l.num}</div>
              <div style={{ fontWeight: 600, fontSize: '16px', lineHeight: 1.3, color: 'var(--text)', marginBottom: '10px' }}>{l.name}</div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text2)', margin: '0 0 10px' }}>{l.meaning}</p>
              <p style={{ fontSize: '13px', lineHeight: 1.55, color: 'var(--text3)', margin: 0 }}><strong style={{ color: 'var(--text2)' }}>Where vendors fail:</strong> {l.vendorsFail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Scorecard({ vendors, setVendors, scored, total, onShow, onReset }) {
  const setName = (vi, name) => setVendors(vs => vs.map((v, i) => (i === vi ? { ...v, name } : v)))
  const setScore = (vi, li, val) => setVendors(vs => vs.map((v, i) => (i === vi ? { ...v, scores: v.scores.map((s, k) => (k === li ? val : s)) } : v)))
  const label = (v, i) => v.name.trim() || `Vendor ${String.fromCharCode(65 + i)}`
  const complete = scored === total
  return (
    <section id="scorecard" style={{ background: 'var(--bg2)', padding: '80px 0', marginTop: '48px', scrollMarginTop: '70px' }}>
      <div className="vt-wrap">
        <div style={{ ...mono, fontSize: '12px', fontWeight: 600, color: 'var(--orange)', marginBottom: '12px' }}>Scorecard</div>
        <h2 style={{ ...display, fontSize: '34px', fontWeight: 700, margin: '0 0 28px', color: 'var(--text)' }}>Score each vendor on every layer</h2>

        <div style={{ padding: '26px', border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--bg)', marginBottom: '20px' }}>
          <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--text)', marginBottom: '4px' }}>1. Who are you comparing?</div>
          <p style={{ fontSize: '14px', color: 'var(--text2)', margin: '0 0 16px' }}>Name up to three vendors. You can leave the names blank.</p>
          <div className="vt-two" style={{ gridTemplateColumns: `repeat(${Math.min(vendors.length + (vendors.length < MAX_VENDORS ? 1 : 0), 3)}, minmax(0,1fr))` }}>
            {vendors.map((v, i) => (
              <div key={v.id} style={{ display: 'flex', gap: '8px' }}>
                <input className="vt-input" value={v.name} onChange={e => setName(i, e.target.value)} placeholder={`Vendor ${String.fromCharCode(65 + i)}`} maxLength={60} aria-label={`Name of vendor ${i + 1}`} />
                {vendors.length > 1 && (
                  <button type="button" className="vt-btn" onClick={() => setVendors(vs => vs.filter((_, k) => k !== i))} aria-label={`Remove ${label(v, i)}`} style={{ background: 'var(--bg3)', color: 'var(--text2)', padding: '0 14px' }}>✕</button>
                )}
              </div>
            ))}
            {vendors.length < MAX_VENDORS && (
              <button type="button" className="vt-btn" onClick={() => setVendors(vs => [...vs, { id: Date.now(), name: '', scores: Array(NL).fill(null) }])} style={{ background: 'var(--orange-light)', color: 'var(--orange)', border: '1px dashed var(--orange-border)' }}>+ Add a vendor</button>
            )}
          </div>
        </div>

        {LAYERS.map((l, li) => (
          <div key={l.key} style={{ padding: '26px', border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--bg)', marginBottom: '16px' }}>
            <div style={{ ...mono, fontSize: '12px', fontWeight: 700, color: 'var(--orange)', marginBottom: '8px' }}>Layer {l.num} of 05</div>
            <h3 style={{ ...display, fontSize: '22px', fontWeight: 700, margin: '0 0 12px', color: 'var(--text)' }}>{l.name}</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--text)', margin: '0 0 8px' }}><strong>Ask:</strong> {l.ask}</p>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text2)', margin: '0 0 4px' }}><strong style={{ color: '#166B38' }}>Strong answer:</strong> {l.strong}</p>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text2)', margin: '0 0 16px' }}><strong style={{ color: '#A32619' }}>Weak answer:</strong> {l.weak}</p>
            {vendors.map((v, vi) => {
              const s = v.scores[li]
              return (
                <div key={v.id} className="vt-row">
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', overflowWrap: 'anywhere' }}>{label(v, vi)}</div>
                  <input
                    className="vt-range" type="range" min="0" max="10" step="1"
                    value={s ?? 5}
                    onChange={e => setScore(vi, li, Number(e.target.value))}
                    onPointerUp={e => { if (s == null) setScore(vi, li, Number(e.currentTarget.value)) }}
                    aria-label={`${label(v, vi)}: ${l.name}, score out of 10`}
                    aria-valuetext={s == null ? 'Not scored yet' : `${s} out of 10, ${band(s)}`}
                    style={s == null ? { opacity: 0.45 } : undefined}
                  />
                  <div style={{ fontSize: '13px', color: s == null ? 'var(--text3)' : 'var(--text2)' }}>
                    {s == null ? 'Move the slider to score' : <><strong style={{ color: 'var(--text)', fontSize: '15px' }}>{s}/10</strong> · {band(s)}</>}
                  </div>
                </div>
              )
            })}
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '26px' }}>
          <button type="button" className="vt-btn" disabled={!complete} onClick={onShow} style={{ background: 'var(--orange)', color: '#fff' }}>Show my verdict →</button>
          <button type="button" className="vt-btn" onClick={onReset} style={{ background: 'var(--bg3)', color: 'var(--text2)' }}>Reset</button>
          <span style={{ fontSize: '14px', color: 'var(--text2)' }} aria-live="polite">{scored} of {total} scores set{complete ? '' : ' · score every layer to see the verdict'}</span>
        </div>
      </div>
    </section>
  )
}

function Results({ vendors, ranked, risk, onCopy, copied }) {
  const top = ranked[0]
  const riskLayer = LAYERS[risk.layer]
  const anyStrong = ranked.some(v => v.verdict === 'strong')
  return (
    <section id="results" style={{ padding: '80px 0 40px', scrollMarginTop: '70px' }}>
      <div className="vt-wrap">
        <div style={{ ...mono, fontSize: '12px', fontWeight: 600, color: 'var(--orange)', marginBottom: '12px' }}>Your verdict</div>
        <h2 style={{ ...display, fontSize: '34px', fontWeight: 700, lineHeight: 1.15, margin: '0 0 12px', color: 'var(--text)' }}>
          {anyStrong ? `${top.name} ranks first with a ${VERDICTS[top.verdict].label.toLowerCase()}` : 'No vendor clears the bar yet'}
        </h2>
        <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text2)', maxWidth: '760px', margin: '0 0 28px' }}>
          {anyStrong
            ? 'Ask for references and a scoped pilot from the top vendor, and use the questions below to confirm the weaker layers before you sign.'
            : `${top.name} scored highest at ${top.total} out of 50, but none of the vendors you scored shows enough domain knowledge to sign with yet. Use the questions below at your next meeting.`}
        </p>

        <div style={{ padding: '24px 26px', border: '1px solid var(--orange-border)', borderRadius: '14px', background: 'var(--orange-light)', marginBottom: '28px' }}>
          <div style={{ ...mono, fontSize: '11px', fontWeight: 700, color: 'var(--orange)', marginBottom: '8px' }}>Your biggest domain risk</div>
          <div style={{ ...display, fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>Layer {riskLayer.num}: {riskLayer.name}</div>
          <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--text2)', margin: '0 0 8px' }}>
            Your vendors average {risk.average.toFixed(1)} out of 10 here, the lowest of the five layers. {riskLayer.vendorsFail}
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--text)', margin: 0 }}><strong>Ask every vendor:</strong> {riskLayer.ask}</p>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {ranked.map(v => {
            const st = VERDICT_STYLE[v.verdict]
            return (
              <article key={v.id} style={{ padding: '28px', border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--bg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  <span style={{ width: '40px', height: '40px', borderRadius: '50%', background: v.rank === 1 ? 'var(--orange)' : 'var(--bg4)', color: v.rank === 1 ? '#fff' : 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{v.rank}</span>
                  <h3 style={{ ...display, fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--text)', overflowWrap: 'anywhere' }}>{v.name}</h3>
                  <span style={{ padding: '5px 12px', borderRadius: '9999px', border: `1px solid ${st.bd}`, background: st.bg, color: st.fg, fontWeight: 700, fontSize: '13px' }}>{VERDICTS[v.verdict].label}</span>
                  <span style={{ marginLeft: 'auto', ...display, fontSize: '28px', fontWeight: 700, color: 'var(--text)' }}>{v.total}<span style={{ fontSize: '16px', color: 'var(--text3)' }}>/50</span></span>
                </div>
                <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'var(--text2)', margin: '0 0 22px' }}>{VERDICTS[v.verdict].summary}</p>
                <div className="vt-vendor">
                  <div>
                    <div style={{ ...mono, fontSize: '11px', fontWeight: 700, color: 'var(--text3)', marginBottom: '12px' }}>Score by layer</div>
                    {LAYERS.map((l, i) => {
                      const weak = v.weakest.includes(i)
                      return (
                        <div key={l.key} style={{ display: 'grid', gridTemplateColumns: '124px minmax(0,1fr) 40px', gap: '10px', alignItems: 'center', marginBottom: '9px' }}>
                          <span style={{ fontSize: '13px', color: weak ? 'var(--text)' : 'var(--text2)', fontWeight: weak ? 600 : 400 }}>{l.short}</span>
                          <span style={{ height: '9px', borderRadius: '9999px', background: 'var(--bg4)', overflow: 'hidden' }}>
                            <span style={{ display: 'block', height: '100%', width: `${v.scores[i] * 10}%`, borderRadius: '9999px', background: weak ? 'var(--orange)' : 'var(--text2)' }} />
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', textAlign: 'right' }}>{v.scores[i]}/10</span>
                        </div>
                      )
                    })}
                    <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '10px' }}>Orange bars are the two weakest layers.</div>
                  </div>
                  <div>
                    <div style={{ ...mono, fontSize: '11px', fontWeight: 700, color: 'var(--text3)', marginBottom: '12px' }}>Two questions for your next meeting</div>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {v.followUps.map((f, k) => (
                        <div key={f.layer} className="vt-q">
                          <span style={{ ...mono, fontSize: '12px', fontWeight: 700, color: 'var(--orange)', marginTop: '2px' }}>{String(k + 1).padStart(2, '0')}</span>
                          <div>
                            <div style={{ ...mono, fontSize: '10px', fontWeight: 700, color: 'var(--text3)', marginBottom: '4px' }}>Layer {LAYERS[f.layer].num} · {LAYERS[f.layer].short}</div>
                            <div style={{ fontSize: '14.5px', lineHeight: 1.55, color: 'var(--text)' }}>{f.question}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginTop: '24px' }}>
          <button type="button" className="vt-btn" onClick={onCopy} style={{ background: 'var(--text)', color: 'var(--bg)' }}>{copied ? 'Copied ✓' : 'Copy summary'}</button>
          <a href="#scorecard" className="vt-btn" style={{ background: 'var(--bg3)', color: 'var(--text2)', textDecoration: 'none' }}>Change my scores</a>
        </div>

        <details style={{ marginTop: '28px', padding: '16px 20px', border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--bg2)' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>How the verdict works</summary>
          <ul style={{ margin: '12px 0 0', paddingLeft: '20px', color: 'var(--text2)', fontSize: '14.5px', lineHeight: 1.8 }}>
            {RULES.map(r => <li key={r}>{r}</li>)}
            <li>The verdict follows these rules on your scores. It is not an AI judgement, so it is only as good as the answers you scored.</li>
          </ul>
        </details>
      </div>
    </section>
  )
}

function MeetingList() {
  return (
    <section style={{ padding: '40px 0 72px' }}>
      <div className="vt-wrap">
        <h2 style={{ ...display, fontSize: '28px', fontWeight: 700, margin: '0 0 8px', color: 'var(--text)' }}>Five questions to ask in the room</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text2)', maxWidth: '720px', margin: '0 0 22px' }}>
          Run these in your next vendor meeting, then come back and score what you heard.
        </p>
        <div style={{ display: 'grid', gap: '10px' }}>
          {MEETING_QUESTIONS.map((m, i) => (
            <div key={m.q} className="vt-q" style={{ background: 'var(--bg)' }}>
              <span style={{ ...mono, fontSize: '12px', fontWeight: 700, color: 'var(--orange)', marginTop: '3px' }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15.5px', color: 'var(--text)', marginBottom: '4px' }}>{m.q}</div>
                <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text2)' }}>{m.why}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text2)', margin: '22px 0 0' }}>
          Read the full reasoning in <Link href="/blog/ai-vendor-selection-manufacturing-domain-expertise" style={{ color: 'var(--orange)', fontWeight: 600 }}>Your AI vendor knows technology. Do they know your business?</Link>
        </p>
      </div>
    </section>
  )
}

function ClosingCta() {
  return (
    <section style={{ background: 'var(--bg-dark)', color: '#fff', padding: '72px 0' }}>
      <div className="vt-wrap" style={{ maxWidth: '820px' }}>
        <h2 style={{ ...display, fontSize: 'clamp(26px,3.4vw,38px)', fontWeight: 700, lineHeight: 1.15, margin: '0 0 16px' }}>Want a second opinion on your shortlist?</h2>
        <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', margin: '0 0 26px' }}>
          StratAI works inside your business before proposing anything. Bring your scores to a 30-minute conversation: no pitch deck, just clarity on where AI can move your P&amp;L.
        </p>
        <Link href="/contact" className="vt-btn" style={{ display: 'inline-block', background: 'var(--orange)', color: '#fff', textDecoration: 'none' }}>Book a conversation</Link>
      </div>
    </section>
  )
}

export default function VendorTest() {
  const [vendors, setVendors] = useState(() => [
    { id: 1, name: '', scores: Array(NL).fill(null) },
    { id: 2, name: '', scores: Array(NL).fill(null) },
  ])
  const [showResults, setShowResults] = useState(false)
  const [copied, setCopied] = useState(false)
  const resultsRef = useRef(null)

  const named = vendors.map((v, i) => ({ ...v, name: v.name.trim() || `Vendor ${String.fromCharCode(65 + i)}` }))
  const total = vendors.length * NL
  const scored = vendors.reduce((a, v) => a + v.scores.filter(s => s != null).length, 0)
  const complete = scored === total
  const ranked = useMemo(() => (complete ? rankVendors(named) : []), [complete, vendors]) // eslint-disable-line react-hooks/exhaustive-deps
  const risk = useMemo(() => (complete ? biggestRisk(named) : null), [complete, vendors]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (showResults && complete && resultsRef.current) resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [showResults]) // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    setVendors(vs => vs.map(v => ({ ...v, scores: Array(NL).fill(null) })))
    setShowResults(false)
  }

  const copy = async () => {
    const lines = ['5-Layer Domain Test: vendor scores', '']
    ranked.forEach(v => {
      lines.push(`${v.rank}. ${v.name}: ${v.total}/50, ${VERDICTS[v.verdict].label}`)
      LAYERS.forEach((l, i) => lines.push(`   ${l.short}: ${v.scores[i]}/10`))
      lines.push('   Ask next:')
      v.followUps.forEach(f => lines.push(`   - ${f.question}`))
      lines.push('')
    })
    lines.push(`Biggest domain risk: ${LAYERS[risk.layer].name} (average ${risk.average.toFixed(1)}/10)`)
    lines.push('Scored with the StratAI 5-Layer Domain Test: https://stratai.io/vendor-domain-test')
    try { await navigator.clipboard.writeText(lines.join('\n')); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* clipboard blocked: nothing to do */ }
  }

  return (
    <div style={{ background: 'var(--bg)' }}>
      <style dangerouslySetInnerHTML={{ __html: VT_CSS }} />
      <Hero />
      <LayersSection />
      <Scorecard vendors={vendors} setVendors={setVendors} scored={scored} total={total} onShow={() => setShowResults(true)} onReset={reset} />
      <div ref={resultsRef}>
        {showResults && complete && <Results vendors={named} ranked={ranked} risk={risk} onCopy={copy} copied={copied} />}
      </div>
      <MeetingList />
      <ClosingCta />
    </div>
  )
}
