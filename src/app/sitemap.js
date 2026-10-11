import { supabase } from '@/lib/supabase'

const BASE = 'https://stratai.io'

async function published(table, columns = 'slug,updated_at') {
  const { data } = await supabase.from(table).select(columns).eq('status', 'published')
  return data ?? []
}

const entry = (path, row, changeFrequency, priority) => ({
  url: `${BASE}${path}`,
  ...(row?.updated_at ? { lastModified: new Date(row.updated_at) } : {}),
  changeFrequency,
  priority,
})

export default async function sitemap() {
  const [posts, caseStudies, services, claudeSolutions, resources] = await Promise.all([
    published('posts'),
    published('case_studies'),
    published('services'),
    published('claude_solutions'),
    published('resources', 'slug,updated_at,content'),
  ])

  const staticPages = [
    ['', 'weekly', 1.0],
    ['/advantage-systems', 'monthly', 0.95],
    ['/services', 'monthly', 0.9],
    ['/engagement-model', 'monthly', 0.9],
    ['/claude-partner', 'monthly', 0.9],
    ['/claude-implementation', 'monthly', 0.85],
    ['/claude-training', 'monthly', 0.85],
    ['/claude-solutions', 'monthly', 0.8],
    ['/case-studies', 'weekly', 0.85],
    ['/blog', 'weekly', 0.85],
    ['/knowledge-hub', 'weekly', 0.8],
    ['/testimonials', 'monthly', 0.75],
    ['/about', 'monthly', 0.8],
    ['/contact', 'yearly', 0.7],
  ].map(([path, freq, priority]) => entry(path, null, freq, priority))

  return [
    ...staticPages,
    ...posts.map(r => entry(`/blog/${r.slug}`, r, 'monthly', 0.75)),
    ...caseStudies.map(r => entry(`/case-studies/${r.slug}`, r, 'monthly', 0.8)),
    ...services.map(r => entry(`/services/${r.slug}`, r, 'monthly', 0.8)),
    ...claudeSolutions.map(r => entry(`/claude-solutions/${r.slug}`, r, 'monthly', 0.7)),
    // Resource pages are placeholders until they have body content; listing empty pages would invite thin-content signals.
    ...resources.filter(r => r.content).map(r => entry(`/knowledge-hub/${r.slug}`, r, 'monthly', 0.6)),
  ]
}
