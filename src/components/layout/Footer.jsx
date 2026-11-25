import Link from 'next/link'
import { getSettings } from '@/lib/supabase'
import StratAILogo from '@/components/ui/StratAILogo'

export default async function Footer() {
  const s = await getSettings().catch(() => ({}))
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: 'var(--bg-dark)', borderTop: '1px solid #1f1f1e' }}>

      {/* ── Compelling CTA band ── */}
      <div style={{ borderBottom: '1px solid #1f1f1e', padding: 'clamp(44px,6vw,72px) clamp(16px,4vw,24px)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.12em', marginBottom: '18px' }}>
            YOUR NEXT MOVE
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,58px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#fff', marginBottom: '18px' }}>
            Your competitor is building<br />
            <span style={{ background: 'linear-gradient(135deg, var(--orange) 0%, #FF8C00 50%, #FFD700 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              AI advantage right now.
            </span>
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.50)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: '1.7' }}>
            Start your free half-day audit. We identify 3–5 high-value AI use cases specific to your business — no fee, no commitment.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ padding: '13px 30px', borderRadius: '9999px', background: 'var(--orange)', border: '1px solid var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
              → Book Free Half-Day Audit
            </Link>
            <Link href="/engagement-model" style={{ padding: '13px 30px', borderRadius: '9999px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
              How We Work →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Footer columns ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(28px,4vw,48px) clamp(16px,4vw,24px) clamp(24px,4vw,40px)' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '40px' }}>
          <div>
            {/* Logo with ™ */}
            <div style={{ marginBottom: '14px' }}>
              <StratAILogo size={36} dark={true} animated={false} showText={true} showTM={true} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '13px', lineHeight: '1.7', maxWidth: '260px', marginBottom: '18px' }}>
              Building AI Advantage Systems for mid-market manufacturing companies. Measurable in your P&L within 6 months.
            </p>
            <a href="mailto:harish@stratai.io" style={{ color: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '12px', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>
              harish@stratai.io
            </a>
            <a href="tel:+919600971045" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)', fontSize: '12px', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>
              +91 96009 71045
            </a>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.3)', lineHeight: '1.6', marginBottom: '10px' }}>
              Code Base, SMM Apartments,<br />NRI Gardens, Saravanampatti,<br />Coimbatore 641035
            </div>
            <a
              href="https://wa.me/919600971045?text=Hi%20StratAI%2C%20I%20would%20like%20to%20know%20more%20about%20AI%20Advantage%20Systems."
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '9999px', background: '#25D366', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, textDecoration: 'none' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>

          {[
            {
              label: 'WHAT WE BUILD',
              links: [
                ['/advantage-systems', 'AI Advantage Systems'],
                ['/advantage-systems#qas', 'Quality Advantage (QAS)'],
                ['/advantage-systems#tas', 'Throughput Advantage (TAS)'],
                ['/advantage-systems#ras', 'Revenue Advantage (RAS)'],
                ['/engagement-model', 'Engagement Model'],
              ],
            },
            {
              label: 'SERVICES',
              links: [
                ['/services', 'All Services'],
                ['/services/ai-transformation-strategy', 'AI Strategy Consulting'],
                ['/services/autonomous-agent-systems', 'AI Systems Architecture'],
                ['/services/marketing-automation', 'AI Technical Configuration'],
                ['/services/ecommerce-ai', 'AI Implementation'],
              ],
            },
            {
              label: 'COMPANY',
              links: [
                ['/about', 'About Us'],
                ['/case-studies', 'Case Studies'],
                ['/knowledge-hub', 'Knowledge Hub'],
                ['/contact', 'Contact'],
              ],
            },
          ].map(col => (
            <div key={col.label}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: '14px' }}>{col.label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {col.links.map(([href, label]) => (
                  <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #1f1f1e', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>
            © {year} STRATWORKS CONSULTING LLP · ALL RIGHTS RESERVED.
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>
            COIMBATORE, INDIA · AI ADVANTAGE SYSTEMS FOR MANUFACTURING
          </span>
        </div>
      </div>
    </footer>
  )
}
