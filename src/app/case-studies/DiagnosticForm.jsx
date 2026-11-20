'use client'
import { useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { display } from './shared'
import { RESULT_OPTIONS } from './content'

const sb = createClient('https://cinlfqmiiabwmeunowol.supabase.co', 'sb_publishable_cgStjgEhCnFlQi58_VYFvA_6gRE-tYo')

export default function DiagnosticForm({ source = 'case-studies' }) {
  const ref = useRef()
  const [state, setState] = useState('idle')
  const [err, setErr] = useState('')
  const inp = { width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border2)', background: '#fff', color: 'var(--text)', fontSize: '15px', fontFamily: 'inherit', outline: 'none' }
  const lbl = { display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', margin: '0 0 6px' }
  async function onSubmit(e) {
    e.preventDefault()
    setState('loading'); setErr('')
    const fd = new FormData(ref.current)
    const get = k => fd.get(k)?.toString().trim() || null
    const email = (get('email') || '').toLowerCase()
    if (!get('name') || !email) { setState('error'); setErr('Name and email are required.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState('error'); setErr('Please enter a valid email address.'); return }
    const { error } = await sb.from('leads').insert({
      name: get('name'), email, phone: get('phone'), company: get('company'),
      service_interest: get('result'), message: `Case studies page: wants "${get('result')}"`,
      source, lead_source_page: source, lead_source_url: window.location.href,
    })
    if (error) { setState('error'); setErr('Something went wrong. Please try again.'); return }
    setState('success'); ref.current?.reset()
  }
  if (state === 'success') return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '48px 32px', textAlign: 'center', color: 'var(--text)' }}>
      <div style={{ fontSize: '28px', color: 'var(--ok)', marginBottom: '10px' }}>✓</div>
      <h3 style={{ ...display, fontSize: '22px', margin: '0 0 8px' }}>Request received</h3>
      <p style={{ color: 'var(--text2)', fontSize: '15px', margin: 0 }}>We will get back to you within 24 hours to schedule your plant diagnostic.</p>
    </div>
  )
  return (
    <form ref={ref} onSubmit={onSubmit} noValidate style={{ background: '#fff', borderRadius: '16px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div><label style={lbl} htmlFor="cs-name">Name</label><input id="cs-name" name="name" type="text" style={inp} required /></div>
      <div><label style={lbl} htmlFor="cs-company">Company</label><input id="cs-company" name="company" type="text" style={inp} /></div>
      <div><label style={lbl} htmlFor="cs-email">Work email</label><input id="cs-email" name="email" type="email" style={inp} required /></div>
      <div><label style={lbl} htmlFor="cs-phone">Phone or WhatsApp</label><input id="cs-phone" name="phone" type="tel" style={inp} /></div>
      <div><label style={lbl} htmlFor="cs-result">Which result do you want?</label>
        <select id="cs-result" name="result" style={inp}>{RESULT_OPTIONS.map(o => <option key={o}>{o}</option>)}</select>
      </div>
      {state === 'error' && <div role="alert" style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', color: 'var(--danger)', fontSize: '13px' }}>{err}</div>}
      <button type="submit" disabled={state === 'loading'} style={{ padding: '14px 18px', borderRadius: '8px', border: 'none', background: 'var(--orange)', color: '#fff', fontWeight: 600, fontSize: '15px', cursor: state === 'loading' ? 'not-allowed' : 'pointer', opacity: state === 'loading' ? 0.65 : 1, fontFamily: 'inherit' }}>
        {state === 'loading' ? 'Sending…' : 'Book my plant diagnostic'}
      </button>
    </form>
  )
}

