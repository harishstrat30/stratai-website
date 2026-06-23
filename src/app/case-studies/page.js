export const dynamic = "force-dynamic"
export const revalidate = 0

import { getCaseStudies } from '@/lib/supabase'
import Link from 'next/link'
export const metadata = {
  alternates: { canonical: 'https://stratai.io/case-studies' },
  title: { absolute: 'AI Case Studies for Manufacturers | Measurable P&L Impact | StratAI™' },
  description: "Explore StratAI's AI case studies for manufacturing companies in India. Real P&L impact, cost savings and quality improvements — measurable results from Quality, Throughput and Procurement Advantage Systems.",
  keywords: [
    'ai roi for manufacturers', 'manufacturing ai solutions', 'ai cost savings manufacturing',
    'ai transformation manufacturing', 'ai quality control services', 'ai defect detection',
  ],
}
export default async function CaseStudiesPage() {
  const cs = await getCaseStudies().catch(()=>[])
  return (
    <div style={{background:'var(--bg)',minHeight:'100vh'}}>
      <div style={{borderBottom:'1px solid var(--border)',padding:'80px 24px 56px',background:'var(--bg2)'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto'}}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:'11px',color:'var(--orange)',letterSpacing:'0.1em',marginBottom:'12px'}}>RESULTS</div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(36px,6vw,76px)',fontWeight:600,letterSpacing:'-0.04em',lineHeight:1.0,color:'var(--text)',marginBottom:'18px'}}>AI ROI FOR MANUFACTURERS —<br/>STRATAI CASE STUDIES.</h1>
          <p style={{color:'var(--text2)',fontSize:'17px',maxWidth:'440px',lineHeight:'1.65'}}>Real AI cost savings, quality improvements, and P&amp;L impact. Manufacturing AI solutions deployed — outcomes we can measure.</p>
        </div>
      </div>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'56px 24px'}}>
        {cs.length===0 ? (
          <div style={{textAlign:'center',padding:'80px',color:'var(--text3)',fontFamily:'var(--font-mono)',fontSize:'12px',letterSpacing:'0.08em'}}>CASE STUDIES COMING SOON</div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'var(--border)'}}>
            {cs.map((item,i)=>(
              <Link key={item.id} href={`/case-studies/${item.slug}`} style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'36px',alignItems:'start',padding:'44px',background:'var(--bg)',textDecoration:'none',color:'inherit',position:'relative',transition:'background 0.15s'}}>
                <div style={{position:'absolute',top:0,left:0,width:'3px',height:'100%',background:i===0?'var(--orange)':'transparent'}} />
                <div>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--text3)',letterSpacing:'0.08em',marginBottom:'12px'}}>{String(i+1).padStart(2,'0')} / {String(cs.length).padStart(2,'0')}</div>
                  <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'14px'}}>
                    {[item.industry,item.client].filter(Boolean).map((t,j)=>(
                      <span key={j} style={{fontFamily:'var(--font-mono)',fontSize:'10px',fontWeight:600,letterSpacing:'0.08em',color:'var(--orange)',padding:'3px 10px',border:'1px solid var(--orange-border)',borderRadius:'9999px',background:'var(--orange-light)'}}>{t.toUpperCase()}</span>
                    ))}
                  </div>
                  <h2 style={{fontFamily:'var(--font-display)',fontSize:'clamp(20px,3vw,36px)',fontWeight:600,letterSpacing:'-0.03em',lineHeight:1.15,color:'var(--text)',marginBottom:'12px'}}>{item.title}</h2>
                  {item.challenge && <p style={{fontSize:'14px',color:'var(--text2)',lineHeight:'1.6',maxWidth:'520px'}}>{item.challenge.slice(0,160)}{item.challenge.length>160?'…':''}</p>}
                </div>
                {item.results && Array.isArray(item.results) && item.results.length>0 && (
                  <div style={{display:'flex',flexDirection:'column',gap:'18px',minWidth:'150px',flexShrink:0}}>
                    {item.results.slice(0,3).map((r,j)=>(
                      <div key={j} style={{textAlign:'right'}}>
                        <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(18px,2.5vw,30px)',fontWeight:600,color:'var(--orange)',letterSpacing:'-0.03em',lineHeight:1}}>{r.value}</div>
                        <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--text3)',letterSpacing:'0.06em',marginTop:'3px'}}>{r.metric?.toUpperCase()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
