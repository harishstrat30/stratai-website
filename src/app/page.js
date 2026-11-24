import { DEFAULT_OG_IMAGE } from '@/lib/og'
import HomeView from '@/components/home/HomeView'
import { TRUST } from '@/components/home/content'
import { supabase, getFeaturedTestimonials, getStats, getTeam } from '@/lib/supabase'
import { withPostOverrides } from '@/components/blog/registry'

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
    images: [DEFAULT_OG_IMAGE],
  },
}

// The six newest published posts, newest first (posts with no publish date go last, like the Knowledge Hub).
async function getLatestPosts() {
  const { data } = await supabase
    .from('v_published_posts')
    .select('id,title,slug,excerpt,published_at,read_time_minutes,author_name,category_name')
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(6)
  return withPostOverrides(data ?? [])
}

export default async function HomePage() {
  const [stats, testimonials, posts, team] = await Promise.all([
    getStats().catch(() => []),
    getFeaturedTestimonials().catch(() => []),
    getLatestPosts().catch(() => []),
    getTeam().catch(() => []),
  ])

  // Three client reviews in the order the design uses; fall back to whatever is featured.
  const withQuote = testimonials.filter(t => t.quote)
  const picked = TRUST.reviewsOrder.map(n => withQuote.find(t => t.client_name === n)).filter(Boolean)
  const reviews = (picked.length === 3 ? picked : withQuote).slice(0, 3)

  return <HomeView stats={stats} reviews={reviews} posts={posts} team={team} />
}
