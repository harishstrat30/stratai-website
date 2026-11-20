import { ogImages } from '@/lib/og'
import { caseStudySchema, blogPostSchema, breadcrumbSchema, faqSchema, serializeSchema } from '@/lib/schema'
import { getContentImages } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AuthorBlock from '@/components/ui/AuthorBlock'
import DiagnosticForm from '../DiagnosticForm'
import { CS_CSS, mono, display, orangeLink, CaseCard, firstSentence, caseCover } from '../shared'
import { attachCovers } from '../covers'
import { WHATSAPP_HREF, POST_CASES } from '../content'

export async function generateStaticParams() {
  const sb = createClient('https://cinlfqmiiabwmeunowol.supabase.co','sb_publishable_cgStjgEhCnFlQi58_VYFvA_6gRE-tYo')
  const { data } = await sb.from('case_studies').select('slug').eq('status','published')
  return (data || []).map(r => ({ slug: r.slug }))
}

const CASE_STUDIES_SEO = {
  'jewellery-manufacturer-ai-catalogue-order-management': {
    title: 'AI Implementation for Jewellery Manufacturer — Catalogue & Order Management Case Study | StratAI™',
    description: 'How StratAI implemented AI for a jewellery manufacturer to automate catalogue management and order processing — measurable results in a high-SKU manufacturing environment.',
  },
  'manufacturing-ai-p-and-l-impact': {
    title: 'Manufacturing AI Case Study — Measurable P&L Impact for Mid-Market Manufacturer | StratAI™',
    description: 'StratAI case study: how a mid-market manufacturer achieved measurable P&L impact through AI implementation across quality, throughput, and procurement operations.',
  },
}

const sb = createClient(
  'https://cinlfqmiiabwmeunowol.supabase.co',
  'sb_publishable_cgStjgEhCnFlQi58_VYFvA_6gRE-tYo'
)

async function getCaseStudyFull(slug) {
  const { data } = await sb
    .from('case_studies')
    .select('*, authors(name, slug, role, credentials, bio, linkedin_url, avatar_url)')
    .eq('slug', slug)
    .single()
  // Flatten author fields onto the object
  if (data?.authors) {
    const a = data.authors
    data.author_name         = a.name
    data.author_slug         = a.slug
    data.author_role         = a.role
    data.author_credentials  = a.credentials
    data.author_bio          = a.bio
    data.author_linkedin_url = a.linkedin_url
    data.author_avatar_url   = a.avatar_url
  }
  return data ? (await attachCovers([data]))[0] : data
}

// Long-form case studies stored as blog posts (see POST_CASES in ../content.js).
async function getPostAsCaseStudy(slug) {
  const extra = POST_CASES[slug]
  if (!extra) return null
  const { data } = await sb.from('v_published_posts').select('*').eq('slug', slug).maybeSingle()
  if (!data) return null
  return { ...data, ...extra, __fromPost: true, summary: data.summary || data.excerpt }
}

async function getAnyCaseStudy(slug) {
  return (await getCaseStudyFull(slug)) || (await getPostAsCaseStudy(slug))
}

async function getAllCaseStudies() {
  const { data } = await sb
    .from('case_studies')
    .select('id,title,slug,client,industry,challenge,kpis,tags,sort_order')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
  return attachCovers(data || [])
}

export async function generateMetadata({ params }) {
  const cs = await getAnyCaseStudy(params.slug)
  if (!cs) return { title: 'Case Study not found — StratAI' }
  const base = 'https://stratai.io'
  // Post-backed case studies keep their blog URL as canonical so the two pages are not duplicates.
  const url  = cs.canonical_url || `${base}/case-studies/${cs.slug}`
  const seoOverride = CASE_STUDIES_SEO[params.slug]
  return {
    title:       seoOverride?.title       || cs.meta_title    || cs.title,
    description: seoOverride?.description || cs.meta_description || cs.challenge?.slice(0, 160) || '',
    robots:      cs.robots        || 'index,follow',
    alternates:  { canonical: url },
    openGraph: {
      title:       cs.og_title       || cs.meta_title    || cs.title,
      description: cs.og_description || cs.meta_description || cs.challenge?.slice(0,160) || '',
      url,
      siteName: 'StratAI',
      type: 'article',
      images: ogImages(cs.og_image_url),
    },
    twitter: {
      card:        'summary_large_image',
      title:       cs.og_title       || cs.meta_title    || cs.title,
      description: cs.og_description || cs.meta_description || '',
      images: [cs.og_image_url || '/og'],
    },
  }
}

// Page-specific layout (shared card/form styles come from ../shared).
const CSD_CSS = `
.csd-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:56px;align-items:start}
.csd-two{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.csd-side{position:sticky;top:96px;display:flex;flex-direction:column;gap:16px}
.csd-takeaway{display:flex;gap:14px;align-items:flex-start;padding:16px 18px;border:1px solid var(--orange-border);border-radius:12px;background:var(--orange-light)}
.csd-prose{max-width:760px}
.csd-prose h2{margin-top:2.4rem}
@media (max-width:980px){
  .csd-grid{grid-template-columns:1fr;gap:36px}
  .csd-side{display:none}
  .csd-two{grid-template-columns:1fr}
}
`

