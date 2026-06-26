'use client'
import { useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const sb = createClient('https://cinlfqmiiabwmeunowol.supabase.co','sb_publishable_cgStjgEhCnFlQi58_VYFvA_6gRE-tYo')

async function submitLead(fd) {
  const get = k => fd.get(k)?.toString().trim() || null
  const name = get('name')
  const email = fd.get('email')?.toString().trim().toLowerCase()
  if (!name || !email) return { success: false, error: 'Name and email are required.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: 'Please enter a valid email address.' }
  const { error } = await sb.from('leads').insert({
    name, email,
    phone: get('phone'),
    company: get('company'),
    service_interest: get('service_interest'),
    message: get('message'),
    source: get('source') || 'website',
    lead_source_page: get('lead_source_page'),
    lead_source_url: get('lead_source_url'),
  })
  if (error) return { success: false, error: 'Something went wrong. Please try again.' }
  return { success: true }
}

const SERVICES = [
  'AI Strategy Consulting',
  'AI Systems Architecture',
  'AI Technical Configuration',
  'AI Implementation',
  'Identify Which AI Advantage System Fits My Business',
  'Other',
]

export default function ContactForm({ sourcePage = null }) {
  const [state, setState] = useState('idle')
  const [err, setErr]     = useState('')
  const formRef           = useRef()
  const pathname          = usePathname()

  // Auto-detect source from pathname if not explicitly provided
  const resolvedSource = sourcePage || (() => {
    if (!pathname || pathname === '/') return 'home'
    if (pathname.startsWith('/services')) return 'services'
    if (pathname.startsWith('/advantage-systems')) return 'advantage-systems'
    if (pathname.startsWith('/engagement-model')) return 'engagement-model'
    if (pathname.startsWith('/about')) return 'about'
    if (pathname.startsWith('/case-studies')) return `case-study${pathname.replace('/case-studies', '')}`
    if (pathname.startsWith('/blog')) return `blog${pathname.replace('/blog', '')}`
    if (pathname.startsWith('/knowledge-hub')) return 'knowledge-hub'
    if (pathname.startsWith('/contact')) return 'contact-direct'
    return pathname
  })()

  const inp = { padding: '10px 12px', borderRadius: 'var(--rs)', border: '1px solid var(--border2)', background: 'var(--bg)', color: 'var(--text)', fontSize: '14px', outline: 'none', width: '100%', fontFamily: 'inherit', transition: 'border-color 0.15s' }
  const lbl = { fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text3)', display: 'block', marginBottom: '6px' }

  async function onSubmit(e) {
    e.preventDefault()
    setState('loading')
    setErr('')
    const fd = new FormData(formRef.current)
    fd.set('source', resolvedSource)
    fd.set('lead_source_page', resolvedSource)
    fd.set('lead_source_url', typeof window !== 'undefined' ? window.location.href : pathname)
    const r = await submitLead(fd)
    if (r.success) { setState('success'); formRef.current?.reset() }
    else { setState('error'); setErr(r.error || 'Something went wrong.') }
  }

  if (state === 'success') return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '20px', color: 'var(--ok)' }}>✓</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '6px' }}>MESSAGE RECEIVED</h3>
      <p style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>We&apos;ll get back to you within 24 hours.</p>
      <button onClick={() => setState('idle')} style={{ padding: '7px 16px', border: '1px solid var(--border)', borderRadius: '9999px', background: 'transparent', fontSize: '10px', cursor: 'pointer', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'var(--text3)' }}>SEND ANOTHER</button>
    </div>
  )

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div><label style={lbl}>FULL NAME *</label><input name="name" type="text" placeholder="Your name" required style={inp} /></div>
        <div><label style={lbl}>WORK EMAIL *</label><input name="email" type="email" placeholder="you@company.com" required style={inp} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div><label style={lbl}>PHONE</label><input name="phone" type="tel" placeholder="+91 98765 43210" style={inp} /></div>
        <div><label style={lbl}>COMPANY</label><input name="company" type="text" placeholder="Your company" style={inp} /></div>
      </div>
      <div><label style={lbl}>I AM INTERESTED IN</label>
        <select name="service_interest" style={{ ...inp, appearance: 'none' }}>
          <option value="">Select…</option>
          {SERVICES.map(sv => <option key={sv} value={sv}>{sv}</option>)}
        </select>
      </div>
      <div><label style={lbl}>TELL US ABOUT YOUR BUSINESS</label>
        <textarea name="message" rows={4} placeholder="What do you manufacture, your team size, and what outcome you want AI to deliver…" style={{ ...inp, resize: 'vertical', minHeight: '90px' }} />
      </div>
      {state === 'error' && <div style={{ padding: '10px 12px', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 'var(--rs)', color: 'var(--danger)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>{err}</div>}
      <button type="submit" disabled={state === 'loading'} style={{ padding: '12px 22px', background: 'var(--orange)', border: 'none', borderRadius: '9999px', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', cursor: state === 'loading' ? 'not-allowed' : 'pointer', opacity: state === 'loading' ? 0.6 : 1, alignSelf: 'flex-start' }}>
        {state === 'loading' ? 'SENDING…' : 'SEND MESSAGE →'}
      </button>
      <p style={{ fontSize: '10px', color: 'var(--text3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>WE RESPECT YOUR PRIVACY AND WILL NEVER SHARE YOUR INFORMATION.</p>
    </form>
  )
}
