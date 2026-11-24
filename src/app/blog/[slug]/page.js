import { ogImages } from '@/lib/og'
import { supabase, getPost, getAllPostSlugs, getContentImages } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import NewTemplatePost from '@/components/blog/NewTemplatePost'
import { NEW_TEMPLATE_POSTS, withPostOverrides } from '@/components/blog/registry'
import { modelFromEntry, modelFromPost } from '@/components/blog/models'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs || []
}

const BLOG_SEO = {
  'ai-implementation-manufacturing-cxo-guide': {
    title: 'AI Implementation Strategy for Manufacturing CXOs — A Complete Guide | StratAI™',
    description: 'A CXO guide to AI implementation strategy for manufacturing companies — covering roadmap, change management, pilot programs, and how to ensure AI shows up in your P&L.',
  },
  'ai-agentic-systems-sap-erp-manufacturing-shop-floor': {
    title: 'ERP AI Integration for Manufacturing Shop Floor — SAP & Agentic Systems | StratAI™',
    description: 'How AI agentic systems integrate with SAP ERP on the manufacturing shop floor — covering MES, SCADA, PLC and workflow implementation for mid-market Indian manufacturers.',
  },
  'ai-vendor-selection-manufacturing-domain-expertise': {
    title: 'How to Choose the Right AI Vendor for Manufacturing — Domain Expertise Guide | StratAI™',
    description: 'A practical guide to AI vendor selection for manufacturing companies — what to look for in an AI consulting partner, why domain expertise matters, and red flags to avoid.',
  },
  'ai-jewellery-manufacturing-catalogue-order-management': {
    title: 'AI for Jewellery Manufacturing — Catalogue & Order Management | StratAI™',
    description: 'How StratAI implemented AI for a jewellery manufacturer to automate catalogue management and order processing — a practical example of factory AI implementation in a high-SKU environment.',
  },
  'production-black-box-manufacturing-visibility': {
    title: 'The Production Black Box — How AI Performance Monitoring Gives Manufacturers Real Visibility | StratAI™',
    description: 'Most manufacturers operate blind. Learn how AI performance monitoring and analytics eliminate the production black box — giving CXOs real-time OEE, downtime and shop floor visibility.',
  },
  'stratai-anthropic-claude-partner-network-india-manufacturing': {
    title: 'StratAI Joins Anthropic Claude Partner Network — AI Consulting for Indian Manufacturers | StratAI™',
    description: 'StratAI is now an official Anthropic Claude Partner Network member — expanding AI consulting services and Claude-powered implementations for mid-market manufacturing companies across India.',
  },
  'ai-in-manufacturing-why-most-cxos-invest-and-never-see-it-in-the-pl': {
    title: 'Why Most Manufacturing CXOs Invest in AI and Never See It in the P&L | StratAI™',
    description: 'Most AI investments in manufacturing never show up in the P&L. StratAI explains why — and how to build AI ROI for manufacturers through outcome-focused implementation, not activity.',
  },
}

// Posts whose page top image is the bundled dark cover in /public/blog-covers (instead of their first content image).
const BUNDLED_COVER_HERO = new Set(['ai-in-manufacturing-oems-drive-ai-adoption-tier-suppliers'])

const withBrandSuffix =(t) => `${t.replace(/(\s*\|\s*StratAI™?)+\s*$/i, '').trim()} | StratAI™`

export async function generateMetadata({ params }) {
  const p = await getPost(params.slug).catch(() => null)
  if (!p) return { title: 'Post not found — StratAI' }
  const base = 'https://stratai.io'
  const url  = p.canonical_url || `${base}/blog/${p.slug}`
  const nt = NEW_TEMPLATE_POSTS[params.slug]?.POST
  const seoOverride = nt ? { title: nt.title, description: nt.metaDescription } : BLOG_SEO[params.slug]
  return {
    title:       { absolute: withBrandSuffix(seoOverride?.title || p.meta_title || p.title) },
    description: seoOverride?.description || p.meta_description || p.excerpt || '',
    robots:      p.robots        || 'index,follow',
    alternates:  { canonical: url },
    ...(p.author_name ? { authors: [{ name: p.author_name, url: p.author_linkedin_url || undefined }] } : {}),
    other: { 'content-language': 'en-IN' },
    openGraph: {
      title:       p.og_title       || p.meta_title    || p.title,
      description: p.og_description || p.meta_description || p.excerpt || '',
      url,
      siteName: 'StratAI',
      type: 'article',
      images: ogImages(p.og_image_url),
    },
    twitter: {
      card:        'summary_large_image',
      title:       p.og_title       || p.meta_title    || p.title,
      description: p.og_description || p.meta_description || '',
      images: [p.og_image_url || '/og'],
    },
  }
}

// "Keep reading": up to three other posts from the same category, topped up with the newest posts.
async function getRelatedPosts(post) {
  const query = () => supabase
    .from('v_published_posts')
    .select('slug,title,category_name')
    .neq('slug', post.slug)
    .order('published_at', { ascending: false, nullsFirst: false })
  const list = []
  if (post.category_slug) {
    const { data } = await query().eq('category_slug', post.category_slug).limit(3)
    list.push(...(data ?? []))
  }
  if (list.length < 3) {
    const { data } = await query().limit(8)
    for (const r of data ?? []) {
      if (list.length >= 3) break
      if (!list.some(x => x.slug === r.slug)) list.push(r)
    }
  }
  return withPostOverrides(list).map(r => ({ slug: r.slug, tag: r.category_name || 'Knowledge Hub', title: r.title }))
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug).catch(() => null)
  if (!post) notFound()

  // A hand-built article file (posts registered in components/blog/registry.js) wins over the database HTML.
  const entry = NEW_TEMPLATE_POSTS[params.slug]
  if (entry) return <NewTemplatePost model={modelFromEntry(post, entry)} />

  // Top image: CMS cover > bundled cover (only for slugs in BUNDLED_COVER_HERO) > first uploaded content image.
  const [images, related] = await Promise.all([
    post.id ? getContentImages('post', post.id).catch(() => []) : Promise.resolve([]),
    getRelatedPosts(post).catch(() => []),
  ])
  const bundledCover = BUNDLED_COVER_HERO.has(params.slug) ? `/blog-covers/${params.slug}.webp` : null
  return <NewTemplatePost model={modelFromPost(post, { images, related, bundledCover })} />
}