const TIMELINE_KEYS = [['status', 'Status'], ['tracking', 'Results tracking'], ['outlook', 'Outlook'], ['note', 'Note']]

function Label({ children }) {
  return <div style={{ ...mono, fontSize: '11px', fontWeight: 700, color: 'var(--orange)', marginBottom: '12px' }}>{children}</div>
}

export default async function CaseStudyPage({ params }) {
  const [cs, allCS] = await Promise.all([
    getAnyCaseStudy(params.slug),
    getAllCaseStudies(),
  ])
  if (!cs) notFound()

  const images = cs.id ? await getContentImages(cs.__fromPost ? 'post' : 'case_study', cs.id).catch(() => []) : []
  const kpis   = Array.isArray(cs.kpis) ? cs.kpis : []
  const tags   = Array.isArray(cs.tags) ? cs.tags : []
  const related = allCS.filter(c => c.slug !== cs.slug).slice(0, 3)
  const faqs          = Array.isArray(cs.faqs) ? cs.faqs : []
  const keyTakeaways  = Array.isArray(cs.key_takeaways) ? cs.key_takeaways : []
  const intro = cs.summary || firstSentence(cs.challenge, 240)
  const timeline = Array.isArray(cs.timeline)
    ? cs.timeline
    : cs.results && typeof cs.results === 'object'
      ? TIMELINE_KEYS.map(([k, label]) => [label, cs.results[k]]).filter(([, v]) => typeof v === 'string' && v.trim())
      : []

  const schemas = [
    cs.__fromPost ? blogPostSchema(cs) : caseStudySchema(cs),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: cs.title, url: `/case-studies/${cs.slug}` },
    ]),
    ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
  ].filter(Boolean)

  const crumb = { fontSize: '13px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(s) }} />
      ))}
      <style dangerouslySetInnerHTML={{ __html: CS_CSS + CSD_CSS }} />
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section style={{ background: 'var(--bg-dark)', color: '#fff', padding: '28px 0 76px' }}>
          <div className="cs-wrap">
            <nav aria-label="Breadcrumb" style={{ ...crumb, display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '52px' }}>
              <Link href="/" style={crumb}>Home</Link> › <Link href="/case-studies" style={crumb}>Case Studies</Link> › <span>{cs.client || cs.industry || 'Project'}</span>
            </nav>
            <div className="cs-hero-grid">
              <div>
                <div style={{ ...mono, fontSize: '11px', fontWeight: 600, color: 'var(--orange2)', marginBottom: '18px' }}>
                  Case study{cs.industry ? ` · ${cs.industry}` : ''}
                </div>
                <h1 style={{ ...display, fontSize: cs.title.length > 80 ? 'clamp(24px,3vw,36px)' : 'clamp(28px,4vw,46px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 22px' }}>{cs.title}</h1>
                {intro && <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', maxWidth: '600px', margin: '0 0 22px' }}>{intro}</p>}
                {cs.client && <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '18px' }}>Client: {cs.client}</div>}
                {tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {tags.map(t => <span key={t} style={{ padding: '5px 12px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.16)', fontSize: '12px', color: 'rgba(255,255,255,0.72)' }}>{t}</span>)}
                  </div>
                )}
              </div>
              {kpis.length > 0 && (
                <div className="cs-stats">
                  {kpis.map((k, i) => (
                    <div key={k.label || i} style={{ padding: '22px 22px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
                      <div style={{ ...display, fontSize: '30px', fontWeight: 600, lineHeight: 1.1, color: i === 0 ? 'var(--orange2)' : '#fff' }}>{k.value}</div>
                      <div style={{ ...mono, fontSize: '10px', fontWeight: 700, color: 'var(--orange2)', margin: '8px 0 4px' }}>{k.label}</div>
                      {k.description && <div style={{ fontSize: '12.5px', lineHeight: 1.5, color: 'rgba(255,255,255,0.6)' }}>{k.description}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── BODY ─────────────────────────────────────────────────── */}
        <section style={{ padding: '64px 0 40px' }}>
          <div className="cs-wrap csd-grid">
            <article style={{ minWidth: 0 }}>

              <img src={caseCover(cs)} alt={`${cs.title} cover`} decoding="async" width="1280" height="720" style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 9', objectFit: 'cover', border: '1px solid var(--border)', borderRadius: '14px', marginBottom: '40px' }} />

              {keyTakeaways.length > 0 && (
                <div style={{ marginBottom: '44px' }}>
                  <Label>Key takeaways</Label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {keyTakeaways.map((t, i) => (
                      <div key={i} className="csd-takeaway">
                        <span style={{ ...mono, fontSize: '12px', fontWeight: 700, color: 'var(--orange)', marginTop: '2px' }}>{String(i + 1).padStart(2, '0')}</span>
                        <span style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--text2)' }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(cs.challenge || cs.solution) && (
                <div className="csd-two" style={{ marginBottom: '20px' }}>
                  {cs.challenge && (
                    <div style={{ padding: '26px', border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--bg2)' }}>
                      <Label>The challenge</Label>
                      <p style={{ fontSize: '15.5px', lineHeight: 1.75, color: 'var(--text2)', margin: 0, whiteSpace: 'pre-line' }}>{cs.challenge}</p>
                    </div>
                  )}
                  {cs.solution && (
                    <div style={{ padding: '26px', border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--bg2)' }}>
                      <Label>What we built</Label>
                      <p style={{ fontSize: '15.5px', lineHeight: 1.75, color: 'var(--text2)', margin: 0, whiteSpace: 'pre-line' }}>{cs.solution}</p>
                    </div>
                  )}
                </div>
              )}

              {timeline.length > 0 && (
                <div style={{ padding: '26px', border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--bg)', marginBottom: '44px' }}>
                  <Label>The timeline · where it stands</Label>
                  <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '10px 22px', fontSize: '15px', lineHeight: 1.6 }}>
                    {timeline.map(([label, value]) => (
                      <div key={label} style={{ display: 'contents' }}>
                        <dt style={{ fontWeight: 600, color: 'var(--text)' }}>{label}</dt>
                        <dd style={{ margin: 0, color: 'var(--text2)' }}>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {cs.content?.html && (
                <div style={{ marginTop: timeline.length ? 0 : '24px' }}>
                  <Label>The full story</Label>
                  <div className="prose csd-prose" dangerouslySetInnerHTML={{ __html: cs.content.html }} />
                </div>
              )}

              {images.length > 0 && (
                <div style={{ marginTop: '48px' }}>
                  <Label>Project gallery</Label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '12px' }}>
                    {images.map(img => (
                      <div key={img.id} style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                        <img src={img.public_url} alt={img.alt_text || ''} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                        {img.caption && <div style={{ padding: '8px 12px', fontSize: '12px', color: 'var(--text2)', background: 'var(--bg2)' }}>{img.caption}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {faqs.length > 0 && !cs.__fromPost && (
                <div style={{ marginTop: '56px' }}>
                  <h2 style={{ ...display, fontSize: '28px', fontWeight: 600, margin: '0 0 20px', color: 'var(--text)' }}>Questions about this project</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {faqs.map((f, i) => (
                      <details key={i} className="cs-faq" open={i === 0} style={{ border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg)', padding: '18px 22px' }}>
                        <summary style={{ fontWeight: 600, fontSize: '16px', color: 'var(--text)' }}>{f.question}</summary>
                        <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text2)', margin: '12px 0 0' }}>{f.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </article>

            <aside className="csd-side" aria-label="Book a diagnostic">
              <div style={{ padding: '26px', borderRadius: '14px', background: 'var(--bg-dark)', color: '#fff' }}>
                <div style={{ ...mono, fontSize: '10.5px', fontWeight: 700, color: 'var(--orange2)', marginBottom: '14px' }}>Your plant · Next case study</div>
                <h2 style={{ ...display, fontSize: '22px', fontWeight: 600, lineHeight: 1.25, margin: '0 0 12px' }}>Want a result like this in your plant?</h2>
                <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', margin: '0 0 20px' }}>A free 30-minute diagnostic shows which result is within reach and what it would take.</p>
                <a href="#diagnostic" style={{ display: 'block', textAlign: 'center', padding: '13px 16px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Book a plant diagnostic</a>
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', marginTop: '10px', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>Chat on WhatsApp</a>
              </div>
              <Link href="/case-studies" style={{ ...orangeLink, display: 'block', textAlign: 'center' }}>← All case studies</Link>
            </aside>
          </div>
        </section>

        {/* ── AUTHOR ───────────────────────────────────────────────── */}
        {cs.author_name && (
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px 40px' }}>
            <AuthorBlock post={cs} />
          </div>
        )}

        {/* ── MORE CASE STUDIES ────────────────────────────────────── */}
        {related.length > 0 && (
          <section style={{ background: 'var(--bg2)', padding: '64px 0' }}>
            <div className="cs-wrap">
              <h2 style={{ ...display, fontSize: '30px', fontWeight: 600, margin: '0 0 24px', color: 'var(--text)' }}>More AI case studies</h2>
              <div className="cs-grid">
                {related.map(r => <CaseCard key={r.id} item={r} />)}
              </div>
            </div>
          </section>
        )}

        {/* ── DIAGNOSTIC FORM ──────────────────────────────────────── */}
        <section id="diagnostic" style={{ background: 'var(--bg-dark)', color: '#fff', padding: '80px 0' }}>
          <div className="cs-wrap cs-cta">
            <div>
              <h2 style={{ ...display, fontSize: 'clamp(30px,4vw,44px)', fontWeight: 600, lineHeight: 1.1, margin: '0 0 18px' }}>Want results like these?</h2>
              <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', margin: '0 0 26px', maxWidth: '460px' }}>Book a free 30-minute plant diagnostic. We will show you which result is within reach for your plant, and what it would take.</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.28)', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Chat on WhatsApp</a>
                <Link href="/engagement-model" style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.28)', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>See pricing</Link>
              </div>
            </div>
            <DiagnosticForm source={`case-study-${cs.slug}`} />
          </div>
        </section>
      </div>
    </>
  )
}
