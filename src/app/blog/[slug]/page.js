import { blogPostSchema, breadcrumbSchema, faqSchema, serializeSchema } from '@/lib/schema'
import { getPost, getAllPostSlugs, getContentImages, getCTAButtons } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AuthorBlock from '@/components/ui/AuthorBlock'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs || []
}

const BLOG_SEO = {
  'ai-implementation-manufacturing-cxo-guide': {
    title: 'AI Implementation Strategy for Manufacturing CXOs — A Complete Guide | StratAI™',
    description: 'A CXO guide to AI implementation strategy for manufacturing companies — covering roadmap, change management, pilot programs, and how to ensure AI shows up in your P&L.',
  },
  'ai-agentic-systems-sap-erp-manufacturing-shop-floor': {
    title: 'ERP AI Integration for Manufacturing Shop Floor — SAP & Agentic Systems | StratAI™',
    description: 'How AI agentic systems integrate with SAP ERP on the manufacturing shop floor — covering MES, SCADA, PLC and workflow implementation for mid-market Indian manufacturers.',
  },
  'ai-vendor-selection-manufacturing-domain-expertise': {
    title: 'How to Choose the Right AI Vendor for Manufacturing — Domain Expertise Guide | StratAI™',
    description: 'A practical guide to AI vendor selection for manufacturing companies — what to look for in an AI consulting partner, why domain expertise matters, and red flags to avoid.',
  },
  'ai-jewellery-manufacturing-catalogue-order-management': {
    title: 'AI for Jewellery Manufacturing — Catalogue & Order Management | StratAI™',
    description: 'How StratAI implemented AI for a jewellery manufacturer to automate catalogue management and order processing — a practical example of factory AI implementation in a high-SKU environment.',
  },
  'production-black-box-manufacturing-visibility': {
    title: 'The Production Black Box — How AI Performance Monitoring Gives Manufacturers Real Visibility | StratAI™',
    description: 'Most manufacturers operate blind. Learn how AI performance monitoring and analytics eliminate the production black box — giving CXOs real-time OEE, downtime and shop floor visibility.',
  },
  'stratai-anthropic-claude-partner-network-india-manufacturing': {
    title: 'StratAI Joins Anthropic Claude Partner Network — AI Consulting for Indian Manufacturers | StratAI™',
    description: 'StratAI is now an official Anthropic Claude Partner Network member — expanding AI consulting services and Claude-powered implementations for mid-market manufacturing companies across India.',
  },
  'ai-in-manufacturing-why-most-cxos-invest-and-never-see-it-in-the-pl': {
    title: 'Why Most Manufacturing CXOs Invest in AI and Never See It in the P&L | StratAI™',
    description: 'Most AI investments in manufacturing never show up in the P&L. StratAI explains why — and how to build AI ROI for manufacturers through outcome-focused implementation, not activity.',
  },
}

