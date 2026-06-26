
import { getPosts, getCategories } from '@/lib/supabase'
import Link from 'next/link'
export const metadata = {
  title: { absolute: 'AI for Manufacturing Blog | StratAI™ — Insights & Guides' },
  description: "Read StratAI's blog on AI for manufacturing companies — practical insights on AI consulting, transformation, implementation and P&L impact for mid-market manufacturers in India.",
  keywords: [
    'ai consulting services', 'ai for manufacturing companies', 'manufacturing ai solutions',
    'ai transformation manufacturing', 'industrial ai services', 'manufacturing ai blog',
  ],
  alternates: { canonical: 'https://stratai.io/blog' },
}
export default async function BlogPage() {
  const page = 1, cat = null
  const { posts=[], total=0, limit=50 } = await getPosts({ page:1, limit:50, category:null }).catch(()=>({ posts:[], total:0, limit:50 }))
  const categories = await getCategories().catch(()=>[])
  const totalPages = 1
  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      <div className="dot-grid" style={{ background:'var(--bg2)', borderBottom:'1px solid var(--border)', padding:'72px 24px 48px' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <span className="section-label">INTELLIGENCE</span>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,6vw,72px)', fontWeight:600, letterSpacing:'-0.04em', lineHeight:1.0, marginBottom:'16px', color:'var(--text)' }}>AI FOR MANUFACTURING —<br />BLOG &amp; INSIGHTS.</h1>
          <p style={{ color:'var(--text2)', fontSize:'17px', maxWidth:'440px', lineHeight:'1.6' }}>AI consulting insights for manufacturing companies in India. Real deployments, implementation guides, and P&amp;L-impact stories — no fluff.</p>
        </div>
      </div>
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'48px 24px' }}>
        {categories.length>0&&(
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'40px' }}>
            <Link href="/blog" style={{ padding:'6px 16px', borderRadius:'9999px', fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:600, letterSpacing:'0.08em', textDecoration:'none', background:!cat?'var(--text)':'transparent', color:!cat?'#fff':'var(--text3)', border:`1px solid ${!cat?'var(--text)':'var(--border)'}`, transition:'all 0.15s' }}>ALL</Link>
            {categories.map(c=>(
              <Link key={c.id} href={`/blog?category=${c.slug}`} style={{ padding:'6px 16px', borderRadius:'9999px', fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:600, letterSpacing:'0.08em', textDecoration:'none', background:cat===c.slug?'var(--orange)':'transparent', color:cat===c.slug?'#fff':'var(--text3)', border:`1px solid ${cat===c.slug?'var(--orange)':'var(--border)'}`, transition:'all 0.15s' }}>{c.name.toUpperCase()}</Link>
            ))}
          </div>
        )}
        {posts.length===0?(
          <div style={{ textAlign:'center', padding:'80px', color:'var(--text3)', fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.08em' }}>NO POSTS YET</div>
        ):(
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:'1px', background:'var(--border)', marginBottom:'40px' }}>
            {posts.map((post,i)=>(
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ display:'block', background:'var(--bg)', padding:'32px', textDecoration:'none', color:'inherit', position:'relative' }}>
                <div style={{ position:'absolute', top:0, left:0, width:'3px', height:'100%', background:i===0?'var(--orange)':'transparent' }} />
                {post.category_name&&<div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--orange)', letterSpacing:'0.1em', fontWeight:600, marginBottom:'12px' }}>{post.category_name.toUpperCase()}</div>}
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(17px,2vw,22px)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.2, marginBottom:'12px', color:'var(--text)' }}>{post.title}</h2>
                {post.excerpt&&<p style={{ fontSize:'14px', color:'var(--text2)', lineHeight:'1.6', marginBottom:'18px' }}>{post.excerpt.slice(0,110)}{post.excerpt.length>110?'…':''}</p>}
                <div style={{ display:'flex', gap:'14px', flexWrap:'wrap', fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text3)', letterSpacing:'0.05em' }}>
                  {post.author_name&&<span>{post.author_name.toUpperCase()}</span>}
                  {post.published_at&&<span>{new Date(post.published_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}).toUpperCase()}</span>}
                  {post.read_time_minutes&&<span>{post.read_time_minutes} MIN READ</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
        {totalPages>1&&(
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px' }}>
            {page>1&&<Link href={`/blog?page=${page-1}${cat?`&category=${cat}`:''}`} style={{ padding:'8px 20px', border:'1px solid var(--border)', borderRadius:'9999px', fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text2)', textDecoration:'none' }}>← PREV</Link>}
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text3)' }}>{page} / {totalPages}</span>
            {page<totalPages&&<Link href={`/blog?page=${page+1}${cat?`&category=${cat}`:''}`} style={{ padding:'8px 20px', border:'1px solid var(--border)', borderRadius:'9999px', fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text2)', textDecoration:'none' }}>NEXT →</Link>}
          </div>
        )}
      </div>
    </div>
  )
}
