import { serviceSchema, breadcrumbSchema, faqSchema, serializeSchema } from '@/lib/schema'
import { getServices, getContentImages, getCTAButtons } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ContactForm from '@/components/ui/ContactForm'
const sb = createClient('https://cinlfqmiiabwmeunowol.supabase.co','sb_publishable_cgStjgEhCnFlQi58_VYFvA_6gRE-tYo')
async function getService(slug) {
  const { data } = await sb.from('services').select('*').eq('slug',slug).eq('status','published').single()
  return data
}
export async function generateStaticParams() {
  const { data } = await sb.from('services').select('slug').eq('status','published')
  return (data || []).map(r => ({ slug: r.slug }))
}

const SERVICES_SEO = {
  'ai-quality-control-services': {
    title: 'AI Quality Control Services for Manufacturing — Defect Detection & Vision Inspection | StratAI™',
    description: 'StratAI delivers AI quality control services for manufacturing companies — AI defect detection, AI vision inspection, and root cause analysis to reduce rejection rates and recover margins.',
  },
  'ai-predictive-maintenance': {
    title: 'AI Predictive Maintenance for Manufacturing — OEE Improvement & Downtime Reduction | StratAI™',
    description: 'StratAI implements AI predictive maintenance for manufacturing plants — reducing unplanned downtime, improving OEE, and enabling throughput optimization without capex.',
  },
  'ai-supply-chain-services': {
    title: 'AI Supply Chain Services for Manufacturing — Demand Forecasting & Procurement Optimization | StratAI™',
    description: 'StratAI builds AI supply chain services for mid-market manufacturers — AI demand forecasting, AI MRP integration, supplier performance scoring, and procurement cost reduction.',
  },
  'ai-sales-and-marketing-automation': {
    title: 'AI Sales & Marketing Automation for B2B Manufacturers — Revenue Advantage System | StratAI™',
    description: 'StratAI delivers AI-powered B2B sales and marketing automation for manufacturing companies — lead generation, pipeline intelligence, CRM automation, and revenue growth for mid-market manufacturers.',
  },
  'ai-delivery-and-planning-optimization': {
    title: 'AI Delivery & Production Planning Optimization for Manufacturers | StratAI™',
    description: 'StratAI implements AI delivery optimization for manufacturing companies — AI demand sensing, production scheduling, and on-time delivery systems that reduce customer escalations.',
  },
}

