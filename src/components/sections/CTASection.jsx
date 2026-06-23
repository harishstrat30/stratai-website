'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'

export default function CTASection() {
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { ref.current.style.opacity='1'; ref.current.style.transform='translateY(0)' }
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-dark)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(255,85,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div ref={ref} style={{ position: 'relative', zIndex: 1, opacity: 0, transform: 'translateY(24px)', transition: 'all 0.7s cubic-bezier(.16,1,.3,1)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '18px' }}>THE NEXT STEP</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,7vw,80px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff', marginBottom: '24px' }}>
          Ready to stop doing AI activity<br />
          <span style={{ background: 'linear-gradient(135deg,var(--orange),#FF8C00,#FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            and start building AI Advantage?
          </span>
        </h2>
        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: '1.7' }}>
          Start with a free half-day audit. We identify 3–5 high-value AI use cases specific to your business — no fee, no commitment.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          <Link href="/contact" style={{ padding: '14px 32px', borderRadius: '9999px', background: 'var(--orange)', border: '1px solid var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
            → Talk to Us
          </Link>
          <Link href="/engagement-model" style={{ padding: '14px 32px', borderRadius: '9999px', background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
            AI implementation roadmap →
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/advantage-systems#qas" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>AI defect detection for manufacturers</Link>
          <Link href="/advantage-systems#tas" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>AI predictive maintenance</Link>
          <Link href="/advantage-systems#pas" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>AI supply chain services</Link>
          <Link href="/services" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>AI consulting services for manufacturing</Link>
          <Link href="/knowledge-hub" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Knowledge Hub</Link>
        </div>
      </div>
    </section>
  )
}
