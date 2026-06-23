'use client'
import { useRef, useEffect } from 'react'

export default function TestimonialsSection({ testimonials = [] }) {
  const refs = useRef([])
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)' }})
    }, { threshold: 0.12 })
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [testimonials])

  const items = testimonials.length > 0 ? testimonials : [
    { client_name:'Bharath', role:'Head of Projects', company:'Kovai Pazhamudhir Nilayam', quote:'Their deep understanding of business processes is unmatched. Stratai.io brings clarity and execution that SMEs can truly rely on.', rating:5 },
    { client_name:'Balavishnu Ranganathan', role:'Founder', company:'Techno Tackle Software Solutions', quote:'Firms like Stratai.io help you breathe easy. They bridge strategy and delivery in a way that makes execution seamless.', rating:5 },
    { client_name:'Mohan', role:'Founder', company:'Lakshmi Krishna Naturals', quote:'Stratai.io has been our long-term partner, helping us scale from $1.5M to $5M in revenue over three years. They deliver results, not just promises.', rating:5 },
  ]

  return (
    <section style={{ padding:'96px 0', background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 24px' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--orange)', letterSpacing:'0.1em', marginBottom:'10px' }}>CLIENT VOICES</div>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,58px)', fontWeight:600, letterSpacing:'-0.04em', marginBottom:'48px', lineHeight:1.05, color:'var(--text)' }}>WHAT THEY SAY.</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'1px', background:'var(--border)' }}>
          {items.map((t, i) => (
            <div key={i} ref={el=>refs.current[i]=el} style={{ padding:'36px', background:'var(--bg)', opacity:0, transform:'translateY(16px)', transition:`opacity 0.6s ease ${i*0.1}s, transform 0.6s ease ${i*0.1}s`, position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:'24px', fontFamily:'var(--font-display)', fontSize:'80px', lineHeight:1, color:'var(--orange)', opacity:0.08, fontWeight:700 }}>"</div>
              <div style={{ color:'var(--orange)', fontSize:'14px', marginBottom:'14px' }}>{'★'.repeat(t.rating||5)}</div>
              <p style={{ fontSize:'15px', color:'var(--text)', lineHeight:'1.75', marginBottom:'24px', fontStyle:'italic' }}>"{t.quote}"</p>
              <div style={{ borderTop:'1px solid var(--border)', paddingTop:'16px' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'15px', fontWeight:600, letterSpacing:'-0.01em', color:'var(--text)' }}>{t.client_name}</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text3)', marginTop:'3px', letterSpacing:'0.05em' }}>{[t.role,t.company].filter(Boolean).map(s=>s.toUpperCase()).join(' · ')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