export async function generateMetadata({ params }) {
  const svc = await getService(params.slug)
  if (!svc) return { title: 'Service not found — StratAI' }
  const base = 'https://stratai.io'
  const url  = svc.canonical_url || `${base}/services/${svc.slug}`
  const seoOverride = SERVICES_SEO[params.slug]
  return {
    title:       seoOverride?.title       || svc.meta_title    || svc.title,
    description: seoOverride?.description || svc.meta_description || svc.short_description || '',
    robots:      svc.robots        || 'index,follow',
    alternates:  { canonical: url },
    openGraph: {
      title:       svc.og_title       || svc.meta_title    || svc.title,
      description: svc.og_description || svc.meta_description || svc.short_description || '',
      url, siteName: 'StratAI', type: 'website',
      ...(svc.og_image_url ? { images: [{ url: svc.og_image_url, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card:        'summary_large_image',
      title:       svc.og_title       || svc.meta_title    || svc.title,
      description: svc.og_description || svc.meta_description || '',
      ...(svc.og_image_url ? { images: [svc.og_image_url] } : {}),
    },
  }
}
export default async function ServicePage({ params }) {
  const [svc, allSvcs, ctas] = await Promise.all([
    getService(params.slug),
    getServices().catch(() => []),
    getCTAButtons().catch(() => ({})),
  ])
  const startCta = ctas.services_start || { text: 'START THIS ENGAGEMENT →', href: '/contact' }
  if(!svc) notFound()
  const images = svc.id ? await getContentImages('service',svc.id).catch(()=>[]) : []
  const related = allSvcs.filter(s=>s.slug!==svc.slug).slice(0,3)
  const faqs = Array.isArray(svc.faqs) ? svc.faqs : []
    const schemas = [
    serviceSchema(svc),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: svc.title, url: `/services/${svc.slug}` },
    ]),
    ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
  ].filter(Boolean)

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(s) }} />
      ))}
    <div style={{background:'var(--bg)',minHeight:'100vh'}}>
      {/* Hero */}
      <div style={{borderBottom:'1px solid var(--border)',padding:'80px 24px 64px',background:'var(--bg2)'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto'}}>
          <Link href="/services" style={{fontFamily:'var(--font-mono)',fontSize:'11px',color:'var(--orange)',textDecoration:'none',letterSpacing:'0.08em',display:'inline-flex',alignItems:'center',gap:'6px',marginBottom:'28px'}}>← ALL SERVICES</Link>
          {svc.icon && <div style={{fontSize:'44px',marginBottom:'18px'}}>{svc.icon}</div>}
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(32px,6vw,76px)',fontWeight:600,letterSpacing:'-0.04em',lineHeight:1.0,color:'var(--text)',marginBottom:'18px'}}>{svc.title.toUpperCase()}</h1>
          {svc.short_description && <p style={{fontSize:'18px',color:'var(--text2)',maxWidth:'560px',lineHeight:'1.65',marginBottom:'28px'}}>{svc.short_description}</p>}
          <Link href={startCta.href} style={{display:'inline-flex',padding:'12px 28px',borderRadius:'9999px',background:'var(--orange)',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.08em',color:'#fff',textDecoration:'none'}}>{startCta.text}</Link>
        </div>
      </div>
      {/* Main image */}
      {images[0] && (
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
          <img src={images[0].public_url} alt={images[0].alt_text||svc.title} style={{width:'100%',aspectRatio:'21/8',objectFit:'cover',display:'block',border:'1px solid var(--border)',borderTop:'none'}} />
        </div>
      )}
      {/* Content */}
      {svc.content?.html && <div style={{maxWidth:'780px',margin:'0 auto',padding:'64px 24px 0'}}><div className="prose" dangerouslySetInnerHTML={{__html:svc.content.html}} /></div>}
      {/* Additional images */}
      {images.length>1 && (
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'48px 24px 0'}}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--text3)',letterSpacing:'0.1em',marginBottom:'18px'}}>GALLERY</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'10px'}}>
            {images.slice(1).map(img=>(
              <div key={img.id} style={{border:'1px solid var(--border)',borderRadius:'var(--r)',overflow:'hidden'}}>
                <img src={img.public_url} alt={img.alt_text||''} style={{width:'100%',aspectRatio:'4/3',objectFit:'cover',display:'block'}} />
                {img.caption && <div style={{padding:'8px 12px',fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--text3)',background:'var(--bg2)'}}>{img.caption}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* FAQ Section */}
      {faqs.length > 0 && (
        <div style={{maxWidth:'780px',margin:'0 auto',padding:'64px 24px 0'}}>
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
      )}
      {/* Related */}
      {related.length>0 && (
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'64px 24px 0'}}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--text3)',letterSpacing:'0.1em',marginBottom:'18px'}}>OTHER SERVICES</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'var(--border)'}}>
            {related.map(r=>(
              <Link key={r.id} href={`/services/${r.slug}`} style={{display:'flex',gap:'12px',padding:'22px',background:'var(--bg)',textDecoration:'none',color:'inherit',alignItems:'flex-start'}}>
                {r.icon && <span style={{fontSize:'20px',flexShrink:0}}>{r.icon}</span>}
                <div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:600,letterSpacing:'-0.02em',color:'var(--text)',marginBottom:'5px'}}>{r.title}</div>
                  <div style={{fontSize:'13px',color:'var(--text2)',lineHeight:'1.5'}}>{r.short_description?.slice(0,70)}…</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Contact */}
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'64px 24px 80px'}}>
        <div style={{background:'var(--bg2)',border:'1px solid var(--border)',padding:'48px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'56px',alignItems:'start',borderRadius:'var(--r)'}}>
          <div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--orange)',letterSpacing:'0.1em',marginBottom:'12px'}}>GET STARTED</div>
            <h2 style={{fontFamily:'var(--font-display)',fontSize:'clamp(24px,4vw,44px)',fontWeight:600,letterSpacing:'-0.04em',lineHeight:1.05,color:'var(--text)',marginBottom:'14px'}}>READY TO ENGAGE?</h2>
            <p style={{color:'var(--text2)',fontSize:'15px',lineHeight:'1.7'}}>Tell us about your business and we&#39;ll design the right engagement.</p>
          </div>
          <ContactForm source={`service-${svc.slug}`} />
        </div>
      </div>
    </div>
    </>
  )
}