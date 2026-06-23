// AuthorBlock — "Written by" section shown below article content
// Accepts either:
//   <AuthorBlock post={post} />           — uses post.author_* fields from view (no extra fetch)
//   <AuthorBlock authorId="uuid" />       — fetches author by ID
//   <AuthorBlock author={authorObject} /> — pre-fetched object

'use client'
import { useState, useEffect } from 'react'

const SB   = 'https://cinlfqmiiabwmeunowol.supabase.co'
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpbmxmcW1paWFid21ldW5vd29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0OTcwNzYsImV4cCI6MjA5MDA3MzA3Nn0.MP4Tn7lgqCEoOic7TabvAak9VYKdS_WtWu7M1G2AgSg'

export default function AuthorBlock({ post, authorId, author: authorProp }) {
  // Build author from inline post fields if available
  const inlineAuthor = post?.author_name ? {
    id:           post.author_id,
    name:         post.author_name,
    slug:         post.author_slug,
    role:         post.author_role,
    credentials:  post.author_credentials,
    bio:          post.author_bio,
    linkedin_url: post.author_linkedin_url,
    avatar_url:   post.author_avatar_url,
  } : null

  const [author, setAuthor] = useState(inlineAuthor || authorProp || null)

  useEffect(() => {
    // If we already have an author from inline fields or prop, skip fetch
    if (inlineAuthor || authorProp) return
    if (!authorId) return
    fetch(`${SB}/rest/v1/authors?id=eq.${authorId}&select=*&limit=1`, {
      headers: { 'apikey': ANON, 'Authorization': 'Bearer ' + ANON }
    })
      .then(r => r.json())
      .then(d => { if (d?.[0]) setAuthor(d[0]) })
      .catch(() => {})
  }, [authorId])

  if (!author?.name) return null

  const initials = author.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const credentials = [author.role, author.credentials].filter(Boolean).join('  ·  ')

  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      marginTop: '56px',
      paddingTop: '36px',
    }}>
      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        letterSpacing: '.2em',
        textTransform: 'uppercase',
        color: 'var(--text3)',
        marginBottom: '16px',
      }}>
        Written by
      </div>

      {/* Card */}
      <div style={{
        display: 'flex',
        gap: '22px',
        alignItems: 'flex-start',
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        padding: '24px 26px',
      }}>
        {/* Avatar */}
        <div style={{ flexShrink: 0 }}>
          {author.avatar_url ? (
            <img
              src={author.avatar_url}
              alt={author.name}
              style={{
                width: '76px', height: '76px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--border)',
                display: 'block',
              }}
            />
          ) : (
            <div style={{
              width: '76px', height: '76px',
              borderRadius: '50%',
              background: 'var(--bg-dark)',
              border: '2px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '24px', fontWeight: 700,
              color: 'rgba(255,255,255,.75)',
              letterSpacing: '-.02em',
            }}>
              {initials}
            </div>
          )}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Name */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '19px', fontWeight: 700,
            letterSpacing: '-.03em',
            color: 'var(--text)',
            lineHeight: 1.2,
            marginBottom: '3px',
          }}>
            {author.name}
          </div>

          {/* LinkedIn */}
          {author.linkedin_url && (
            <a
              href={author.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: '#0077b5',
                textDecoration: 'none',
                letterSpacing: '.04em',
                display: 'inline-block',
                marginBottom: '8px',
                borderBottom: '1px solid rgba(0,119,181,.22)',
                transition: 'border-color .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#0077b5'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,119,181,.22)'}
            >
              {author.linkedin_url.replace(/^https?:\/\//i, '')}
            </a>
          )}

          {/* Role · Credentials */}
          {credentials && (
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text3)',
              letterSpacing: '.05em',
              marginBottom: '12px',
              lineHeight: 1.6,
            }}>
              {credentials}
            </div>
          )}

          {/* Bio */}
          {author.bio && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--text2)',
              lineHeight: 1.8,
              margin: 0,
            }}>
              {author.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
