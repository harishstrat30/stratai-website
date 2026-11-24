import { Fragment } from 'react'
import Link from 'next/link'
import AuditForm from './AuditForm'
import SystemPanel from './Panels'
import { HOME_CSS } from './homeStyles'
import {
  HERO, CLIENTS, PAINS, SYSTEMS, HOW, CASES, ABOUT, TEAM, TRUST, LOCATION, HUB, FAQ, RESOURCES, FINAL,
  PHONE_DISPLAY, PHONE_TEL, EMAIL, WHATSAPP, ADDRESS_LINES, MAP_SRC,
} from './content'

const ICONS = {
  doc: <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" />,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  person: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12.5 3 3 5-6" /></>,
  spark: <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />,
  in: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v6M8 7.5v.1M12 17v-6m0 3c0-2 1.5-3 3-3s2.5 1 2.5 3v3" /></>,
  building: <path d="M4 21V5l9-2v18M13 9h7v12M4 21h16M8 8h2M8 12h2M8 16h2M16 13h1M16 17h1" />,
}
function Icon({ name, size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[name]}</svg>
}

const ext = { target: '_blank', rel: 'noopener noreferrer' }
const initials = (n = '') => n.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
const clip = (t = '', max = 150) => {
  const s = t.replace(/\s+/g, ' ').trim()
  return s.length <= max ? s : s.slice(0, max).replace(/\s+\S*$/, '') + '…'
}
const fmtDate = d => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) : '')
const sentence = (t = '') => t.charAt(0) + t.slice(1).toLowerCase()
function statValue(s) {
  const v = Number(s.value)
  if (v >= 100000) return `${+(v / 100000).toFixed(1)} lakh${s.suffix || ''}`
  return `${v.toLocaleString('en-IN')}${s.suffix || ''}`
}

function Hero() {
  return (
    <section className="hm-dark" aria-labelledby="hm-h1">
      <div className="hm-strip">
        <div className="hm-wrap">
          <span>Official Anthropic Claude Partner Network member · <Link href="/claude-partner" className="hm-peach">Why we build on Claude →</Link></span>
          <span>Coimbatore, India · <a href={PHONE_TEL}>{PHONE_DISPLAY}</a></span>
        </div>
      </div>
      <div className="hm-wrap hm-hero">
        <div className="hm-hero-grid">
          <div>
            <p className="hm-eyebrow">{HERO.eyebrow}</p>
            <h1 className="hm-h1" id="hm-h1">{HERO.h1}</h1>
            <p className="hm-hero-body">{HERO.body}</p>
            <div className="hm-btn-row">
              <a href="#audit" className="hm-btn hm-btn-primary">{HERO.primary}</a>
              <Link href="/case-studies" className="hm-btn hm-btn-ghost">{HERO.secondary}</Link>
            </div>
            <p className="hm-micro">{HERO.micro}</p>
            <div className="hm-quote"><p>{HERO.quote}</p><span>{HERO.quoteBy}</span></div>
          </div>
          <AuditForm />
        </div>
      </div>
    </section>
  )
}

