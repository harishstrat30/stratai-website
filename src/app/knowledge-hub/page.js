import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'


export const metadata = {
  alternates: { canonical: 'https://stratai.io/knowledge-hub' },
  title: { absolute: 'AI for Manufacturing Knowledge Hub — Guides, Case Studies & Templates | StratAI™' },
  description: "StratAI's Knowledge Hub — practical guides, case studies and templates on AI for manufacturing companies. From AI lean manufacturing to generative AI — built for Indian mid-market manufacturers.",
  keywords: [
    'ai for manufacturing blog', 'ai lean manufacturing', 'ai cost savings manufacturing',
    'generative ai for manufacturers', 'ai digital twin manufacturing', 'ai roi for manufacturers',
    'ai adoption for manufacturers', 'ai production planning', 'manufacturing ai knowledge hub',
  ],
}

const sb = createClient(
  'https://cinlfqmiiabwmeunowol.supabase.co',
  'sb_publishable_cgStjgEhCnFlQi58_VYFvA_6gRE-tYo'
)

// M4: Active content = Blog, Case Studies, Templates only
// All others show "Upcoming"
const ACTIVE_TYPES = ['blog', 'case-study', 'template']

const HUB_TYPES = [
  { key: 'blog',        label: 'Blog',         icon: '✍️',  desc: 'Insights and practical guides on AI transformation',   active: true  },
  { key: 'case-study',  label: 'Case Studies',  icon: '💼',  desc: 'Real engagements, real AI Advantage System outcomes',  active: true  },
  { key: 'template',    label: 'Templates',     icon: '📋',  desc: 'Ready-to-use frameworks for AI projects',              active: true  },
  { key: 'ebook',       label: 'E-Books',       icon: '📘',  desc: 'Deep-dive downloadable guides',                        active: false },
  { key: 'whitepaper',  label: 'Whitepapers',   icon: '📄',  desc: 'Technical and strategic papers',                       active: false },
  { key: 'webinar',     label: 'Webinars',      icon: '💻',  desc: 'Live sessions and recorded Q&As',                      active: false },
  { key: 'video',       label: 'Videos',        icon: '🎬',  desc: 'Demos, walkthroughs, and recorded sessions',           active: false },
  { key: 'podcast',     label: 'Podcast',       icon: '🎙️',  desc: 'Conversations on AI strategy',                         active: false },
]

const TYPE_COLORS = {
  blog: '#FF5500', 'case-study': '#2563EB', template: '#D97706',
  ebook: '#7C3AED', whitepaper: '#475569', webinar: '#0891B2',
  video: '#DC2626', podcast: '#16A34A',
}

async function getBlogPosts() {
  const { data } = await sb
    .from('v_published_posts')
    .select('id,title,slug,excerpt,published_at,read_time_minutes,category_name')
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(100)
  return (data ?? []).map(p => ({
    ...p, type: 'blog',
    duration: p.read_time_minutes ? `${p.read_time_minutes} min read` : null,
  }))
}

async function getCaseStudies() {
  // v_published_case_studies has: id,title,slug,client,industry,challenge,solution,results,published_at
  // no excerpt column — use challenge as the card excerpt
  const { data } = await sb
    .from('v_published_case_studies')
    .select('id,title,slug,client,industry,challenge,published_at')
    .order('published_at', { ascending: false })
    .limit(20)
  return (data ?? []).map(cs => ({
    ...cs,
    type: 'case-study',
    excerpt: cs.challenge,
    duration: null,
  }))
}

async function getTemplates() {
  const { data } = await sb
    .from('resources')
    .select('id,title,slug,excerpt,published_at,read_time_minutes,resource_type,is_gated')
    .eq('resource_type', 'template')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(20)
  return (data ?? []).map(r => ({
    ...r,
    type: r.resource_type,
    duration: r.read_time_minutes ? `${r.read_time_minutes} min read` : null,
  }))
}

