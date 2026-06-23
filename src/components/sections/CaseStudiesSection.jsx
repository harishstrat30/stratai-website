'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'

export default function CaseStudiesSection({ caseStudies = [], ctas = {} }) {
  const refs = useRef([])
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)' }})
    }, { threshold: 0.1 })
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [caseStudies])

  const items = caseStudies.length > 0 ? caseStudies : [
    { slug:'lkn-marketplace-intelligence', client:'Lakshmi Krishna Naturals', industry:'Organic Personal Care', title:'LKN Marketplace Intelligence Agent', results:[{value:'3 platforms',metric:'simultaneously managed'},{value:'12h/wk',metric:'saved per week'}] },
    { slug:'precot-mailbox-intelligence', client:'Precot Limited', industry:'Textile Manufacturing', title:'Precot Mailbox Intelligence', results:[{value:'103,000+',metric:'emails analysed'},{value:'19 markets',metric:'covered globally'}] },
  ]
  const cta = ctas.cases_cta || { text: 'ALL CASE STUDIES →', href: '/case-studies' }

  return (
    <section style={{ padding: '96px 0', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'48px', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--orange)', letterSpacing:'0.1em', marginBottom:'10px' }}>RESULTS</div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,58px)', fontWeight:600, letterSpacing:'-0.04em', lineHeight:1.05, color:'var(--text)' }}>
              WORK THAT<br />SHIPPED.
            </h2>
          </div>
          <Link href={cta.href} style={{ fontFamily:'var(--font-mono)', fontSize:'11px', fontWeight:600, letterSpacing:'0.08em', color:'var(--orange)', textDecoration:'none', border:'1px solid var(--orange-border)', padding:'10px 20px', borderRadius:'9999px' }}>
            {cta.text}
          </Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:'1px', background:'var(--border)' }}>
          {items.map((cs, i) => (
            <Link key={cs.id||i} href={`/case-studies/${cs.slug}`} ref={el=>refs.current[i]=el} style={{ display:'block', background:'var(--bg)', padding:'40px', textDecoration:'none', color:'inherit', opacity:0, transform:'translateY(16px)', transition:`opacity 0.6s ease ${i*0.12}s, transform 0.6s ease ${i*0.12}s`, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, width:'40px', height:'3px', background:'var(--orange)' }} />
              <div style={{ display:'flex', gap:'8px', marginBottom:'18px', flexWrap:'wrap' }}>
                {[cs.industry, cs.client].filter(Boolean).map((t,j)=>(
                  <span key={j} style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:600, letterSpacing:'0.08em', color:'var(--orange)', padding:'3px 10px', border:'1px solid var(--orange-border)', borderRadius:'9999px' }}>{t}</span>
                ))}
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(18px,2.5vw,26px)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.2, marginBottom:'20px', color:'var(--text)' }}>{cs.title}</h3>
              {cs.results && Array.isArray(cs.results) && (
                <div style={{ display:'flex', gap:'24px', paddingTop:'20px', borderTop:'1px solid var(--border)' }}>
                  {cs.results.slice(0,2).map((r,j)=>(
                    <div key={j}>
                      <div style={{ fontFamily:'var(--font-display)', fontSize:'22px', fontWeight:600, color:'var(--orange)', letterSpacing:'-0.03em' }}>{r.value}</div>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text3)', letterSpacing:'0.06em', marginTop:'3px' }}>{r.metric?.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
