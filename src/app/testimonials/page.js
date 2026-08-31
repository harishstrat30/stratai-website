import Link from 'next/link'
import { getTestimonials, getFeaturedVideoTestimonial } from '@/lib/supabase'
import { testimonialSchema, breadcrumbSchema, serializeSchema } from '@/lib/schema'
import TestimonialsPageGrid from '@/components/sections/TestimonialsPageGrid'

export const revalidate = 60

export const metadata = {
  alternates: { canonical: 'https://stratai.io/testimonials' },
  title: { absolute: 'Client Testimonials — Video, Audio & Written Reviews | StratAI™' },
  description: "Hear directly from StratAI's manufacturing clients — video testimonials, audio interviews with transcripts, and written reviews on the AI Advantage Systems that moved their P&L.",
  keywords: [
    'stratai testimonials', 'stratai client reviews', 'ai manufacturing case studies',
    'client video testimonials', 'manufacturing ai reviews',
  ],
}

const LIMIT = 12
const TYPE_TABS = [
  { key: null, label: 'ALL' },
  { key: 'video', label: '▶ VIDEO' },
  { key: 'audio', label: '♫ AUDIO' },
  { key: 'text', label: '" WRITTEN' },
]

function buildHref({ type, page }) {
  const params = new URLSearchParams()
  if (type) params.set('type', type)
  if (page && page > 1) params.set('page', String(page))
  const qs = params.toString()
  return qs ? `/testimonials?${qs}` : '/testimonials'
}

export default async function TestimonialsPage({ searchParams }) {
  const type = searchParams?.type && ['video', 'audio', 'text'].includes(searchParams.type) ? searchParams.type : null
  const page = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1)

  // The pinned hero is only ever *shown* on the unfiltered first page, but it must
  // stay excluded from the underlying paginated set on every page of the unfiltered
  // view — otherwise it silently rejoins the list on page 2+, which shifts every
  // later page by one and duplicates an item across the page boundary. Once a type
  // filter is active there's no separate hero, so it's just a normal grid item there.
  const featuredForExclusion = !type ? await getFeaturedVideoTestimonial().catch(() => null) : null
  const featured = page === 1 ? featuredForExclusion : null

  const { testimonials, total } = await getTestimonials({
    type, page, limit: LIMIT, excludeId: featuredForExclusion?.id || null,
  }).catch(() => ({ testimonials: [], total: 0 }))

  const totalPages = Math.max(1, Math.ceil(total / LIMIT))
  const allSchemaItems = featured ? [featured, ...testimonials] : testimonials

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--border)', padding: '80px 24px 56px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '12px' }}>CLIENT VOICES</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,6vw,76px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--text)', marginBottom: '18px' }}>
            HEAR IT FROM THE<br />PEOPLE WE'VE HELPED.
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '17px', maxWidth: '520px', lineHeight: '1.65' }}>
            Video, audio, and written testimonials from manufacturing leaders who put StratAI's AI Advantage Systems to work.
          </p>
        </div>
      </div>

      {/* Filter bar — same ?type= pattern as Knowledge Hub */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)', position: 'sticky', top: '67px', zIndex: 100 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 24px', display: 'flex', gap: '4px', overflowX: 'auto' }}>
          {TYPE_TABS.map(t => {
            const active = type === t.key
            return (
              <Link key={t.key || 'all'} href={buildHref({ type: t.key, page: 1 })} style={{
                padding: '7px 16px', borderRadius: '9999px', fontFamily: 'var(--font-mono)', fontSize: '10px',
                fontWeight: 600, letterSpacing: '0.07em', textDecoration: 'none', whiteSpace: 'nowrap',
                background: active ? 'var(--text)' : 'transparent',
                color: active ? '#fff' : 'var(--text2)',
                border: active ? '1px solid var(--text)' : '1px solid var(--border)',
              }}>{t.label}</Link>
            )
          })}
        </div>
      </div>

      <div style={{ padding: '64px 0' }}>
        <TestimonialsPageGrid testimonials={testimonials} featured={featured} />

        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginTop: '56px' }}>
            {page > 1 && (
              <Link href={buildHref({ type, page: page - 1 })} style={{ padding: '8px 20px', border: '1px solid var(--border)', borderRadius: '9999px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text2)', textDecoration: 'none' }}>
                ← PREV
              </Link>
            )}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)' }}>{page} / {totalPages}</span>
            {page < totalPages && (
              <Link href={buildHref({ type, page: page + 1 })} style={{ padding: '8px 20px', border: '1px solid var(--border)', borderRadius: '9999px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text2)', textDecoration: 'none' }}>
                NEXT →
              </Link>
            )}
          </div>
        )}
      </div>

      {allSchemaItems.map(t => (
        <script key={t.id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(testimonialSchema(t)) }} />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Testimonials', url: '/testimonials' }])) }}
      />
    </div>
  )
}
