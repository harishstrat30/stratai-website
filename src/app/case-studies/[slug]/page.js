import { caseStudySchema, breadcrumbSchema, faqSchema, serializeSchema } from '@/lib/schema'
import { getCaseStudy, getContentImages, getCTAButtons } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AuthorBlock from '@/components/ui/AuthorBlock'
import ContactForm from '@/components/ui/ContactForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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
  return data
}

async function getAllCaseStudies() {
  const { data } = await sb
    .from('case_studies')
    .select('id,title,slug,client,industry,kpis,tags')
    .eq('status', 'published')
  return data || []
}

export async function generateMetadata({ params }) {
  const cs = await getCaseStudyFull(params.slug)
  if (!cs) return { title: 'Case Study not found — StratAI' }
  const base = 'https://stratai.io'
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
      ...(cs.og_image_url ? { images: [{ url: cs.og_image_url, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card:        'summary_large_image',
      title:       cs.og_title       || cs.meta_title    || cs.title,
      description: cs.og_description || cs.meta_description || '',
      ...(cs.og_image_url ? { images: [cs.og_image_url] } : {}),
    },
  }
}

export default async function CaseStudyPage({ params }) {
  const [cs, allCS, ctas] = await Promise.all([
    getCaseStudyFull(params.slug),
    getAllCaseStudies(),
    getCTAButtons().catch(() => ({})),
  ])
  if (!cs) notFound()

  const images = cs.id ? await getContentImages('case_study', cs.id).catch(() => []) : []
  const kpis   = Array.isArray(cs.kpis) ? cs.kpis : []
  const tags   = Array.isArray(cs.tags) ? cs.tags : []
  const related = allCS.filter(c => c.slug !== cs.slug).slice(0, 3)
  const resultsCta = ctas.cases_results || { text: 'WANT SIMILAR RESULTS? →', href: '/contact' }

    const faqs          = Array.isArray(cs.faqs) ? cs.faqs : []
  const keyTakeaways  = Array.isArray(cs.key_takeaways) ? cs.key_takeaways : []
  const schemas = [
    caseStudySchema(cs),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Case Studies', url: '/case-studies' },
      { name: cs.title, url: `/case-studies/${cs.slug}` },
    ]),
    ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
  ].filter(Boolean)

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(s) }} />
      ))}
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── HERO — dark, large KPI numbers ─────────────────────────── */}
      <div style={{
        background: 'var(--bg-dark)', borderBottom: '1px solid #222',
        padding: '80px 24px 0', position: 'relative', overflow: 'hidden',
      }}>
        <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
            <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>HOME</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>›</span>
            <Link href="/case-studies" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>CASE STUDIES</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>›</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)' }}>{cs.client || 'PROJECT'}</span>
          </div>

          {/* Industry + Client badges */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {[cs.industry, cs.client].filter(Boolean).map((t, j) => (
              <span key={j} style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.08em', color: 'var(--orange)', padding: '4px 14px',
                border: '1px solid rgba(255,85,0,0.3)', borderRadius: '9999px',
                background: 'rgba(255,85,0,0.06)',
              }}>
                {t.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 5vw, 68px)',
            fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0,
            color: '#fff', marginBottom: '32px', maxWidth: '900px',
          }}>
            {cs.title.toUpperCase()}
          </h1>

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '48px' }}>
              {tags.map((tag, i) => (
                <span key={i} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500,
                  letterSpacing: '0.06em', color: 'rgba(255,255,255,0.5)',
                  padding: '3px 12px', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '9999px',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* KPI strip — full width, flush to hero bottom */}
          {kpis.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(kpis.length, 5)}, 1fr)`,
              gap: '1px',
              background: 'rgba(255,255,255,0.06)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              marginLeft: '-24px', marginRight: '-24px',
            }}>
              {kpis.map((kpi, i) => (
                <div key={i} style={{
                  padding: '32px 28px 28px',
                  background: i === 0 ? 'rgba(255,85,0,0.06)' : 'transparent',
                  position: 'relative',
                }}>
                  {i === 0 && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--orange)' }} />
                  )}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 52px)',
                    fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1,
                    color: i === 0 ? 'var(--orange)' : '#fff',
                    marginBottom: '10px',
                  }}>
                    {kpi.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: '4px',
                  }}>
                    {kpi.label}
                  </div>
                  {kpi.description && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>
                      {kpi.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ── MAIN IMAGE ────────────────────────────────────────────────── */}
      {images[0] && (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <img
            src={images[0].public_url}
            alt={images[0].alt_text || cs.title}
            style={{ width: '100%', aspectRatio: '21/8', objectFit: 'cover', display: 'block', border: '1px solid var(--border)', borderTop: 'none' }}
          />
        </div>
      )}

      {/* ── BODY + SIDEBAR ────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 0', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '72px', alignItems: 'start' }} className="cs-body-grid">

        {/* Body */}
        <div>
          {/* ── Summary (AEO) ── */}
          {cs.summary && (
            <div style={{ marginBottom: '40px', padding: '20px 24px', background: 'var(--bg2)', border: '1px solid var(--border)', borderLeft: '3px solid var(--orange)', borderRadius: 'var(--rs)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--orange)', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '8px' }}>
                OVERVIEW
              </div>
              <p style={{ fontSize: '15px', color: 'var(--text2)', lineHeight: '1.75', margin: 0 }}>{cs.summary}</p>
            </div>
          )}

          {/* ── Key Takeaways (AEO) ── */}
          {Array.isArray(cs.key_takeaways) && cs.key_takeaways.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '14px' }}>
                KEY TAKEAWAYS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cs.key_takeaways.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 14px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--rs)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--orange)', flexShrink: 0, marginTop: '1px' }}>{String(i+1).padStart(2,'0')}</span>
                    <span style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.6' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cs.challenge && (
            <div style={{ marginBottom: '48px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '14px' }}>
                THE CHALLENGE
              </div>
              <p style={{ fontSize: '17px', color: 'var(--text2)', lineHeight: '1.8' }}>{cs.challenge}</p>
            </div>
          )}

          {cs.solution && (
            <div style={{ marginBottom: '48px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '14px' }}>
                WHAT WE BUILT
              </div>
              <p style={{ fontSize: '17px', color: 'var(--text2)', lineHeight: '1.8' }}>{cs.solution}</p>
            </div>
          )}

          {/* AEO Summary */}
          {cs.summary && (
            <div style={{ margin: '0 0 40px', padding: '20px 24px', background: 'var(--bg2)', borderLeft: '3px solid var(--orange)', borderRadius: '0 var(--r) var(--r) 0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '10px' }}>SUMMARY</div>
              <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: '1.75', margin: 0 }}>{cs.summary}</p>
            </div>
          )}

          {/* Key Takeaways */}
          {keyTakeaways.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '14px' }}>KEY TAKEAWAYS</div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {keyTakeaways.map((kt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: 'var(--text2)', lineHeight: '1.6' }}>
                    <span style={{ color: 'var(--orange)', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>→</span>
                    {kt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cs.content?.html && (
            <div className="prose" dangerouslySetInnerHTML={{ __html: cs.content.html }} />
          )}

          {/* FAQs */}
          {faqs.length > 0 && (
            <div style={{ marginTop: '48px', borderTop: '1px solid var(--border)', paddingTop: '36px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '20px' }}>FREQUENTLY ASKED QUESTIONS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: i < faqs.length - 1 ? '16px' : 0 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '8px', lineHeight: 1.3 }}>{faq.question}</h3>
                    <p style={{ fontSize: '15px', color: 'var(--text2)', lineHeight: '1.7', margin: 0 }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image gallery */}
          {images.length > 1 && (
            <div style={{ marginTop: '48px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.1em', marginBottom: '18px' }}>
                PROJECT GALLERY
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px' }}>
                {images.slice(1).map(img => (
                  <div key={img.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden' }}>
                    <img src={img.public_url} alt={img.alt_text || ''} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                    {img.caption && (
                      <div style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', background: 'var(--bg2)' }}>
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '16px' }} className="cs-sidebar">

          {/* KPI quick-reference card */}
          {kpis.length > 0 && (
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text3)' }}>
                  BY THE NUMBERS
                </span>
              </div>
              {kpis.map((kpi, i) => (
                <div key={i} style={{ padding: '16px 20px', borderBottom: i < kpis.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 600, color: 'var(--orange)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {kpi.value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.08em', marginTop: '4px' }}>
                    {kpi.label}
                  </div>
                  {kpi.description && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text3)', opacity: 0.7, marginTop: '2px' }}>
                      {kpi.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tags card */}
          {tags.length > 0 && (
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '16px 20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: '12px' }}>
                TAGS
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {tags.map((tag, i) => (
                  <span key={i} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500,
                    color: 'var(--orange)', padding: '3px 10px',
                    border: '1px solid var(--orange-border)', borderRadius: '9999px',
                    background: 'var(--orange-light)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA button */}
          <Link href={resultsCta.href} style={{
            display: 'block', padding: '14px', textAlign: 'center',
            background: 'var(--orange)', borderRadius: 'var(--rs)',
            fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.08em', color: '#fff', textDecoration: 'none',
          }}>
            {resultsCta.text}
          </Link>
        </div>
      </div>

      {/* ── FAQs (AEO/GEO) ─────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 0' }}>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '56px', marginBottom: '56px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '28px' }}>
              FREQUENTLY ASKED QUESTIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {faqs.map((faq, i) => (
                <details key={i} style={{ background: 'var(--bg)', padding: '0' }}>
                  <summary style={{
                    padding: '18px 24px', cursor: 'pointer', listStyle: 'none',
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,2vw,18px)',
                    fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    userSelect: 'none',
                  }}>
                    <span>{faq.question}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', color: 'var(--orange)', flexShrink: 0, marginLeft: '16px' }}>+</span>
                  </summary>
                  <div style={{ padding: '0 24px 20px', fontSize: '15px', color: 'var(--text2)', lineHeight: '1.75', borderTop: '1px solid var(--border)' }}>
                    <div style={{ paddingTop: '16px' }}>{faq.answer}</div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT FORM ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px' }}>
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: 'var(--r)', padding: '48px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '12px' }}>
              WANT SIMILAR RESULTS?
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--text)', marginBottom: '14px' }}>
              LET&#39;S TALK.
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: '15px', lineHeight: '1.7' }}>
              Tell us what you are working on and we&#39;ll design the right approach.
            </p>
          </div>
          <ContactForm source={`case-study-${cs.slug}`} />
        </div>
      </div>

      {/* ── AUTHOR ───────────────────────────────────────────────────── */}
      {cs.author_name && (
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>
          <AuthorBlock post={cs} />
        </div>
      )}

      {/* ── RELATED CASE STUDIES ─────────────────────────────────────── */}
      {related.length > 0 && (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.1em', marginBottom: '20px', borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
            MORE CASE STUDIES
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${related.length}, 1fr)`, gap: '1px', background: 'var(--border)' }}>
            {related.map(r => (
              <Link key={r.id} href={`/case-studies/${r.slug}`} style={{ display: 'block', padding: '28px', background: 'var(--bg)', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  {r.client?.toUpperCase() || 'PROJECT'}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '10px', lineHeight: 1.3 }}>
                  {r.title}
                </div>
                {r.kpis?.length > 0 && (
                  <div style={{ display: 'flex', gap: '16px' }}>
                    {r.kpis.slice(0, 2).map((k, j) => (
                      <div key={j}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--orange)', letterSpacing: '-0.02em' }}>{k.value}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text3)', letterSpacing: '0.06em' }}>{k.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
    </>
  )
}