export default async function KnowledgeHubPage({ searchParams }) {
  const activeType = searchParams?.type || null

  let content = []
  if (!activeType || activeType === 'blog')         content = [...content, ...await getBlogPosts()]
  if (!activeType || activeType === 'case-study')   content = [...content, ...await getCaseStudies()]
  if (!activeType || activeType === 'template')     content = [...content, ...await getTemplates()]

  const activeHubTypes  = HUB_TYPES.filter(t => t.active)
  const upcomingTypes   = HUB_TYPES.filter(t => !t.active)
  const currentType     = HUB_TYPES.find(t => t.key === activeType)
  const isUpcoming      = activeType && !ACTIVE_TYPES.includes(activeType)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ background: 'var(--bg-dark)', borderBottom: '1px solid #222', padding: 'clamp(44px,6vw,80px) clamp(16px,4vw,24px) clamp(36px,5vw,64px)', position: 'relative', overflow: 'hidden' }}>
        <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.12 }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '14px' }}>KNOWLEDGE HUB</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,80px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff', marginBottom: '20px' }}>
            AI FOR MANUFACTURING —<br />
            <span style={{ color: 'var(--orange)' }}>KNOWLEDGE HUB.</span>
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', maxWidth: '500px', lineHeight: '1.65' }}>
            Practical resources on AI Advantage Systems — from blog posts and case studies to strategy templates.
          </p>
        </div>
      </div>

      {/* Filter bar — active types only */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)', position: 'sticky', top: '67px', zIndex: 100 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 24px', display: 'flex', gap: '4px', overflowX: 'auto' }}>
          <Link href="/knowledge-hub" style={{
            padding: '7px 16px', borderRadius: '9999px', fontFamily: 'var(--font-mono)', fontSize: '10px',
            fontWeight: 600, letterSpacing: '0.07em', textDecoration: 'none', whiteSpace: 'nowrap',
            background: !activeType ? 'var(--text)' : 'transparent',
            color: !activeType ? '#fff' : 'var(--text2)',
            border: !activeType ? '1px solid var(--text)' : '1px solid var(--border)',
          }}>ALL</Link>

          {activeHubTypes.map(t => (
            <Link key={t.key} href={`/knowledge-hub?type=${t.key}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px', borderRadius: '9999px', fontFamily: 'var(--font-mono)', fontSize: '10px',
              fontWeight: 600, letterSpacing: '0.07em', textDecoration: 'none', whiteSpace: 'nowrap',
              background: activeType === t.key ? TYPE_COLORS[t.key] : 'transparent',
              color: activeType === t.key ? '#fff' : 'var(--text2)',
              border: activeType === t.key ? `1px solid ${TYPE_COLORS[t.key]}` : '1px solid var(--border)',
            }}>
              <span>{t.icon}</span>{t.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(28px,4vw,48px) clamp(16px,4vw,24px)' }}>

        {/* Browse grid — shown when no filter */}
        {!activeType && (
          <div style={{ marginBottom: '56px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '0.1em', marginBottom: '20px' }}>BROWSE BY TYPE</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1px', background: 'var(--border)' }}>
              {/* Active types */}
              {activeHubTypes.map(t => (
                <Link key={t.key} href={`/knowledge-hub?type=${t.key}`} style={{
                  display: 'block', padding: '28px 24px', background: 'var(--bg)',
                  textDecoration: 'none', color: 'inherit', position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: TYPE_COLORS[t.key] }} />
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{t.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '6px' }}>{t.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', lineHeight: '1.5' }}>{t.desc}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: TYPE_COLORS[t.key], marginTop: '12px', letterSpacing: '0.06em', fontWeight: 600 }}>BROWSE →</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming state */}
        {isUpcoming && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>{currentType?.icon}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text3)', background: 'var(--bg3)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: '9999px', display: 'inline-block', marginBottom: '16px' }}>UPCOMING</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '12px' }}>{currentType?.label} — Coming Soon</h2>
            <p style={{ fontSize: '15px', color: 'var(--text2)', maxWidth: '420px', margin: '0 auto 28px', lineHeight: 1.7 }}>
              Our team is working on {currentType?.label.toLowerCase()} content. Check back soon — or follow us on LinkedIn for updates.
            </p>
            <Link href="/knowledge-hub" style={{ display: 'inline-flex', padding: '10px 24px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
              ← Back to All Content
            </Link>
          </div>
        )}

        {/* Content grid */}
        {!isUpcoming && (
          <div>
            {content.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.08em' }}>
                NO CONTENT YET IN THIS CATEGORY
              </div>
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '0.1em', marginBottom: '20px' }}>
                  {activeType ? `${currentType?.label?.toUpperCase()} · ${content.length} ITEMS` : `ALL CONTENT · ${content.length} ITEMS`}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1px', background: 'var(--border)' }}>
                  {content.map(item => <HubCard key={`${item.type}-${item.id}`} item={item} />)}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function HubCard({ item }) {
  const color    = TYPE_COLORS[item.type] || 'var(--orange)'
  const typeInfo = HUB_TYPES.find(t => t.key === item.type)
  const href     = item.type === 'blog'
    ? `/blog/${item.slug}`
    : item.type === 'case-study'
      ? `/case-studies/${item.slug}`
      : `/knowledge-hub/${item.slug}`

  return (
    <Link href={href} style={{ display: 'block', background: 'var(--bg)', padding: '32px', textDecoration: 'none', color: 'inherit', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: color }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', color, background: `${color}15`, padding: '3px 10px', borderRadius: '9999px', border: `1px solid ${color}30` }}>
          {typeInfo?.icon} {item.type?.toUpperCase().replace('-', ' ')}
        </span>
        {item.client && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--text3)', background: 'var(--bg3)', padding: '3px 8px', borderRadius: '9999px', border: '1px solid var(--border)' }}>
            {item.client.toUpperCase()}
          </span>
        )}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,2vw,22px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.25, color: 'var(--text)', marginBottom: '10px' }}>
        {item.title}
      </h3>
      {item.excerpt && (
        <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.6', marginBottom: '16px' }}>
          {item.excerpt.slice(0, 120)}{item.excerpt.length > 120 ? '…' : ''}
        </p>
      )}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
        {item.duration && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.05em' }}>{item.duration.toUpperCase()}</span>}
        {item.published_at && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.05em' }}>{new Date(item.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}</span>}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color, fontWeight: 600, marginLeft: 'auto' }}>→</span>
      </div>
    </Link>
  )
}