function TrustBar({ stats }) {
  return (
    <section className="hm-wrap" aria-label="Clients and results">
      <div className="hm-clients">
        <p className="hm-clients-label">Trusted from Coimbatore to Turkey</p>
        <div className="hm-clients-grid">
          {CLIENTS.map(c => (
            <div className="hm-client" key={c.name} title={c.name}>
              {c.logo ? <img src={c.logo} alt={c.name} width={c.w} height={c.h} loading="lazy" decoding="async" /> : <span>{c.name}</span>}
            </div>
          ))}
        </div>
      </div>
      {stats.length > 0 && (
        <div className="hm-stats">
          {stats.slice(0, 4).map((s, i) => (
            <div className="hm-stat" key={i}>
              <b>{statValue(s)}</b>
              <span>{sentence(s.label)}</span>
              {s.sub && <em>{s.sub}</em>}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function Pains() {
  return (
    <section className="hm-sec hm-wrap" aria-labelledby="hm-pains">
      <p className="hm-eyebrow">{PAINS.eyebrow}</p>
      <h2 className="hm-h2" id="hm-pains">{PAINS.h2}</h2>
      <p className="hm-lead">{PAINS.sub}</p>
      <div className="hm-pains">
        {PAINS.items.map(p => (
          <div className="hm-pain" key={p.q}><q>{p.q}</q><p>{p.t}</p></div>
        ))}
      </div>
    </section>
  )
}

function Systems() {
  return (
    <section className="hm-sec hm-alt" id="what-we-do" aria-labelledby="hm-sys">
      <div className="hm-wrap">
        <p className="hm-eyebrow">{SYSTEMS.eyebrow}</p>
        <h2 className="hm-h2" id="hm-sys">{SYSTEMS.h2}</h2>
        <p className="hm-lead">{SYSTEMS.sub}</p>
        <div className="hm-sys">
          {SYSTEMS.items.map(s => (
            <article className="hm-syscard" key={s.key}>
              <SystemPanel k={s.key} />
              <div className="hm-sbody">
                <div className="hm-stag">{s.tag}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
                <p className="hm-moves">{s.moves}</p>
                <Link href="/advantage-systems" className="hm-link">Explore →</Link>
              </div>
            </article>
          ))}
          <div className="hm-stack">
            <div className="hm-eyebrow" style={{ fontSize: '11px', marginBottom: '14px' }}>{SYSTEMS.stack.eyebrow}</div>
            <h3>{SYSTEMS.stack.h}</h3>
            <div className="hm-chips">{SYSTEMS.stack.chips.map(c => <span className="hm-chip" key={c}>{c}</span>)}</div>
            <small>{SYSTEMS.stack.note}</small>
          </div>
        </div>
        <p className="hm-d2c">{SYSTEMS.d2c} {SYSTEMS.d2cLinks.map((l, i) => (
          <span key={l}>{i > 0 && ' · '}<Link href="/services">{l}</Link></span>
        ))}</p>
        <div className="hm-banner hm-banner-dark">
          <div><h3>{SYSTEMS.banner.h}</h3><p>{SYSTEMS.banner.p}</p></div>
          <div className="hm-btn-row">
            <a href="#audit" className="hm-btn hm-btn-primary">{SYSTEMS.banner.primary}</a>
            <a href={WHATSAPP} className="hm-btn hm-btn-light" {...ext}>{SYSTEMS.banner.secondary}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function How() {
  return (
    <section className="hm-sec hm-wrap" aria-labelledby="hm-how">
      <div className="hm-two">
        <div>
          <p className="hm-eyebrow">{HOW.eyebrow}</p>
          <h2 className="hm-h2" id="hm-how">{HOW.h2}</h2>
          <p className="hm-lead" style={{ marginBottom: '18px' }}>{HOW.p}</p>
          <Link href="/engagement-model" className="hm-link">{HOW.link}</Link>
        </div>
        <ol className="hm-steps" style={{ listStyle: 'none' }}>
          {HOW.steps.map((s, i) => (
            <li className="hm-step" key={s.h}><b>{i + 1}</b><div><h3>{s.h}</h3><p>{s.p}</p></div></li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Cases() {
  const L = CASES.lead
  return (
    <section className="hm-sec hm-dark" id="results" aria-labelledby="hm-cases">
      <div className="hm-wrap">
        <div className="hm-head">
          <div><p className="hm-eyebrow">{CASES.eyebrow}</p><h2 className="hm-h2" id="hm-cases">{CASES.h2}</h2></div>
          <Link href="/case-studies" className="hm-link" style={{ whiteSpace: 'nowrap' }}>{CASES.all}</Link>
        </div>
        <div className="hm-cases">
          <article className="hm-case hm-case-lead">
            <img src={`/case-covers/${L.slug}.webp`} alt="" width="1280" height="720" loading="lazy" decoding="async" />
            <div className="hm-cbody">
              <div className="hm-cmeta">{L.meta}</div>
              <h3>{L.h}</h3>
              <div className="hm-big">{L.big}</div>
              <p>{L.p}</p>
              <blockquote>{L.quote}</blockquote>
              <span>{L.by}</span>
              <Link href={`/case-studies/${L.slug}`} className="hm-link">{L.link}</Link>
            </div>
          </article>
          {CASES.items.map(c => (
            <article className="hm-case" key={c.slug}>
              <img src={`/case-covers/${c.slug}.webp`} alt="" width="1280" height="720" loading="lazy" decoding="async" />
              <div className="hm-cbody">
                <div className="hm-cmeta">{c.meta}</div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
                <Link href={`/case-studies/${c.slug}`} className="hm-link">{c.link}</Link>
              </div>
            </article>
          ))}
        </div>
        <div className="hm-banner hm-banner-orange">
          <div><h3>{CASES.banner.h}</h3><p>{CASES.banner.p}</p></div>
          <div className="hm-btn-row">
            <a href="#audit" className="hm-btn hm-btn-dark">{CASES.banner.primary}</a>
            <Link href="/contact" className="hm-btn hm-btn-light">{CASES.banner.secondary}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="hm-sec hm-wrap hm-about" id="about" aria-labelledby="hm-about">
      <div className="hm-two">
        <div>
          <p className="hm-eyebrow">{ABOUT.eyebrow}</p>
          <h2 className="hm-h2" id="hm-about">{ABOUT.h2}</h2>
          {ABOUT.paras.map(p => <p className="hm-ap" key={p.slice(0, 24)}>{p}</p>)}
          <div className="hm-sign">{ABOUT.sign}</div>
          <div className="hm-links">{ABOUT.links.map(([t, h]) => <Link key={t} href={h} className="hm-link">{t}</Link>)}</div>
        </div>
        <div>
          <div className="hm-mission"><div className="hm-eyebrow" style={{ fontSize: '11px', color: 'var(--hm-peach, #FF9A66)' }}>{ABOUT.mission.eyebrow}</div><p>{ABOUT.mission.t}</p></div>
          <div className="hm-glance">
            <h3>{ABOUT.glance.h}</h3>
            <dl>{ABOUT.glance.rows.map(([k, v]) => <Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>)}</dl>
          </div>
        </div>
      </div>
      <div className="hm-values">
        {ABOUT.values.map(v => <div className="hm-value" key={v.h}><h3>{v.h}</h3><p>{v.p}</p></div>)}
      </div>
      <div className="hm-journey">
        <h3>{ABOUT.journeyH}</h3>
        <div className="hm-jgrid">
          {ABOUT.journey.map(j => <div className="hm-jitem" key={j.when}><b>{j.when}</b><span>{j.t}</span></div>)}
        </div>
      </div>
    </section>
  )
}

function Team({ team }) {
  if (!team.length) return null
  return (
    <section className="hm-sec hm-alt" id="team" aria-labelledby="hm-team">
      <div className="hm-wrap">
        <div className="hm-head">
          <div>
            <p className="hm-eyebrow">{TEAM.eyebrow}</p>
            <h2 className="hm-h2" id="hm-team">{TEAM.h2}</h2>
            <p className="hm-lead" style={{ marginTop: '14px' }}>{TEAM.sub}</p>
          </div>
          <Link href="/about" className="hm-link" style={{ whiteSpace: 'nowrap' }}>{TEAM.link}</Link>
        </div>
        <div className="hm-team">
          {team.map(m => {
            const first = (m.name || '').split(' ')[0].toLowerCase()
            const photo = m.avatar_url || TEAM.localAvatars[first]
            const founder = TEAM.founders.includes(first)
            const name = first === 'palani' ? 'Palaniappan SN' : m.name
            return (
              <article className="hm-member" key={m.id}>
                <div className="hm-photo">{photo ? <img src={photo} alt={name} loading="lazy" decoding="async" /> : <span>{initials(name)}</span>}</div>
                <div className="hm-mbody">
                  <h3>{name}</h3>
                  <div className="hm-mrole">{[founder && 'Co-Founder', m.role].filter(Boolean).join(' · ')}</div>
                  {m.bio && <p>{m.bio}</p>}
                  {m.linkedin_url && <a href={m.linkedin_url} className="hm-link" {...ext}>LinkedIn</a>}
                </div>
              </article>
            )
          })}
        </div>
        <div className="hm-hiring">
          <span><b>We’re hiring</b> {TEAM.hiring.replace('We’re hiring ', '')}</span>
          <a href={`mailto:${EMAIL}?subject=Careers%20at%20StratAI`} className="hm-link">{TEAM.hiringLink}</a>
        </div>
      </div>
    </section>
  )
}

function Trust({ reviews }) {
  return (
    <section className="hm-sec hm-dark" aria-labelledby="hm-trust">
      <div className="hm-wrap">
        <p className="hm-eyebrow">{TRUST.eyebrow}</p>
        <h2 className="hm-h2" id="hm-trust" style={{ maxWidth: '820px' }}>{TRUST.h2}</h2>
        <div className="hm-trust">
          <div className="hm-promise">
            <div className="hm-promise-head"><h3>{TRUST.promiseH}</h3><span className="hm-stamp">{TRUST.stamp}</span></div>
            {TRUST.promises.map(p => (
              <div className="hm-prom" key={p.h}><i><Icon name={p.icon} /></i><div><h4>{p.h}</h4><p>{p.p}</p></div></div>
            ))}
            <div className="hm-signers">{TRUST.signers.map(s => <div key={s}>{s}<small>Co-Founder</small></div>)}</div>
          </div>
          <div>
            <div className="hm-eyebrow" style={{ fontSize: '11px' }}>{TRUST.reviewsEyebrow}</div>
            <div className="hm-reviews">
              {reviews.map(r => (
                <figure className="hm-review" key={r.id} style={{ margin: 0 }}>
                  <div className="hm-stars" aria-label={`${r.rating || 5} out of 5`}>{'★'.repeat(Math.max(1, Math.min(5, Math.round(r.rating || 5))))}</div>
                  <blockquote>“{(r.quote || '').replace(/\s*\n\s*/g, ' ')}”</blockquote>
                  <figcaption className="hm-who"><i>{initials(r.client_name)}</i><span><b>{r.client_name}</b>{[r.role, r.company].filter(Boolean).join(', ')}</span></figcaption>
                </figure>
              ))}
            </div>
            <Link href="/testimonials" className="hm-link" style={{ display: 'inline-block', marginTop: '16px' }}>{TRUST.reviewsLink}</Link>
          </div>
        </div>
        <div className="hm-verify">
          <p>{TRUST.verifyH}</p>
          <div className="hm-verify-row">
            {TRUST.verify.map(v => {
              const body = <><Icon name={v.icon} /><div><b>{v.h}</b><span>{v.p}</span></div></>
              if (!v.href) return <div className="hm-vchip" key={v.h}>{body}</div>
              return v.href.startsWith('/')
                ? <Link className="hm-vchip" href={v.href} key={v.h}>{body}</Link>
                : <a className="hm-vchip" href={v.href} key={v.h} {...ext}>{body}</a>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Location() {
  return (
    <section className="hm-sec hm-alt" aria-labelledby="hm-loc">
      <div className="hm-wrap">
        <div className="hm-two">
          <div>
            <p className="hm-eyebrow">{LOCATION.eyebrow}</p>
            <h2 className="hm-h2" id="hm-loc">{LOCATION.h2}</h2>
            <p className="hm-lead" style={{ marginBottom: '22px', fontSize: '16px' }}>{LOCATION.p}</p>
            <address className="hm-addr" style={{ fontStyle: 'normal' }}>
              <b>{LOCATION.org}</b><br />
              {ADDRESS_LINES[0]}<br />{ADDRESS_LINES[1]}<br />
              <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </address>
            <Link href="/services" className="hm-link">{LOCATION.link}</Link>
          </div>
          <div className="hm-map">
            <iframe src={MAP_SRC} title="StratAI office on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  )
}

function Hub({ posts }) {
  if (!posts.length) return null
  return (
    <section className="hm-sec hm-wrap" id="insights" aria-labelledby="hm-hub">
      <div className="hm-head">
        <div><p className="hm-eyebrow">{HUB.eyebrow}</p><h2 className="hm-h2" id="hm-hub">{HUB.h2}</h2></div>
        <Link href="/knowledge-hub" className="hm-link" style={{ whiteSpace: 'nowrap' }}>{HUB.all}</Link>
      </div>
      <div className="hm-hub">
        {posts.map(p => (
          <Link href={`/blog/${p.slug}`} className="hm-post" key={p.id}>
            <span className="hm-ptag">{p.category_name}</span>
            <h3>{p.title}</h3>
            <p>{clip(p.excerpt)}</p>
            <small>{[fmtDate(p.published_at), p.read_time_minutes && `${p.read_time_minutes} min read`, p.author_name && `By ${p.author_name}`].filter(Boolean).join(' · ')}</small>
          </Link>
        ))}
      </div>
    </section>
  )
}

function Faq() {
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.items.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  return (
    <section className="hm-sec hm-alt" aria-labelledby="hm-faq">
      <div className="hm-wrap">
        <div className="hm-faq">
          <h2 id="hm-faq">{FAQ.h2}</h2>
          {FAQ.items.map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  )
}

function Resources() {
  return (
    <section className="hm-sec-tight hm-wrap" aria-labelledby="hm-res">
      <h2 className="hm-h2" id="hm-res" style={{ fontSize: 'clamp(24px,2.6vw,32px)', marginBottom: 0 }}>{RESOURCES.h2}</h2>
      <div className="hm-res">
        {RESOURCES.items.map(r => (
          <Link href={r.href} className="hm-resc" key={r.h}><span className="hm-ptag">{r.tag}</span><h3>{r.h}</h3><p>{r.p}</p></Link>
        ))}
      </div>
    </section>
  )
}

function Final() {
  return (
    <section className="hm-sec hm-dark" aria-labelledby="hm-final">
      <div className="hm-wrap hm-final">
        <div>
          <h2 className="hm-h2" id="hm-final" style={{ maxWidth: '720px' }}>{FINAL.h2}</h2>
          <p className="hm-lead" style={{ marginBottom: '18px' }}>{FINAL.p}</p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.6)', margin: 0 }}>{FINAL.micro}</p>
        </div>
        <div className="hm-btn-row">
          <a href="#audit" className="hm-btn hm-btn-primary">{FINAL.primary}</a>
          <a href={WHATSAPP} className="hm-btn hm-btn-light" {...ext}>{FINAL.secondary}</a>
        </div>
      </div>
    </section>
  )
}

export default function HomeView({ stats = [], reviews = [], posts = [], team = [] }) {
  return (
    <div className="hm">
      <style dangerouslySetInnerHTML={{ __html: HOME_CSS }} />
      <Hero />
      <TrustBar stats={stats} />
      <Pains />
      <Systems />
      <How />
      <Cases />
      <About />
      <Team team={team} />
      <Trust reviews={reviews} />
      <Location />
      <Hub posts={posts} />
      <Faq />
      <Resources />
      <Final />
    </div>
  )
}
