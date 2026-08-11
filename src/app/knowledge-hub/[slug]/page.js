import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AuthorBlock from '@/components/ui/AuthorBlock'

const sb = createClient('https://cinlfqmiiabwmeunowol.supabase.co','sb_publishable_cgStjgEhCnFlQi58_VYFvA_6gRE-tYo')

export async function generateStaticParams() {
  const { data } = await sb.from('resources').select('slug').eq('status','published')
  return (data || []).map(r => ({ slug: r.slug }))
}



const TYPE_COLORS = {
  blog:'#FF5500', checklist:'#16A34A', ebook:'#2563EB', podcast:'#7C3AED',
  template:'#D97706', video:'#DC2626', webinar:'#0891B2', whitepaper:'#475569',
}

export default async function HubItemPage({ params }) {
  const { data: raw } = await sb.from('resources').select('*').eq('slug', params.slug).eq('status', 'published').single()
  if (!raw) notFound()

  // Normalise resource fields to match the view shape used in the template
  const item = {
    ...raw,
    type: raw.resource_type,
    cover_image: raw.cover_url ?? null,
    duration: raw.read_time_minutes ? `${raw.read_time_minutes} min read` : null,
    content: raw.content ? { html: raw.content } : null,
    author_name: null,
    video_url: null,
    podcast_url: null,
  }

  const color = TYPE_COLORS[item.type] || 'var(--orange)'
  const { data: relatedRaw } = await sb
    .from('resources')
    .select('id,title,slug,resource_type,read_time_minutes,excerpt')
    .eq('resource_type', raw.resource_type)
    .eq('status', 'published')
    .neq('slug', params.slug)
    .limit(3)
  const related = (relatedRaw ?? []).map(r => ({
    ...r,
    type: r.resource_type,
    duration: r.read_time_minutes ? `${r.read_time_minutes} min read` : null,
  }))

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      {/* Hero */}
      <div style={{ borderBottom:'1px solid var(--border)', padding:'80px 24px 56px', background:'var(--bg2)' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <Link href="/knowledge-hub" style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--orange)', textDecoration:'none', letterSpacing:'0.08em', display:'inline-flex', gap:'6px', alignItems:'center', marginBottom:'28px' }}>← KNOWLEDGE HUB</Link>
          <div style={{ display:'flex', gap:'8px', marginBottom:'18px' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:600, letterSpacing:'0.08em', color, background:`${color}15`, padding:'4px 12px', borderRadius:'9999px', border:`1px solid ${color}30` }}>
              {item.type?.toUpperCase()}
            </span>
            {item.is_gated && <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', fontWeight:600, color:'var(--text3)', background:'var(--bg3)', padding:'4px 10px', borderRadius:'9999px', border:'1px solid var(--border)' }}>REQUIRES SIGN-UP</span>}
          </div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,5vw,60px)', fontWeight:600, letterSpacing:'-0.04em', lineHeight:1.05, color:'var(--text)', marginBottom:'16px' }}>{item.title}</h1>
          {item.excerpt && <p style={{ fontSize:'18px', color:'var(--text2)', lineHeight:'1.7', borderLeft:`3px solid ${color}`, paddingLeft:'20px', marginBottom:'24px' }}>{item.excerpt}</p>}
          <div style={{ display:'flex', gap:'20px', fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text3)', letterSpacing:'0.06em', flexWrap:'wrap' }}>
            {item.author_name && <span>BY {item.author_name.toUpperCase()}</span>}
            {item.duration && <span>{item.duration.toUpperCase()}</span>}
            {item.published_at && <span>{new Date(item.published_at).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}).toUpperCase()}</span>}
          </div>
        </div>
      </div>

      {/* Cover image */}
      {item.cover_image && (
        <div style={{ maxWidth:'900px', margin:'0 auto', padding:'0 24px' }}>
          <img src={item.cover_image} alt={item.title} style={{ width:'100%', aspectRatio:'16/7', objectFit:'cover', display:'block', border:'1px solid var(--border)' }} />
        </div>
      )}

      {/* Video embed */}
      {item.video_url && (
        <div style={{ maxWidth:'900px', margin:'32px auto 0', padding:'0 24px' }}>
          <div style={{ position:'relative', paddingBottom:'56.25%', background:'#000', borderRadius:'8px', overflow:'hidden', border:'1px solid var(--border)' }}>
            <iframe src={item.video_url} style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      )}

      {/* Podcast player */}
      {item.podcast_url && (
        <div style={{ maxWidth:'900px', margin:'32px auto 0', padding:'0 24px' }}>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'8px', padding:'20px', display:'flex', alignItems:'center', gap:'16px' }}>
            <span style={{ fontSize:'32px' }}>🎙️</span>
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text3)', marginBottom:'6px' }}>LISTEN NOW</div>
              <a href={item.podcast_url} target="_blank" rel="noreferrer" style={{ fontFamily:'var(--font-display)', fontSize:'16px', fontWeight:600, color:color, textDecoration:'none' }}>Open in Podcast App →</a>
            </div>
          </div>
        </div>
      )}

      {/* Download asset */}
      {item.file_url && (
        <div style={{ maxWidth:'900px', margin:'32px auto 0', padding:'0 24px' }}>
          <a href={item.file_url} target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 24px', background:color, borderRadius:'9999px', fontFamily:'var(--font-mono)', fontSize:'12px', fontWeight:700, letterSpacing:'0.08em', color:'#fff', textDecoration:'none' }}>
            ↓ DOWNLOAD {item.type?.toUpperCase()}
          </a>
        </div>
      )}

      {/* Content */}
      {item.content?.html && (
        <div style={{ maxWidth:'780px', margin:'0 auto', padding:'56px 24px' }}>
          <div className="prose" dangerouslySetInnerHTML={{ __html: item.content.html }} />
        </div>
      )}

      {/* Author */}
      {item.author_name && (
        <div style={{ maxWidth:'780px', margin:'0 auto', padding:'0 24px' }}>
          <AuthorBlock post={item} />
        </div>
      )}

      {/* Related */}
      {related && related.length > 0 && (
        <div style={{ maxWidth:'900px', margin:'0 auto', padding:'0 24px 80px' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text3)', letterSpacing:'0.1em', marginBottom:'20px', borderTop:'1px solid var(--border)', paddingTop:'32px' }}>MORE {item.type?.toUpperCase()}S</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'var(--border)' }}>
            {related.map(r => (
              <Link key={r.id} href={`/knowledge-hub/${r.slug}`} style={{ display:'block', padding:'24px', background:'var(--bg)', textDecoration:'none', color:'inherit' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'15px', fontWeight:600, letterSpacing:'-0.02em', color:'var(--text)', marginBottom:'8px', lineHeight:1.3 }}>{r.title}</div>
                {r.duration && <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text3)' }}>{r.duration.toUpperCase()}</div>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
