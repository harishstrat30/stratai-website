'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const canvasRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, t = 0

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.4, o: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      t += 0.007
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'rgba(255,85,0,0.07)'; ctx.lineWidth = 0.5
      for (let c = 0; c <= 12; c++) {
        ctx.beginPath(); ctx.moveTo((c/12)*canvas.width, 0); ctx.lineTo((c/12)*canvas.width, canvas.height); ctx.stroke()
      }
      for (let r = 0; r <= 7; r++) {
        ctx.beginPath(); ctx.moveTo(0, (r/7)*canvas.height); ctx.lineTo(canvas.width, (r/7)*canvas.height); ctx.stroke()
      }
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(255,255,255,${p.o})`; ctx.fill()
        pts.forEach(p2 => {
          const d = Math.hypot(p.x-p2.x, p.y-p2.y)
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p2.x,p2.y)
            ctx.strokeStyle = `rgba(255,85,0,${(1-d/110)*0.1})`; ctx.lineWidth=0.5; ctx.stroke()
          }
        })
      })
      const sy = (Math.sin(t*0.3)*0.5+0.5)*canvas.height
      const sg = ctx.createLinearGradient(0, sy-50, 0, sy+50)
      sg.addColorStop(0,'transparent'); sg.addColorStop(0.5,'rgba(255,85,0,0.05)'); sg.addColorStop(1,'transparent')
      ctx.fillStyle=sg; ctx.fillRect(0, sy-50, canvas.width, 100)
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--bg-dark)' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 25%, rgba(15,15,14,0.75) 100%)' }} />
      <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(255,85,0,0.07) 0%, transparent 70%)', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1100px', margin: '0 auto', padding: '0 24px', textAlign: 'center', opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>

        {/* Badges row */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
          {/* Partner badge */}
          <a href="/claude-partner" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '9999px', border: '1px solid rgba(255,85,0,0.55)', background: 'rgba(255,85,0,0.12)', textDecoration: 'none', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FF5500" stroke="#FF5500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', fontWeight: 700 }}>
              OFFICIAL ANTHROPIC CLAUDE PARTNER NETWORK MEMBER
            </span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#FF5500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          {/* Category badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '9999px', border: '1px solid rgba(255,85,0,0.25)', background: 'rgba(255,85,0,0.06)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', fontWeight: 500 }}>
              BUILDING AI ADVANTAGE SYSTEMS FOR MID-MARKET MANUFACTURING
            </span>
          </div>
        </div>

        {/* H1 — CLA-144 */}
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,7vw,86px)', lineHeight: 1.0, letterSpacing: '-0.04em', fontWeight: 600, color: '#fff', marginBottom: '28px' }}>
          WE DON&apos;T IMPLEMENT AI.<br />
          WE BUILD{' '}
          <span style={{ background: 'linear-gradient(135deg, var(--orange) 0%, #FF8C00 50%, #FFD700 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            AI ADVANTAGE
          </span>
          <br />SYSTEMS.
        </h1>

        <p style={{ fontSize: 'clamp(16px,2vw,19px)', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', margin: '0 auto 44px', lineHeight: '1.65', letterSpacing: '-0.01em' }}>
          AI for manufacturing companies in India. Manufacturing AI solutions built for measurable P&amp;L impact — within 6 months.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}>
          <Link href="/contact" style={{ padding: '13px 30px', borderRadius: '9999px', background: 'var(--orange)', border: '1px solid var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
            → Talk to Us
          </Link>
          <Link href="/engagement-model" style={{ padding: '13px 30px', borderRadius: '9999px', background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
            See Our Engagement Model →
          </Link>
        </div>

        {/* Signature line */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 20px' }}>
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
            &ldquo;If AI isn&apos;t in your P&L, it isn&apos;t real.&rdquo;
          </code>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>SCROLL</span>
        <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, var(--orange), transparent)', animation: 'scanLine 2s ease-in-out infinite' }} />
      </div>
    </section>
  )
}
