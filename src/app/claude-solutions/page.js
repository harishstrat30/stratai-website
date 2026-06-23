'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import AuthorBlock from '@/components/ui/AuthorBlock'

const SB   = 'https://cinlfqmiiabwmeunowol.supabase.co'
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpbmxmcW1paWFid21ldW5vd29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0OTcwNzYsImV4cCI6MjA5MDA3MzA3Nn0.MP4Tn7lgqCEoOic7TabvAak9VYKdS_WtWu7M1G2AgSg'

const INDUSTRIES = ['Sales','Marketing','Operations','HR','Finance','Customer Success','E-commerce']

const CZ  = '#CC4E2A'
const CZL = 'rgba(204,78,42,0.08)'
const CZB = 'rgba(204,78,42,0.20)'

// Intersection observer hook for scroll animations
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function RevealBlock({ children, delay = 0, y = 28 }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 0.65s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

function thumb(s) {
  if (s.video_url) {
    const m = s.video_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    if (m) return { type: 'yt', id: m[1] }
  }
  if (s.cover_image_url) return { type: 'img', url: s.cover_image_url }
  return { type: 'ph' }
}

export default function ClaudeSolutionsPage() {
  const [all, setAll] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [detail, setDetail] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', message: '' })

  useEffect(() => {
    fetch(`${SB}/rest/v1/claude_solutions?status=eq.published&order=published_at.desc&select=*,authors(name,slug,role,credentials,bio,linkedin_url,avatar_url)`,
      { headers: { 'apikey': ANON, 'Authorization': 'Bearer ' + ANON } })
      .then(r => r.json()).then(d => {
        // Flatten the nested authors join into author_* fields on each solution
        const flat = (d || []).map(s => {
          if (s.authors) {
            const a = s.authors
            s.author_name         = a.name
            s.author_slug         = a.slug
            s.author_role         = a.role
            s.author_credentials  = a.credentials
            s.author_bio          = a.bio
            s.author_linkedin_url = a.linkedin_url
            s.author_avatar_url   = a.avatar_url
          }
          return s
        })
        setAll(flat); setFiltered(flat)
      }).catch(() => {})
  }, [])

  function filter(f) {
    setActiveFilter(f)
    setFiltered(f === 'all' ? all : all.filter(s => s.industry === f || (s.teams || []).includes(f)))
  }

  function openDetail(s) {
    setDetail(s)
    setSubmitted(false)
    setForm({ name: '', company: '', phone: '', email: '', message: '' })
    document.body.style.overflow = 'hidden'
    history.pushState({}, '', '/claude-solutions/' + s.slug)
  }
  function closeDetail() {
    setDetail(null)
    document.body.style.overflow = ''
    history.pushState({}, '', '/claude-solutions')
  }

  async function submitLead(e) {
    e.preventDefault()
    if (!form.name || !form.company || !form.phone || !form.email) return
    setSubmitting(true)
    try {
      await fetch(`${SB}/rest/v1/claude_solution_leads`, {
        method: 'POST',
        headers: { 'apikey': ANON, 'Authorization': 'Bearer ' + ANON, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
        body: JSON.stringify({ ...form, solution_id: detail?.id || null, solution_title: detail?.title || '' })
      })
      setSubmitted(true)
    } catch (e) {}
    setSubmitting(false)
  }

  const th = detail && thumb(detail)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');

        @keyframes czpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.55)} }
        @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes slideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes detailIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes orbFloat { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,15px) scale(.97)} }

        .cz-hero-title { 
          font-family:'Chakra Petch',sans-serif;
          font-size:clamp(48px,7vw,92px);
          font-weight:700;
          letter-spacing:-.04em;
          line-height:.95;
          color:#1a1917;
        }
        .cz-hero-title em {
          font-style:italic;
          color:${CZ};
          font-weight:700;
        }

        .cz-card {
          background:#fff;
          border-radius:20px;
          box-shadow:0 2px 8px rgba(0,0,0,.06), 0 0 0 1px rgba(0,0,0,.05);
          cursor:pointer;
          transition:transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s ease;
          overflow:hidden;
        }
        .cz-card:hover {
          transform:translateY(-6px) scale(1.01);
          box-shadow:0 20px 48px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.06);
        }

        .cz-filter-pill {
          font-family:'IBM Plex Mono',monospace;
          font-size:10px;
          font-weight:500;
          letter-spacing:.1em;
          text-transform:uppercase;
          padding:7px 16px;
          border-radius:9999px;
          border:1px solid transparent;
          cursor:pointer;
          transition:all .18s ease;
          background:transparent;
          color:#a09e99;
          white-space:nowrap;
          flex-shrink:0;
        }
        .cz-filter-pill:hover { color:#1a1917; background:#f2f1ef; border-color:#e2e1de; }
        .cz-filter-pill.active { background:${CZ}; color:#fff; border-color:${CZ}; }

        .cz-tag {
          font-family:'IBM Plex Mono',monospace;
          font-size:9px;
          letter-spacing:.06em;
          padding:3px 9px;
          border-radius:6px;
          font-weight:500;
          display:inline-block;
        }

        .cz-section-label {
          font-family:'IBM Plex Mono',monospace;
          font-size:9px;
          letter-spacing:.2em;
          text-transform:uppercase;
          color:${CZ};
        }

        .det-open { animation: detailIn .35s cubic-bezier(.32,.72,0,1) both; }

        .faq-item { border-radius:12px; overflow:hidden; margin-bottom:6px; }
        .faq-q { padding:14px 18px; cursor:pointer; font-size:14px; font-weight:500; display:flex; align-items:center; justify-content:space-between; gap:12px; background:#f8f8f7; transition:background .12s; }
        .faq-q:hover { background:#f2f1ef; }
        .faq-icon { width:22px;height:22px;border-radius:50%;background:#fff;border:1px solid #e2e1de;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;transition:all .2s; }
        .faq-item.open .faq-icon { background:${CZ}; color:#fff; border-color:${CZ}; transform:rotate(45deg); }
        .faq-a { max-height:0; overflow:hidden; transition:max-height .3s ease, padding .3s ease; background:#fff; }
        .faq-item.open .faq-a { max-height:300px; padding:0 18px 14px; }

        @media(max-width:860px){
          .cz-hero-grid { grid-template-columns:1fr!important; gap:40px!important; }
          .cz-hero-right { display:none!important; }
          .cz-hero-title { font-size:clamp(40px,10vw,64px)!important; letter-spacing:-.03em!important; word-break:keep-all!important; overflow-wrap:normal!important; }
          .cz-hero-section { padding:72px 20px 56px!important; min-height:auto!important; }
          .cz-mobile-proof { display:flex!important; }
        }
        @media(min-width:861px){
          .cz-mobile-proof { display:none!important; }
        }
        @media(max-width:760px){
          .cz-detail-cta-grid { grid-template-columns:1fr!important; gap:28px!important; }
          .cz-card-grid { grid-template-columns:1fr!important; }
          .cz-filter-scroll { -webkit-overflow-scrolling:touch; }
        }
      `}</style>

      {/* ════ HERO ════ */}
      <section className="cz-hero-section" style={{ background: '#faf9f7', minHeight: '84vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '100px 20px 80px' }}>
        
        {/* Background orbs — claude.com style */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '640px', height: '640px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(204,78,42,.10) 0%, transparent 65%)', animation: 'orbFloat 12s ease-in-out infinite' }}/>
          <div style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,85,0,.06) 0%, transparent 60%)', animation: 'orbFloat 16s ease-in-out infinite reverse' }}/>
          <div style={{ position: 'absolute', top: '40%', left: '40%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(204,78,42,.05) 0%, transparent 70%)', animation: 'orbFloat 9s ease-in-out infinite' }}/>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="cz-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '64px', alignItems: 'center' }}>

            {/* Left copy */}
            <div>
              <div style={{ animation: 'slideUp .5s ease both' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: CZ, animation: 'czpulse 2.5s ease infinite', display: 'inline-block' }}/>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '10px', fontWeight: 500, letterSpacing: '.16em', color: CZ, textTransform: 'uppercase' }}>Claude Zone · StratAI</span>
                </div>
              </div>

              <div style={{ animation: 'slideUp .5s .08s ease both' }}>
                <h1 className="cz-hero-title">
                  Claude AI Solutions —<br/>
                  <em>Autonomous Agent System</em><br/>
                  Implementation for Manufacturers.
                </h1>
              </div>

              <div style={{ animation: 'slideUp .5s .16s ease both' }}>
                <p style={{ fontSize: '18px', color: '#6b6a66', lineHeight: 1.7, maxWidth: '520px', margin: '24px 0 36px', fontFamily: "'Inter',sans-serif", fontWeight: 300 }}>
                  AI system implementation and workflow automation for manufacturing companies — Claude-powered, production-ready. No endless pilots.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', animation: 'slideUp .5s .24s ease both' }}>
                <a href="#solutions" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '9999px', background: CZ, color: '#fff', fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textDecoration: 'none', textTransform: 'uppercase', transition: 'all .15s', boxShadow: `0 4px 20px rgba(204,78,42,.35)` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 32px rgba(204,78,42,.4)` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 4px 20px rgba(204,78,42,.35)` }}>
                  Browse Solutions →
                </a>
                <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '9999px', background: 'transparent', color: '#1a1917', fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', fontWeight: 600, letterSpacing: '.1em', textDecoration: 'none', textTransform: 'uppercase', border: '1px solid #d4d3cf', transition: 'all .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#f2f1ef'; e.currentTarget.style.borderColor = '#1a1917' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#d4d3cf' }}>
                  Book a call
                </a>
              </div>

              {/* Mobile-only compact proof strip — hidden on desktop via CSS */}
              <div className="cz-mobile-proof" style={{ marginTop: '28px', gap: '20px', flexWrap: 'wrap', animation: 'slideUp .5s .32s ease both' }}>
                {[['⚡','Ships to production'],['🔒','Your data, your systems'],['✓','28 days to go live']].map(([icon, label]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', color: CZ, fontWeight: 700 }}>{icon}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', color: '#6b6a66' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating proof card — hidden on mobile via CSS */}
            <div className="cz-hero-right" style={{ animation: 'slideUp .6s .18s ease both' }}>
              <div style={{ position: 'relative' }}>
                {/* Main card */}
                <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 48px rgba(0,0,0,.10), 0 0 0 1px rgba(0,0,0,.06)', animation: 'float 6s ease-in-out infinite' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: CZL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                    <div>
                      <div style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: '13px', fontWeight: 600, color: '#1a1917' }}>Claude Zone</div>
                      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '9px', color: '#a09e99', letterSpacing: '.1em' }}>BY STRATAI.IO</div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                      {['#ff6b6b','#ffd93d','#6bcb77'].map(c => <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }}/>)}
                    </div>
                  </div>

                  {/* Mock solution items */}
                  {[
                    { icon: '🏭', label: 'Shopfloor Decision Mode', tag: 'Manufacturing', color: CZ },
                    { icon: '🛒', label: 'E-commerce Intelligence', tag: 'Operations', color: '#2563eb' },
                    { icon: '📊', label: 'Mailbox Intel Reports', tag: 'Finance', color: '#16a34a' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '12px', background: i === 0 ? CZL : '#f8f8f7', marginBottom: '6px', border: i === 0 ? `1px solid ${CZB}` : '1px solid transparent', transition: 'all .15s' }}>
                      <span style={{ fontSize: '18px' }}>{item.icon}</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', fontWeight: 500, color: '#1a1917', flex: 1 }}>{item.label}</span>
                      <span className="cz-tag" style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}25` }}>{item.tag}</span>
                    </div>
                  ))}

                  <div style={{ marginTop: '18px', padding: '12px', borderRadius: '12px', background: '#f8f8f7', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: CZ, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', flexShrink: 0 }}>✓</div>
                    <div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '12px', fontWeight: 600, color: '#1a1917' }}>Production-ready</div>
                      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '9px', color: '#a09e99', letterSpacing: '.08em' }}>28-day deployment · India-built</div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div style={{ position: 'absolute', top: '-16px', right: '-12px', background: '#1a1917', color: '#fff', borderRadius: '12px', padding: '8px 14px', fontFamily: "'IBM Plex Mono',monospace", fontSize: '10px', fontWeight: 600, letterSpacing: '.08em', boxShadow: '0 4px 16px rgba(0,0,0,.2)', animation: 'float 4s ease-in-out infinite .5s' }}>
                  ⚡ Made to give unfair advantage
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ TRUST STRIP ════ */}
      <div style={{ background: '#fff', borderTop: '1px solid #e2e1de', borderBottom: '1px solid #e2e1de', padding: '20px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '9px', letterSpacing: '.2em', color: '#a09e99', textTransform: 'uppercase', flexShrink: 0 }}>Powering teams at</span>
          {['Lakshmi Krishna Naturals', 'Precot Limited', 'Symphony Garments', 'Sabrika', 'GoSuper EdTech'].map(b => (
            <span key={b} style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: '12px', fontWeight: 600, color: '#d4d3cf', letterSpacing: '.04em', textTransform: 'uppercase' }}>{b}</span>
          ))}
        </div>
      </div>

      {/* ════ FILTER BAR ════ */}
      <div id="solutions" style={{ background: '#fff', borderBottom: '1px solid #e2e1de', position: 'sticky', top: '67px', zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '4px', height: '54px', overflowX: 'auto' }}>
          {['all', ...INDUSTRIES].map(f => (
            <button key={f} className={`cz-filter-pill${activeFilter === f ? ' active' : ''}`} onClick={() => filter(f)}>
              {f === 'all' ? 'All Solutions' : f}
            </button>
          ))}
        </div>
      </div>

      {/* ════ CARDS GRID ════ */}
      <section style={{ background: '#faf9f7', padding: '64px 20px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Section header */}
          <RevealBlock>
            <div style={{ marginBottom: '48px' }}>
              <div className="cz-section-label" style={{ marginBottom: '10px' }}>
                {activeFilter === 'all' ? 'All Solutions' : activeFilter} · {filtered.length} available
              </div>
              <h2 style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-.03em', color: '#1a1917', lineHeight: 1.1 }}>
                Pick your deployment. <em style={{ fontStyle: 'italic', color: CZ }}>Ship fast.</em>
              </h2>
            </div>
          </RevealBlock>

          {filtered.length === 0 ? (
            <div style={{ padding: '80px 20px', textAlign: 'center', background: '#fff', borderRadius: '20px', border: '1px solid #e2e1de' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🤖</div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', color: '#a09e99', letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {all.length === 0 ? 'Loading…' : 'None in this category yet — more coming soon'}
              </div>
            </div>
          ) : (
            <div className="cz-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(360px,1fr))', gap: '20px' }}>
              {filtered.map((s, i) => {
                const t = thumb(s)
                const isHov = hoveredCard === s.id
                return (
                  <RevealBlock key={s.id} delay={i * 60}>
                    <div className="cz-card" onClick={() => openDetail(s)}
                      onMouseEnter={() => setHoveredCard(s.id)}
                      onMouseLeave={() => setHoveredCard(null)}>

                      {/* Card thumb */}
                      <div style={{ height: '200px', position: 'relative', overflow: 'hidden', background: '#f2f1ef' }}>
                        {t.type === 'yt' && <img src={`https://img.youtube.com/vi/${t.id}/hqdefault.jpg`} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .3s ease', transform: isHov ? 'scale(1.04)' : 'scale(1)' }}/>}
                        {t.type === 'img' && <img src={t.url} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .3s ease', transform: isHov ? 'scale(1.04)' : 'scale(1)' }}/>}
                        {t.type === 'ph' && (
                          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1917 0%, #2d2c29 100%)', position: 'relative', overflow: 'hidden' }}>
                            {/* Dot grid */}
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1.5px,transparent 1.5px)', backgroundSize: '22px 22px' }}/>
                            {/* Glow */}
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '200px', height: '120px', background: `radial-gradient(ellipse, ${CZ}30 0%, transparent 70%)` }}/>
                            <div style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: '28px', fontWeight: 700, color: 'rgba(255,255,255,.15)', letterSpacing: '-.02em', zIndex: 1, textAlign: 'center', padding: '0 20px' }}>
                              {(s.industry || 'AI').toUpperCase()}
                            </div>
                            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '9px', color: 'rgba(255,255,255,.3)', letterSpacing: '.2em', textTransform: 'uppercase', marginTop: '8px', zIndex: 1 }}>
                              SOLUTION
                            </div>
                          </div>
                        )}
                        {t.type === 'yt' && (
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: CZ, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '16px', paddingLeft: '3px', boxShadow: '0 4px 20px rgba(0,0,0,.3)', transition: 'transform .2s', transform: isHov ? 'scale(1.12)' : 'scale(1)' }}>▶</div>
                          </div>
                        )}
                        {/* Industry chip on image */}
                        {s.industry && (
                          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                            <span className="cz-tag" style={{ background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,.15)', padding: '4px 10px' }}>{s.industry}</span>
                          </div>
                        )}
                      </div>

                      {/* Card body */}
                      <div style={{ padding: '22px 24px 20px' }}>
                        {/* Tags row */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
                          {s.use_case && <span className="cz-tag" style={{ background: CZL, color: CZ, border: `1px solid ${CZB}` }}>{s.use_case}</span>}
                          {(s.tools_mentioned || []).slice(0, 2).map(t => <span key={t} className="cz-tag" style={{ background: 'rgba(22,163,74,.07)', color: '#16a34a', border: '1px solid rgba(22,163,74,.15)' }}>{t}</span>)}
                        </div>

                        <h3 style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: '16px', fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.3, marginBottom: '8px', color: '#1a1917' }}>{s.title}</h3>
                        <p style={{ fontSize: '13px', color: '#6b6a66', lineHeight: 1.7, marginBottom: '18px', fontFamily: "'Inter',sans-serif" }}>{s.tagline || s.summary || ''}</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '14px', borderTop: '1px solid #f2f1ef' }}>
                          {s.claude_model && <span className="cz-tag" style={{ background: '#f2f1ef', color: '#a09e99', border: '1px solid #e2e1de' }}>{s.claude_model}</span>}
                          {s.implementation_time && <span className="cz-tag" style={{ background: 'rgba(22,163,74,.07)', color: '#16a34a', border: '1px solid rgba(22,163,74,.15)' }}>{s.implementation_time}</span>}
                          <span style={{ marginLeft: 'auto', color: CZ, fontSize: '16px', transition: 'transform .18s', transform: isHov ? 'translateX(4px)' : '' }}>→</span>
                        </div>
                      </div>
                    </div>
                  </RevealBlock>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ════ WHY CLAUDE ZONE STRIP ════ */}
      <section style={{ background: '#1a1917', color: '#fff', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.03) 1.5px,transparent 1.5px)', backgroundSize: '24px 24px', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '500px', height: '400px', background: `radial-gradient(ellipse at top right, ${CZ}20, transparent 65%)`, pointerEvents: 'none' }}/>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <RevealBlock>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div className="cz-section-label" style={{ color: CZ, marginBottom: '14px' }}>Why Claude Zone</div>
              <h2 style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 700, letterSpacing: '-.04em', lineHeight: 1.05 }}>
                Not a wrapper. <em style={{ fontStyle: 'italic', color: CZ }}>An unfair advantage.</em>
              </h2>
            </div>
          </RevealBlock>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '16px' }}>
            {[
              { icon: '🧠', title: 'Claude-native', body: 'Built directly on the Claude API — not a wrapper over a wrapper. You get full model capability.' },
              { icon: '🏢', title: 'Business context baked in', body: 'Every deployment is trained on your workflows, your data, and your team — not generic AI outputs.' },
              { icon: '⚡', title: 'Ships to production', body: 'Every solution is live-deployed with real data, not a slide deck or a demo environment.' },
              { icon: '🔒', title: 'Your data stays yours', body: 'No training on your data. Supabase-backed storage. Full auditability on every API call.' },
            ].map((item, i) => (
              <RevealBlock key={i} delay={i * 80}>
                <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '20px', padding: '28px 24px', height: '100%', transition: 'background .2s, border-color .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.14)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)' }}>
                  <div style={{ fontSize: '28px', marginBottom: '14px' }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{item.title}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,.55)', lineHeight: 1.75 }}>{item.body}</div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ════ DETAIL SLIDE-IN ════ */}
      {detail && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex' }}>
          {/* Backdrop */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,25,23,.5)', backdropFilter: 'blur(4px)', animation: 'fadeIn .2s ease' }} onClick={closeDetail}/>
          
          {/* Panel */}
          <div className="det-open" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 'min(680px,100vw)', background: '#fff', overflowY: 'auto', zIndex: 1 }}>

            {/* Sticky nav */}
            <div style={{ position: 'sticky', top: 0, zIndex: 10, height: '60px', background: 'rgba(255,255,255,.96)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #e2e1de', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 24px' }}>
              <button onClick={closeDetail} style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '10px', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6b6a66', background: '#f2f1ef', border: '1px solid #e2e1de', padding: '6px 14px', borderRadius: '9999px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all .15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#1a1917'; e.currentTarget.style.background = '#e8e7e4' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#6b6a66'; e.currentTarget.style.background = '#f2f1ef' }}>
                ← Back
              </button>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '9px', letterSpacing: '.14em', color: '#a09e99', textTransform: 'uppercase' }}>Claude Zone</span>
              <button onClick={() => document.getElementById('cz-lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ marginLeft: 'auto', fontFamily: "'IBM Plex Mono',monospace", fontSize: '10px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', background: CZ, color: '#fff', padding: '8px 18px', borderRadius: '9999px', border: 'none', cursor: 'pointer', transition: 'all .15s', boxShadow: `0 3px 14px rgba(204,78,42,.35)` }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 6px 20px rgba(204,78,42,.4)` }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 3px 14px rgba(204,78,42,.35)` }}>
                ⚡ I need this
              </button>
            </div>

            <div style={{ padding: '0 32px 80px' }}>
              {/* Hero */}
              <div style={{ padding: '40px 0 28px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {detail.industry && <span className="cz-tag" style={{ background: CZL, color: CZ, border: `1px solid ${CZB}` }}>{detail.industry.toUpperCase()}</span>}
                  {detail.use_case && <span className="cz-tag" style={{ background: '#f2f1ef', color: '#6b6a66', border: '1px solid #e2e1de' }}>{detail.use_case}</span>}
                  {detail.complexity_level && <span className="cz-tag" style={{ background: '#f2f1ef', color: '#a09e99', border: '1px solid #e2e1de' }}>{detail.complexity_level.toUpperCase()}</span>}
                </div>
                <h1 style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: 'clamp(24px,4vw,40px)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1.1, marginBottom: '12px', color: '#1a1917' }}>{detail.title}</h1>
                <p style={{ fontSize: '16px', color: '#6b6a66', lineHeight: 1.7, fontFamily: "'Inter',sans-serif", fontWeight: 300 }}>{detail.tagline || ''}</p>
              </div>

              {/* Media */}
              {detail.video_url && (() => {
                const m = detail.video_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
                return m ? (
                  <div style={{ marginBottom: '28px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e1de' }}>
                    <iframe src={`https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`} style={{ width: '100%', height: '340px', border: 'none', display: 'block' }} allowFullScreen loading="lazy"/>
                  </div>
                ) : null
              })()}
              {!detail.video_url && detail.cover_image_url && (
                <div style={{ marginBottom: '28px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e1de' }}>
                  <img src={detail.cover_image_url} alt={detail.title} style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }}/>
                </div>
              )}

              {/* Meta row */}
              {(detail.implementation_time || detail.roi_claim || detail.claude_model) && (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
                  {detail.implementation_time && (
                    <div style={{ background: '#f8f8f7', borderRadius: '12px', padding: '12px 18px', border: '1px solid #e2e1de', flex: 1, minWidth: '100px' }}>
                      <div style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: '18px', fontWeight: 700, color: '#1a1917' }}>{detail.implementation_time}</div>
                      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '8px', color: '#a09e99', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: '3px' }}>To Production</div>
                    </div>
                  )}
                  {detail.roi_claim && (
                    <div style={{ background: CZL, borderRadius: '12px', padding: '12px 18px', border: `1px solid ${CZB}`, flex: 2, minWidth: '160px' }}>
                      <div style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: '14px', fontWeight: 700, color: CZ }}>{detail.roi_claim}</div>
                      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '8px', color: CZ, letterSpacing: '.12em', textTransform: 'uppercase', opacity: .7, marginTop: '3px' }}>ROI Claim</div>
                    </div>
                  )}
                  {detail.claude_model && (
                    <div style={{ background: '#f8f8f7', borderRadius: '12px', padding: '12px 18px', border: '1px solid #e2e1de', flex: 1, minWidth: '100px' }}>
                      <div style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: '14px', fontWeight: 600, color: '#1a1917' }}>{detail.claude_model}</div>
                      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '8px', color: '#a09e99', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: '3px' }}>AI Model</div>
                    </div>
                  )}
                </div>
              )}

              {/* Tools */}
              {(detail.tools_mentioned || []).length > 0 && (
                <div style={{ background: '#f8f8f7', borderRadius: '16px', padding: '18px 20px', marginBottom: '24px', border: '1px solid #e2e1de' }}>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '8px', color: '#a09e99', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: '12px' }}>Tools in this solution</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {detail.tools_mentioned.map(t => (
                      <span key={t} className="cz-tag" style={{ background: t.toLowerCase().includes('claude') ? CZL : '#fff', color: t.toLowerCase().includes('claude') ? CZ : '#6b6a66', border: `1px solid ${t.toLowerCase().includes('claude') ? CZB : '#e2e1de'}`, padding: '5px 12px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Short answer */}
              {detail.short_answer && (
                <div style={{ borderLeft: '3px solid #16a34a', background: 'rgba(22,163,74,.05)', borderRadius: '0 12px 12px 0', padding: '16px 20px', marginBottom: '20px' }}>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '8px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#16a34a', marginBottom: '8px' }}>Quick Answer</div>
                  <div style={{ fontSize: '14px', lineHeight: 1.75, fontWeight: 500, color: '#1a1917', fontFamily: "'Inter',sans-serif" }}>{detail.short_answer}</div>
                </div>
              )}

              {/* Summary */}
              {detail.summary && (
                <div style={{ borderLeft: `3px solid ${CZ}`, background: CZL, borderRadius: '0 12px 12px 0', padding: '16px 20px', marginBottom: '20px' }}>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '8px', letterSpacing: '.14em', textTransform: 'uppercase', color: CZ, marginBottom: '8px' }}>Solution Summary</div>
                  <div style={{ fontSize: '14px', lineHeight: 1.75, color: '#6b6a66', fontFamily: "'Inter',sans-serif" }}>{detail.summary}</div>
                </div>
              )}

              {/* Takeaways */}
              {(detail.key_takeaways || []).length > 0 && (
                <div style={{ marginBottom: '28px' }}>
                  <div className="cz-section-label" style={{ marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #e2e1de' }}>Key Takeaways</div>
                  {detail.key_takeaways.map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: '14px', padding: '12px 0', borderBottom: '1px solid #f2f1ef' }}>
                      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '10px', color: CZ, fontWeight: 600, flexShrink: 0, marginTop: '2px', minWidth: '22px' }}>0{i + 1}</span>
                      <span style={{ fontSize: '14px', lineHeight: 1.75, color: '#6b6a66', fontFamily: "'Inter',sans-serif" }}>{t}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Content HTML */}
              {detail.content_html && (
                <div style={{ marginBottom: '28px' }}>
                  <div className="cz-section-label" style={{ marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #e2e1de' }}>Full Breakdown</div>
                  <div className="prose" dangerouslySetInnerHTML={{ __html: detail.content_html }}/>
                </div>
              )}

              {/* FAQs */}
              {(detail.faqs || []).length > 0 && (
                <div style={{ marginBottom: '28px' }}>
                  <div className="cz-section-label" style={{ marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #e2e1de' }}>Frequently Asked</div>
                  {detail.faqs.map((f, i) => (
                    <FaqItem key={i} q={f.question} a={f.answer}/>
                  ))}
                </div>
              )}

              {/* Author block */}
              {detail.author_name && (
                <AuthorBlock post={detail} />
              )}

              {/* CTA Lead form */}
              <div id="cz-lead-form" style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #e2e1de', marginTop: '16px' }}>
                {/* Dark header */}
                <div style={{ background: '#1a1917', padding: '28px 28px 24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.04) 1.5px,transparent 1.5px)', backgroundSize: '20px 20px' }}/>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '150px', background: `radial-gradient(ellipse at top right, ${CZ}35, transparent 70%)` }}/>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="cz-section-label" style={{ color: CZ, marginBottom: '10px' }}>Ready to deploy?</div>
                    <div style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-.02em', lineHeight: 1.15 }}>
                      Book a free 30-min call.<br/><em style={{ fontStyle: 'italic', color: CZ }}>Let's make this happen.</em>
                    </div>
                    <div style={{ display: 'flex', gap: '18px', marginTop: '16px', flexWrap: 'wrap' }}>
                      {['Production in 28 days', 'No pilots — real deployment', 'India-specific AI context'].map(p => (
                        <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,.6)', fontFamily: "'Inter',sans-serif" }}>
                          <span style={{ color: CZ, fontSize: '10px' }}>✓</span>{p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div style={{ background: '#fff', padding: '24px 28px' }}>
                  {submitted ? (
                    <div style={{ padding: '32px 0', textAlign: 'center' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: CZL, border: `2px solid ${CZ}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '22px' }}>✓</div>
                      <div style={{ fontFamily: "'Chakra Petch',sans-serif", fontSize: '16px', fontWeight: 600, color: '#1a1917', marginBottom: '6px' }}>We'll reach out within 4 hours</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#a09e99', lineHeight: 1.7 }}>Check your inbox. We look forward to learning about your business and figuring this out together.</div>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                        {[['name', 'Your name', 'text'], ['company', 'Company', 'text']].map(([id, ph, type]) => (
                          <div key={id}>
                            <label style={{ display: 'block', fontFamily: "'IBM Plex Mono',monospace", fontSize: '8px', color: '#a09e99', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '6px' }}>{ph}</label>
                            <input type={type} placeholder={ph} value={form[id]} onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                              style={{ width: '100%', border: '1px solid #e2e1de', borderRadius: '10px', padding: '10px 13px', fontSize: '13px', color: '#1a1917', background: '#faf9f7', outline: 'none', fontFamily: "'Inter',sans-serif", transition: 'border-color .15s' }}
                              onFocus={e => e.target.style.borderColor = CZ}
                              onBlur={e => e.target.style.borderColor = '#e2e1de'}/>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                        {[['phone', 'Phone / WhatsApp', 'tel'], ['email', 'Email', 'email']].map(([id, ph, type]) => (
                          <div key={id}>
                            <label style={{ display: 'block', fontFamily: "'IBM Plex Mono',monospace", fontSize: '8px', color: '#a09e99', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '6px' }}>{ph}</label>
                            <input type={type} placeholder={ph} value={form[id]} onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                              style={{ width: '100%', border: '1px solid #e2e1de', borderRadius: '10px', padding: '10px 13px', fontSize: '13px', color: '#1a1917', background: '#faf9f7', outline: 'none', fontFamily: "'Inter',sans-serif", transition: 'border-color .15s' }}
                              onFocus={e => e.target.style.borderColor = CZ}
                              onBlur={e => e.target.style.borderColor = '#e2e1de'}/>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontFamily: "'IBM Plex Mono',monospace", fontSize: '8px', color: '#a09e99', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '6px' }}>What do you want to automate?</label>
                        <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Briefly describe the problem or workflow…" rows={3}
                          style={{ width: '100%', border: '1px solid #e2e1de', borderRadius: '10px', padding: '10px 13px', fontSize: '13px', color: '#1a1917', background: '#faf9f7', outline: 'none', resize: 'vertical', fontFamily: "'Inter',sans-serif", lineHeight: 1.6, transition: 'border-color .15s' }}
                          onFocus={e => e.target.style.borderColor = CZ}
                          onBlur={e => e.target.style.borderColor = '#e2e1de'}/>
                      </div>
                      <button onClick={submitLead} disabled={submitting}
                        style={{ width: '100%', padding: '13px', borderRadius: '12px', background: submitting ? '#d4d3cf' : CZ, color: '#fff', border: 'none', fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all .15s', boxShadow: submitting ? 'none' : `0 4px 16px rgba(204,78,42,.3)` }}>
                        {submitting ? 'Sending…' : '⚡ Lets talk — book a call'}
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <div className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="faq-icon">+</span>
      </div>
      <div className="faq-a"><p style={{ fontSize: '13px', lineHeight: 1.75, color: '#6b6a66', fontFamily: "'Inter',sans-serif" }}>{a}</p></div>
    </div>
  )
}
