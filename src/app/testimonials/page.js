import { getTestimonials } from '@/lib/supabase'
import { testimonialSchema, breadcrumbSchema, serializeSchema } from '@/lib/schema'
import TestimonialsPageGrid from '@/components/sections/TestimonialsPageGrid'

export const revalidate = 60

export const metadata = {
  alternates: { canonical: 'https://stratai.io/testimonials' },
  title: { absolute: 'Client Testimonials — Video, Audio & Written Reviews | StratAI™' },
  description: "Hear directly from StratAI's manufacturing clients — video testimonials, audio interviews with transcripts, and written reviews on the AI Advantage Systems that moved their P&L.",
  keywords: [
    'stratai testimonials', 'stratai client reviews', 'ai manufacturing case studies',
    'client video testimonials', 'manufacturing ai reviews',
  ],
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials().catch(() => [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--border)', padding: '80px 24px 56px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '12px' }}>CLIENT VOICES</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,6vw,76px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--text)', marginBottom: '18px' }}>
            HEAR IT FROM THE<br />PEOPLE WE'VE HELPED.
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '17px', maxWidth: '520px', lineHeight: '1.65' }}>
            Video, audio, and written testimonials from manufacturing leaders who put StratAI's AI Advantage Systems to work.
          </p>
        </div>
      </div>

      <div style={{ padding: '64px 0' }}>
        <TestimonialsPageGrid testimonials={testimonials} />
      </div>

      {testimonials.map(t => (
        <script key={t.id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(testimonialSchema(t)) }} />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Testimonials', url: '/testimonials' }])) }}
      />
    </div>
  )
}
