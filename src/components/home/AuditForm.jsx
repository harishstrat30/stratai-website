'use client'
import { useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { FORM, PHONE_DISPLAY, WHATSAPP } from './content'

const sb = createClient('https://cinlfqmiiabwmeunowol.supabase.co', 'sb_publishable_cgStjgEhCnFlQi58_VYFvA_6gRE-tYo')

// Hero form: "Tell us where it hurts". Saves a row in `leads` (email is NOT NULL there, so the PDF's
// four fields got a fifth: work email). `source` is saved so these leads can be told apart in the CMS.
export default function AuditForm({ source = 'homepage' }) {
  const ref = useRef()
  const [state, setState] = useState('idle')
  const [err, setErr] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setState('loading'); setErr('')
    const fd = new FormData(ref.current)
    const get = k => fd.get(k)?.toString().trim() || null
    const email = (get('email') || '').toLowerCase()
    if (!get('name') || !get('phone') || !email) { setState('error'); setErr('Name, mobile number and email are required.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState('error'); setErr('Please enter a valid email address.'); return }
    const { error } = await sb.from('leads').insert({
      name: get('name'), email, phone: get('phone'), company: get('company'),
      service_interest: get('costs'), message: `Homepage free audit request. What costs them most: "${get('costs')}"`,
      source, lead_source_page: source, lead_source_url: window.location.href,
    })
    if (error) { setState('error'); setErr('Something went wrong. Please try again, or WhatsApp us.'); return }
    setState('success'); ref.current?.reset()
  }

  if (state === 'success') {
    return (
      <div className="hm-form" id="audit" style={{ textAlign: 'center', padding: '56px 32px' }}>
        <div style={{ fontSize: '30px', color: 'var(--ok)', marginBottom: '10px' }}>✓</div>
        <h2>Request received</h2>
        <p className="hm-sub" style={{ margin: 0 }}>A co-founder will call you within one working day to plan your free half-day audit.</p>
      </div>
    )
  }

  return (
    <form ref={ref} onSubmit={onSubmit} noValidate className="hm-form" id="audit">
      <h2>{FORM.title}</h2>
      <p className="hm-sub">{FORM.sub}</p>
      <div className="hm-fgrid">
        <div className="hm-field"><label htmlFor="hm-name">Full name</label><input className="hm-input" id="hm-name" name="name" type="text" autoComplete="name" required /></div>
        <div className="hm-field"><label htmlFor="hm-phone">Mobile / WhatsApp</label><input className="hm-input" id="hm-phone" name="phone" type="tel" autoComplete="tel" required /></div>
        <div className="hm-field"><label htmlFor="hm-email">Work email</label><input className="hm-input" id="hm-email" name="email" type="email" autoComplete="email" required /></div>
        <div className="hm-field"><label htmlFor="hm-company">Company</label><input className="hm-input" id="hm-company" name="company" type="text" autoComplete="organization" /></div>
        <div className="hm-field full"><label htmlFor="hm-costs">What costs you most?</label>
          <select className="hm-input" id="hm-costs" name="costs" defaultValue={FORM.options[0]}>{FORM.options.map(o => <option key={o}>{o}</option>)}</select>
        </div>
      </div>
      {state === 'error' && <div role="alert" className="hm-err">{err}</div>}
      <button type="submit" disabled={state === 'loading'} className="hm-btn hm-btn-primary" style={state === 'loading' ? { opacity: 0.65, cursor: 'not-allowed' } : undefined}>
        {state === 'loading' ? 'Sending…' : FORM.button}
      </button>
      <p className="hm-alt-line">Or <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp us</a> · {PHONE_DISPLAY}</p>
      <div className="hm-assure">{FORM.trust.map(t => <span key={t}>{t}</span>)}</div>
    </form>
  )
}
