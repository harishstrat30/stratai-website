'use client'
import { useEffect, useRef, useState } from 'react'
import YouTubeFacade from '@/components/ui/YouTubeFacade'

const TYPE_LABEL = { video: '▶ VIDEO', audio: '♫ AUDIO', text: '" WRITTEN' }
const TYPE_COLOR = { video: 'var(--orange)', audio: 'var(--info)', text: 'var(--text3)' }

function StarRating({ rating = 5 }) {
  return (
    <div style={{ color: 'var(--orange)', fontSize: '13px', letterSpacing: '1px' }} aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}{'☆'.repeat(Math.max(0, 5 - rating))}
    </div>
  )
}

function PersonFooter({ t }) {
  const initials = (t.client_name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
      {t.avatar_public_url ? (
        <img src={t.avatar_public_url} alt="" width={40} height={40} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
      ) : (
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--text3)', flexShrink: 0 }}>
          {initials}
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{t.client_name}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.04em' }}>
          {[t.role, t.company].filter(Boolean).join(' · ').toUpperCase()}
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({ t, featured = false }) {
  const [showTranscript, setShowTranscript] = useState(false)

  return (
    <div style={{
      padding: featured ? '0' : '32px', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column', gap: '16px', height: '100%',
    }}>
      {!featured && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: TYPE_COLOR[t.type] }}>
            {TYPE_LABEL[t.type] || t.type}
          </span>
          <StarRating rating={t.rating || 5} />
        </div>
      )}

      {t.type === 'video' && t.video_url && (
        <YouTubeFacade url={t.video_url} title={`${t.client_name} testimonial`} />
      )}

      {t.type === 'audio' && t.audio_public_url && (
        <div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption -- transcript is provided as text below, per accessibility rules */}
          <audio controls preload="none" style={{ width: '100%' }} src={t.audio_public_url} />
          {t.transcript && (
            <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => setShowTranscript(v => !v)}
                aria-expanded={showTranscript}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '0.05em' }}
              >
                {showTranscript ? 'HIDE TRANSCRIPT −' : 'SHOW TRANSCRIPT +'}
              </button>
              {/* Kept in the DOM either way so screen readers and search engines always have it; only the visual reveal is toggled. */}
              <p style={{ marginTop: '10px', fontSize: '13px', lineHeight: 1.7, color: 'var(--text2)', display: showTranscript ? 'block' : 'none' }}>
                {t.transcript}
              </p>
            </div>
          )}
        </div>
      )}

      {t.quote && (
        <p style={{ fontSize: featured ? '18px' : '15px', lineHeight: 1.75, color: 'var(--text)', fontStyle: t.type === 'text' ? 'italic' : 'normal', margin: 0 }}>
          &ldquo;{t.quote}&rdquo;
        </p>
      )}

      <PersonFooter t={t} />
    </div>
  )
}

// `featured` (the pinned hero) and `testimonials` (the current page's grid items) are
// resolved server-side by the page — pagination/filtering means "which video is featured"
// can't be derived by just looking at whatever page of results happens to be in view.
export default function TestimonialsPageGrid({ testimonials = [], featured = null }) {
  const refs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)' }
      })
    }, { threshold: 0.1 })
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [testimonials])

  if (testimonials.length === 0 && !featured) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.08em' }}>
        TESTIMONIALS COMING SOON
      </div>
    )
  }

  return (
    <div>
      {featured && (
        <div style={{ maxWidth: '820px', margin: '0 auto 72px', padding: '0 24px' }}>
          <TestimonialCard t={featured} featured />
        </div>
      )}

      {testimonials.length > 0 && (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '1px', background: 'var(--border)' }}>
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                ref={el => refs.current[i] = el}
                style={{ opacity: 0, transform: 'translateY(16px)', transition: `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`, background: 'var(--bg)' }}
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
