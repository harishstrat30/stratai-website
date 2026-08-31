'use client'
import { useEffect, useState } from 'react'

// Click-to-play facade: shows a static thumbnail + play button, only loads
// the real YouTube/Vimeo iframe (and its JS/tracking) once the visitor clicks.
// Keeps testimonial cards that are never played from costing any video weight.

function extractYouTubeId(url) {
  const m = (url || '').match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{6,})/)
  return m ? m[1] : null
}
function extractVimeoId(url) {
  const m = (url || '').match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return m ? m[1] : null
}
function isShortsUrl(url) {
  return /youtube\.com\/shorts\//.test(url || '')
}

export default function YouTubeFacade({ url, title = 'Client testimonial video' }) {
  const [playing, setPlaying] = useState(false)
  const [vimeoThumb, setVimeoThumb] = useState(null)

  const ytId = extractYouTubeId(url)
  const vimeoId = !ytId ? extractVimeoId(url) : null
  // Shorts are vertical (9:16) — forcing them into a 16:9 box would letterbox
  // them awkwardly, so give this one case its own portrait treatment, capped
  // to a sensible phone-ish width instead of stretching full card width.
  const isShorts = ytId ? isShortsUrl(url) : false

  useEffect(() => {
    if (!vimeoId || !url) return
    fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`)
      .then(r => r.json())
      .then(d => setVimeoThumb(d.thumbnail_url))
      .catch(() => {})
  }, [vimeoId, url])

  if (!ytId && !vimeoId) return null

  const embedSrc = ytId
    ? `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1`
    : `https://player.vimeo.com/video/${vimeoId}?autoplay=1`
  const thumbSrc = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : vimeoThumb

  const frameStyle = isShorts
    ? { width: '100%', maxWidth: '260px', aspectRatio: '9/16', margin: '0 auto' }
    : { width: '100%', aspectRatio: '16/9' }

  if (playing) {
    return (
      <div style={{ ...frameStyle, position: 'relative', background: '#000', borderRadius: 'var(--r)', overflow: 'hidden' }}>
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    )
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      style={{ ...frameStyle, position: 'relative', border: 'none', padding: 0, cursor: 'pointer', borderRadius: 'var(--r)', overflow: 'hidden', background: '#111', display: 'block' }}
    >
      {thumbSrc && (
        <img src={thumbSrc} alt="" width={640} height={360} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
      )}
      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)' }}>
        <span style={{
          width: '64px', height: '64px', borderRadius: '50%', background: 'var(--orange)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.35)', transition: 'transform 0.15s',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: '2px' }}><path d="M8 5v14l11-7z" /></svg>
        </span>
      </span>
    </button>
  )
}