export async function generateMetadata({ params }) {
  const p = await getPost(params.slug).catch(() => null)
  if (!p) return { title: 'Post not found — StratAI' }
  const base = 'https://stratai.io'
  const url  = p.canonical_url || `${base}/blog/${p.slug}`
  const seoOverride = BLOG_SEO[params.slug]
  return {
    title:       seoOverride?.title       || p.meta_title    || p.title,
    description: seoOverride?.description || p.meta_description || p.excerpt || '',
    robots:      p.robots        || 'index,follow',
    alternates:  { canonical: url },
    ...(p.author_name ? { authors: [{ name: p.author_name, url: p.author_linkedin_url || undefined }] } : {}),
    other: { 'content-language': 'en-IN' },
    openGraph: {
      title:       p.og_title       || p.meta_title    || p.title,
      description: p.og_description || p.meta_description || p.excerpt || '',
      url,
      siteName: 'StratAI',
      type: 'article',
      ...(p.og_image_url ? { images: [{ url: p.og_image_url, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card:        'summary_large_image',
      title:       p.og_title       || p.meta_title    || p.title,
      description: p.og_description || p.meta_description || '',
      ...(p.og_image_url ? { images: [p.og_image_url] } : {}),
    },
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug).catch(() => null)
  if (!post) notFound()

  const [images, ctas] = await Promise.all([
    post.id ? getContentImages('post', post.id).catch(() => []) : Promise.resolve([]),
    getCTAButtons().catch(() => ({}))
  ])

  const workCta      = ctas.blog_work || { text: 'WORK WITH US →', href: '/contact' }
  const faqs         = Array.isArray(post.faqs) ? post.faqs : []
  const keyTakeaways = Array.isArray(post.key_takeaways) ? post.key_takeaways : []
  // First image goes at top of content; rest in gallery at bottom
  const heroImage    = post.featured_image_public_url || (images.length > 0 ? images[0].public_url : null)
  const heroAlt      = post.featured_image_public_url ? post.title : (images[0]?.alt_text || post.title)
  const galleryImages = post.featured_image_public_url ? images : images.slice(1)

  const schemas = [
    blogPostSchema(post),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
    ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(s) }} />
      ))}
      <div style={{background:'var(--bg)',minHeight:'100vh'}}>

        {/* Hero */}
        <div style={{borderBottom:'1px solid var(--border)',padding:'72px 24px 56px',background:'var(--bg2)'}}>
          <div style={{maxWidth:'800px',margin:'0 auto'}}>
            <Link href="/blog" style={{fontFamily:'var(--font-mono)',fontSize:'11px',color:'var(--orange)',textDecoration:'none',letterSpacing:'0.08em',display:'inline-flex',alignItems:'center',gap:'6px',marginBottom:'24px'}}>← BACK TO BLOG</Link>
            {post.category_name && (
              <Link href={`/blog?category=${post.category_slug}`} style={{display:'inline-block',fontFamily:'var(--font-mono)',fontSize:'10px',fontWeight:600,color:'var(--orange)',letterSpacing:'0.1em',padding:'4px 12px',border:'1px solid var(--orange-border)',borderRadius:'9999px',textDecoration:'none',marginBottom:'18px',background:'var(--orange-light)'}}>
                {post.category_name.toUpperCase()}
              </Link>
            )}
            <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(28px,5vw,58px)',fontWeight:600,letterSpacing:'-0.04em',lineHeight:1.05,color:'var(--text)',marginBottom:'18px'}}>{post.title}</h1>
            <div style={{display:'flex',gap:'18px',flexWrap:'wrap',fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--text3)',letterSpacing:'0.06em',marginBottom:post.excerpt?'22px':'0'}}>
              {post.author_name && <span>BY {post.author_name.toUpperCase()}</span>}
              {post.published_at && <span>{new Date(post.published_at).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}).toUpperCase()}</span>}
              {post.read_time_minutes && <span>{post.read_time_minutes} MIN READ</span>}
            </div>
            {post.excerpt && <p style={{fontSize:'17px',color:'var(--text2)',lineHeight:'1.7',borderLeft:'3px solid var(--orange)',paddingLeft:'18px'}}>{post.excerpt}</p>}
          </div>
        </div>

        {/* Hero image — featured_image OR first uploaded content image */}
        {heroImage && (
          <div style={{maxWidth:'960px',margin:'0 auto',padding:'0 24px'}}>
            <img src={heroImage} alt={heroAlt} style={{width:'100%',aspectRatio:'16/7',objectFit:'cover',display:'block',border:'1px solid var(--border)',borderTop:'none'}} />
          </div>
        )}

        {/* Body */}
        <div style={{maxWidth:'780px',margin:'0 auto',padding:'56px 24px'}}>

          {/* AEO Summary */}
          {post.summary && (
            <div style={{marginBottom:'28px',padding:'16px 20px',background:'var(--bg2)',border:'1px solid var(--border)',borderLeft:'3px solid var(--orange)',borderRadius:'0 var(--rs) var(--rs) 0'}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'9px',color:'var(--orange)',letterSpacing:'0.12em',fontWeight:700,marginBottom:'7px'}}>OVERVIEW</div>
              <p style={{fontSize:'15px',color:'var(--text2)',lineHeight:'1.75',margin:0}}>{post.summary}</p>
            </div>
          )}

          {/* Key Takeaways */}
          {keyTakeaways.length > 0 && (
            <div style={{marginBottom:'32px'}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--orange)',letterSpacing:'0.12em',fontWeight:700,marginBottom:'12px'}}>KEY TAKEAWAYS</div>
              <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                {keyTakeaways.map((t, i) => (
                  <div key={i} style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'9px 12px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'var(--rs)'}}>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:'10px',fontWeight:700,color:'var(--orange)',flexShrink:0}}>{String(i+1).padStart(2,'0')}</span>
                    <span style={{fontSize:'14px',color:'var(--text2)',lineHeight:'1.6'}}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main content */}
          {post.content?.html
            ? <div className="prose" dangerouslySetInnerHTML={{__html: post.content.html}} />
            : <p style={{color:'var(--text3)',fontFamily:'var(--font-mono)',fontSize:'12px',letterSpacing:'0.06em'}}>CONTENT COMING SOON</p>
          }

          {/* Image gallery — remaining images after hero */}
          {galleryImages.length > 0 && (
            <div style={{marginTop:'48px',borderTop:'1px solid var(--border)',paddingTop:'36px'}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--text3)',letterSpacing:'0.1em',marginBottom:'18px'}}>IMAGES</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'10px'}}>
                {galleryImages.map(img => (
                  <div key={img.id} style={{border:'1px solid var(--border)',borderRadius:'var(--r)',overflow:'hidden'}}>
                    <img src={img.public_url} alt={img.alt_text||''} style={{width:'100%',aspectRatio:'4/3',objectFit:'cover',display:'block'}} />
                    {img.caption && <div style={{padding:'8px 10px',fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--text3)',background:'var(--bg2)'}}>{img.caption}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FAQ accordion */}
        {faqs.length > 0 && (
          <div style={{maxWidth:'780px',margin:'0 auto',padding:'0 24px'}}>
            <div style={{borderTop:'1px solid var(--border)',paddingTop:'40px',marginBottom:'40px'}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--orange)',letterSpacing:'0.12em',fontWeight:700,marginBottom:'20px'}}>FREQUENTLY ASKED QUESTIONS</div>
              <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'var(--border)'}}>
                {faqs.map((faq, i) => (
                  <details key={i} style={{background:'var(--bg)'}}>
                    <summary style={{padding:'16px 20px',cursor:'pointer',listStyle:'none',fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:600,letterSpacing:'-0.02em',color:'var(--text)',display:'flex',alignItems:'center',justifyContent:'space-between',userSelect:'none'}}>
                      <span>{faq.question}</span>
                      <span style={{fontFamily:'var(--font-mono)',fontSize:'18px',color:'var(--orange)',flexShrink:0,marginLeft:'12px'}}>+</span>
                    </summary>
                    <div style={{padding:'14px 20px 16px',fontSize:'15px',color:'var(--text2)',lineHeight:'1.75',borderTop:'1px solid var(--border)'}}>
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Author block */}
        {post.author_name && (
          <div style={{maxWidth:'780px',margin:'0 auto',padding:'0 24px'}}>
            <AuthorBlock post={post} />
          </div>
        )}

        {/* Bottom nav */}
        <div style={{maxWidth:'780px',margin:'0 auto',padding:'36px 24px 72px',display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:'1px solid var(--border)',marginTop:'36px'}}>
          <Link href="/blog" style={{fontFamily:'var(--font-mono)',fontSize:'11px',color:'var(--text3)',textDecoration:'none',letterSpacing:'0.06em'}}>← ALL POSTS</Link>
          <Link href={workCta.href} style={{padding:'10px 22px',borderRadius:'9999px',background:'var(--orange)',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.08em',color:'#fff',textDecoration:'none'}}>{workCta.text}</Link>
        </div>

      </div>
    </>
  )
}
