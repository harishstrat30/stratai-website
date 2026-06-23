import ContactForm from '@/components/ui/ContactForm'

export const metadata = {
  alternates: { canonical: 'https://stratai.io/contact' },
  title: { absolute: 'Contact StratAI™ | AI Consulting for Manufacturers | Book Free Half-Day Audit' },
  description: 'Contact StratAI to book your free half-day AI audit. We identify 3–5 high-value AI use cases for your manufacturing business — no fee, no commitment.',
  keywords: [
    'ai consulting services', 'ai for manufacturing companies', 'ai implementation partner',
    'manufacturer ai partner', 'industrial ai services', 'free AI audit manufacturing',
  ],
}

const PHONE = '+91-9600971045'
const PHONE_DISPLAY = '+91 96009 71045'
const ADDRESS = 'Stratworks Consulting LLP, Code Base, SMM Apartments, NRI Gardens, Kumutham Nagar, Saravanampatti, Coimbatore, Tamil Nadu 641035'
const GMB = 'https://g.page/r/CZnZvXbY2EqyEBI/'
const HOURS = [
  { day: 'Monday – Friday', time: '9:30 AM – 6:00 PM', open: true },
  { day: 'Saturday',        time: 'Closed',             open: false },
  { day: 'Sunday',          time: 'Closed',             open: false },
]

export default function ContactPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Hero + Form ── */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,24px) 0', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }} className="contact-grid">

          {/* Left — info */}
          <div style={{ paddingBottom: '72px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '12px' }}>GET IN TOUCH</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,68px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--text)', marginBottom: '18px' }}>BOOK YOUR FREE<br />HALF-DAY AI AUDIT —<br />TALK TO STRATAI.</h1>
            <p style={{ fontSize: '17px', color: 'var(--text2)', lineHeight: '1.7', marginBottom: '36px', maxWidth: '400px' }}>
              AI consulting services for manufacturing companies in India. Tell us about your business — we identify 3–5 high-value AI use cases, no fee, no commitment. Your manufacturer AI partner responds within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

              {/* Email */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: '5px' }}>EMAIL</div>
                <a href="mailto:harish@stratai.io" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--orange)', textDecoration: 'none' }}>harish@stratai.io</a>
              </div>

              {/* Phone + WhatsApp */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: '5px' }}>PHONE / WHATSAPP</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <a href={`tel:${PHONE}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text)', textDecoration: 'none' }}>{PHONE_DISPLAY}</a>
                  <a
                    href="https://wa.me/919600971045?text=Hi%20StratAI%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20know%20more%20about%20AI%20Advantage%20Systems%20for%20my%20business."
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px', borderRadius: '9999px', background: '#25D366', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textDecoration: 'none' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Chat on WhatsApp
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>Harish Kumaar A · Founder, StratAI</div>
              </div>

              {/* Address */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: '5px' }}>OFFICE ADDRESS</div>
                <a href={GMB} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text2)', textDecoration: 'none', lineHeight: '1.7', display: 'block' }}>
                  {ADDRESS}
                </a>
              </div>

              {/* Office Hours */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: '8px' }}>OFFICE HOURS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {HOURS.map(h => (
                    <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text2)' }}>{h.day}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: h.open ? 600 : 400, color: h.open ? 'var(--orange)' : 'var(--text3)' }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right — form */}
          <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 'clamp(24px,5vw,64px)', paddingBottom: '72px', paddingTop: '24px' }}>
            <ContactForm source="contact-page" />
          </div>
        </div>
      </div>

      {/* ── Google Map ── */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(16px,4vw,24px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '6px' }}>FIND US</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,32px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', margin: 0 }}>Our Office</h2>
            </div>
            <a
              href={GMB}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '9999px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text2)', textDecoration: 'none', letterSpacing: '0.06em' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Open in Google Maps
            </a>
          </div>

          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.446!2d76.9832!3d11.0481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7e3e8cfe8e3%3A0xb24a58d876bdbd99!2sSaravanampatti%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1683000000000!5m2!1sen!2sin"
              width="100%"
              height="420"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="StratAI Office — Saravanampatti, Coimbatore"
            />
          </div>

          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text2)', lineHeight: 1.7 }}>{ADDRESS}</span>
          </div>
        </div>
      </div>

    </div>
  )
}
