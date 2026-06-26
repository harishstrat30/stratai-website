import HeroSection         from '@/components/sections/HeroSection'
import ContrastBlock       from '@/components/sections/ContrastBlock'
import ClienteleSection    from '@/components/sections/ClienteleSection'
import FeaturesSection     from '@/components/sections/FeaturesSection'
import StatsSection        from '@/components/sections/StatsSection'
import CaseStudiesSection  from '@/components/sections/CaseStudiesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import EngagementTeaser    from '@/components/sections/EngagementTeaser'
import CTASection          from '@/components/sections/CTASection'
import {
  getFeaturedServices, getCaseStudies,
  getFeaturedTestimonials, getStats,
} from '@/lib/supabase'


export const metadata = {
  title: 'AI for Manufacturing Companies in India | StratAI™ — AI Advantage Systems',
  description: 'StratAI builds AI Advantage Systems for mid-market manufacturing companies in India. Quality, Throughput, Delivery, Revenue & Procurement Advantage — measurable in your P&L within 6 months.',
  keywords: [
    'ai for manufacturing companies', 'manufacturing ai solutions', 'ai implementation partner',
    'manufacturer ai partner', 'ai transformation manufacturing', 'ai-as-a-service manufacturing',
    'AI Advantage Systems', 'mid-market manufacturing AI', 'AI consulting India',
  ],
  alternates: { canonical: 'https://stratai.io/' },
  openGraph: {
    title: 'AI for Manufacturing Companies in India | StratAI™',
    description: 'StratAI builds AI Advantage Systems for mid-market manufacturing companies in India. Measurable in your P&L within 6 months.',
    url: 'https://stratai.io/',
  },
}

export default async function HomePage() {
  const [services, caseStudies, testimonials, stats] = await Promise.all([
    getFeaturedServices().catch(() => []),
    getCaseStudies().catch(() => []),
    getFeaturedTestimonials().catch(() => []),
    getStats().catch(() => []),
  ])

  // CLA-148: Remove LKN dummy case study
  const filteredCaseStudies = caseStudies.filter(cs =>
    cs.slug !== 'lakshmi-krishna-naturals' &&
    cs.client !== 'Lakshmi Krishna Naturals' &&
    !cs.title?.toLowerCase().includes('lakshmi')
  )

  return (
    <>
      {/* M2: New hero */}
      <HeroSection />

      {/* M2: Core contrast block + 5 systems strip */}
      <ContrastBlock />

      {/* M2: Stats with new numbers */}
      <StatsSection stats={stats} />

      {/* Existing: animated features/services section */}
      <FeaturesSection services={services} />

      {/* M2: Services 4-grid + Engagement 3-step teaser */}
      <EngagementTeaser />

      {/* M2: Clientele section */}
      <ClienteleSection />

      {/* Existing: Case Studies (LKN filtered out) */}
      <CaseStudiesSection caseStudies={filteredCaseStudies} ctas={{}} />

      {/* Existing: Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* M2: New CTA */}
      <CTASection />
    </>
  )
}
