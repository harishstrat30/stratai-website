import { supabase, getFeaturedTestimonials } from '@/lib/supabase'
import CaseStudiesView from './CaseStudiesView'
import { FEATURED } from './content'
import { attachCovers } from './covers'

export const metadata = {
  alternates: { canonical: 'https://stratai.io/case-studies' },
  title: { absolute: 'AI Case Studies for Manufacturers | Measurable P&L Impact | StratAI™' },
  description: "Explore StratAI's AI case studies for manufacturing companies in India. Real P&L impact, cost savings and quality improvements — measurable results from Quality, Throughput and Procurement Advantage Systems.",
  keywords: [
    'ai roi for manufacturers', 'manufacturing ai solutions', 'ai cost savings manufacturing',
    'ai transformation manufacturing', 'ai quality control services', 'ai defect detection',
  ],
}

// Case studies with their KPIs and tags (the public view does not expose kpis/tags).
async function getCaseStudiesWithKpis() {
  const { data } = await supabase
    .from('case_studies')
    .select('id,title,slug,client,industry,challenge,solution,kpis,tags,sort_order,published_at')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('published_at', { ascending: false })
  return attachCovers(data ?? [])
}

export default async function CaseStudiesPage() {
  const [items, testimonials] = await Promise.all([
    getCaseStudiesWithKpis().catch(() => []),
    getFeaturedTestimonials().catch(() => []),
  ])
  // All client reviews with a quote, for the slideshow. The featured client's own review goes first.
  const own = t => (t.company && FEATURED.title.includes(t.company) ? 0 : 1)
  const quotes = testimonials.filter(t => t.quote).sort((a, b) => own(a) - own(b))
  return <CaseStudiesView items={items} quotes={quotes} />
}
