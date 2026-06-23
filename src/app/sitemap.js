import { getAllPostSlugs, getAllClaudeSolutionSlugs } from '@/lib/supabase'

export default async function sitemap() {
  const base = 'https://stratai.io'

  const postSlugs = await getAllPostSlugs().catch(() => [])
  const czSlugs   = await getAllClaudeSolutionSlugs().catch(() => [])

  const staticPages = [
    { url: base,                              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/services`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/advantage-systems`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/engagement-model`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/case-studies`,            lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${base}/knowledge-hub`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/contact`,                 lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
  ]

  const blogPages = postSlugs.map(({ slug }) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...staticPages, ...blogPages]
}
