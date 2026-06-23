'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import StratAILogo from '@/components/ui/StratAILogo'

// ── Knowledge Hub sub-items (active content only per M4 spec)
const HUB_ITEMS = [
  { key: 'blog',        label: 'Blog',         icon: '✍️',  desc: 'Insights and practical guides' },
  { key: 'case-study',  label: 'Case Studies',  icon: '💼',  desc: 'Real engagements, real outcomes' },
  { key: 'template',    label: 'Templates',     icon: '📋',  desc: 'Ready-to-use frameworks' },
]

// ── Main nav — new order per CLA-140
const SIMPLE_NAV = [
  { label: 'HOME',              href: '/' },
  { label: 'ABOUT',             href: '/about' },
  { label: 'SERVICES',          href: '/services' },
  { label: 'AI ADVANTAGE',      href: '/advantage-systems' },
  { label: 'ENGAGEMENT MODEL',  href: '/engagement-model' },
]
const CZ_HREF = '/claude-solutions'

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [hubOpen,    setHubOpen]    = useState(false)
  const [hubVisible, setHubVisible] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hubMobile,  setHubMobile]  = useState(false)
  const pathname   = usePathname()
  const closeTimer = useRef(null)
  const dropRef    = useRef(null)

  const hubActive = pathname === '/knowledge-hub' || pathname.startsWith('/knowledge-hub/')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { closeHub(); setMobileOpen(false); setHubMobile(false) }, [pathname])

  useEffect(() => {
    const fn = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) closeHub() }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function openHub()  { clearTimeout(closeTimer.current); setHubOpen(true); requestAnimationFrame(() => requestAnimationFrame(() => setHubVisible(true))) }
  function closeHub() { setHubVisible(false); closeTimer.current = setTimeout(() => setHubOpen(false), 200) }
  function toggleHub(){ if (hubOpen && hubVisible) closeHub(); else openHub() }

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 200, height: '67px',
        background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
        borderBottom: '1px solid var(--border)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.2s ease',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', width: '100%', display: 'flex', alignItems: 'center', gap: '4px' }}>

          {/* Animated Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, marginRight: '16px' }}>
            <StratAILogo size={34} dark={false} animated={true} showText={true} showTM={true} />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }} className="desktop-nav">
            {SIMPLE_NAV.map(item => {
              const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link key={item.href} href={item.href} style={{ padding: '6px 10px', borderRadius: '9999px', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: active ? 600 : 500, letterSpacing: '0.06em', textDecoration: 'none', color: active ? 'var(--text)' : 'var(--text2)', background: active ? 'var(--bg3)' : 'transparent', border: active ? '1px solid var(--border)' : '1px solid transparent', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                  {item.label}
                </Link>
              )
            })}

            <Link href={CZ_HREF} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'6px 10px', borderRadius:'9999px', fontFamily:'var(--font-mono)', fontSize:'11px', fontWeight:(pathname===CZ_HREF||pathname.startsWith(CZ_HREF+'/'))?600:500, letterSpacing:'0.06em', textDecoration:'none', color:(pathname===CZ_HREF||pathname.startsWith(CZ_HREF+'/'))?'#CC4E2A':'var(--text2)', background:(pathname===CZ_HREF||pathname.startsWith(CZ_HREF+'/'))?'rgba(204,78,42,0.08)':'transparent', border:(pathname===CZ_HREF||pathname.startsWith(CZ_HREF+'/'))?'1px solid rgba(204,78,42,0.25)':'1px solid transparent', transition:'all 0.15s', whiteSpace:'nowrap' }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#CC4E2A', display:'inline-block', flexShrink:0, animation:'czpulse 2.5s ease infinite' }} />
              CLAUDE ZONE
            </Link>

            {/* Knowledge Hub dropdown */}
            <div ref={dropRef} style={{ position: 'relative' }}>
              <button onClick={toggleHub} onMouseEnter={openHub} onMouseLeave={() => { closeTimer.current = setTimeout(closeHub, 120) }}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 10px', borderRadius: '9999px', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: hubActive || (hubOpen && hubVisible) ? 600 : 500, letterSpacing: '0.06em', cursor: 'pointer', border: 'none', outline: 'none', color: hubActive || (hubOpen && hubVisible) ? 'var(--text)' : 'var(--text2)', background: hubActive ? 'var(--bg3)' : (hubOpen && hubVisible) ? 'var(--bg2)' : 'transparent', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                KNOWLEDGE HUB
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transition: 'transform 0.2s', transform: (hubOpen && hubVisible) ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.5 }}>
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {hubOpen && (
                <div onMouseEnter={openHub} onMouseLeave={() => { closeTimer.current = setTimeout(closeHub, 120) }}
                  style={{ position: 'absolute', top: 'calc(100% + 10px)', left: '-16px', width: '340px', background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)', overflow: 'hidden', opacity: hubVisible ? 1 : 0, transform: hubVisible ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.98)', transition: 'opacity 0.18s ease, transform 0.18s ease', pointerEvents: hubVisible ? 'auto' : 'none' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text3)' }}>KNOWLEDGE HUB</span>
                    <Link href="/knowledge-hub" onClick={closeHub} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, color: 'var(--orange)', textDecoration: 'none' }}>VIEW ALL →</Link>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {HUB_ITEMS.map(item => (
                      <Link key={item.key} href={`/knowledge-hub?type=${item.key}`} onClick={closeHub}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 16px', background: '#fff', textDecoration: 'none', color: 'inherit', transition: 'background 0.12s', borderBottom: '1px solid var(--border)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                        <span style={{ fontSize: '16px', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                        <div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>{item.label}</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', lineHeight: 1.4 }}>{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div style={{ padding: '10px 16px', background: 'var(--bg2)', display: 'flex', justifyContent: 'flex-end' }}>
                    <Link href="/knowledge-hub" onClick={closeHub} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: '#fff', textDecoration: 'none', background: 'var(--orange)', padding: '5px 12px', borderRadius: '9999px' }}>EXPLORE ALL</Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Single GET STARTED CTA — CLA-140 removes duplicate */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Link href="/contact" style={{ padding: '7px 18px', borderRadius: '9999px', background: 'var(--orange)', border: '1px solid var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              GET STARTED
            </Link>
          </div>

          {/* Hamburger */}
          <button className="mobile-only" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: 'var(--rs)' }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: 'block', width: '22px', height: '2px', background: 'var(--text)', borderRadius: '2px', transition: 'all 0.25s ease',
                transform: mobileOpen ? (i===0 ? 'translateY(7px) rotate(45deg)' : i===2 ? 'translateY(-7px) rotate(-45deg)' : 'scaleX(0)') : 'none',
                opacity: mobileOpen && i===1 ? 0 : 1 }} />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, top: '67px', zIndex: 199, background: '#fff', overflowY: 'auto', borderTop: '1px solid var(--border)' }}>
          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {SIMPLE_NAV.map(item => {
              const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link key={item.href} href={item.href}
                  style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: active ? 700 : 500, letterSpacing: '0.06em', color: active ? 'var(--text)' : 'var(--text2)', textDecoration: 'none', borderRadius: 'var(--rs)', background: active ? 'var(--bg3)' : 'transparent', borderBottom: '1px solid var(--border)' }}>
                  {item.label}
                </Link>
              )
            })}

            <Link href={CZ_HREF} style={{ padding:'14px 16px', fontFamily:'var(--font-mono)', fontSize:'13px', fontWeight:pathname.startsWith(CZ_HREF)?700:500, letterSpacing:'0.06em', color:pathname.startsWith(CZ_HREF)?'#CC4E2A':'var(--text2)', textDecoration:'none', borderRadius:'var(--rs)', background:pathname.startsWith(CZ_HREF)?'rgba(204,78,42,0.08)':'transparent', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:'8px' }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#CC4E2A', display:'inline-block', animation:'czpulse 2.5s ease infinite' }} />
              CLAUDE ZONE
            </Link>

            {/* Knowledge Hub mobile accordion */}
            <button onClick={() => setHubMobile(!hubMobile)}
              style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em', color: hubActive ? 'var(--text)' : 'var(--text2)', borderRadius: 'var(--rs)', background: hubActive ? 'var(--bg3)' : 'transparent', borderBottom: '1px solid var(--border)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', textAlign: 'left' }}>
              KNOWLEDGE HUB
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none" style={{ transition: 'transform 0.2s', transform: hubMobile ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {hubMobile && (
              <div style={{ paddingLeft: '8px', display: 'flex', flexDirection: 'column', gap: '2px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                {HUB_ITEMS.map(item => (
                  <Link key={item.key} href={`/knowledge-hub?type=${item.key}`}
                    style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text2)', textDecoration: 'none', borderRadius: 'var(--rs)' }}>
                    <span style={{ fontSize: '16px' }}>{item.icon}</span>{item.label}
                  </Link>
                ))}
              </div>
            )}

            <div style={{ padding: '16px 0 8px' }}>
              <Link href="/contact" style={{ padding: '14px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                GET STARTED
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
