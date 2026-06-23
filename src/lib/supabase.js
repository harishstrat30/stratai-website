import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL  || 'https://cinlfqmiiabwmeunowol.supabase.co'
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_cgStjgEhCnFlQi58_VYFvA_6gRE-tYo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)

// ─── PAGES ──────────────────────────────────────
export async function getPages() {
  const { data, error } = await supabase.from('v_published_pages').select('*')
  if (error) throw error
  return data ?? []
}
export async function getPage(slug) {
  const { data, error } = await supabase.from('v_published_pages').select('*').eq('slug', slug).single()
  if (error) throw error
  return data
}

// ─── POSTS ──────────────────────────────────────
export async function getPosts({ page = 1, limit = 10, category } = {}) {
  let q = supabase.from('v_published_posts').select('*', { count: 'exact' })
  if (category) q = q.eq('category_slug', category)
  const from = (page - 1) * limit
  const { data, error, count } = await q.range(from, from + limit - 1)
  if (error) throw error
  return { posts: data ?? [], total: count ?? 0, page, limit }
}
export async function getPost(slug) {
  const { data, error } = await supabase.from('v_published_posts').select('*').eq('slug', slug).single()
  if (error) throw error
  return data
}
export async function getAllPostSlugs() {
  const { data } = await supabase.from('posts').select('slug').eq('status', 'published')
  return (data ?? []).map(p => ({ slug: p.slug }))
}

// ─── SERVICES ───────────────────────────────────
export async function getFeaturedServices() {
  const { data, error } = await supabase.from('v_featured_services').select('*')
  if (error) throw error
  return data ?? []
}
export async function getServices() {
  const { data, error } = await supabase.from('services').select('*').eq('status', 'published').order('sort_order')
  if (error) throw error
  return data ?? []
}

// ─── CASE STUDIES ───────────────────────────────
export async function getCaseStudies() {
  const { data, error } = await supabase.from('v_published_case_studies').select('*')
  if (error) throw error
  return data ?? []
}
export async function getCaseStudy(slug) {
  const { data, error } = await supabase.from('case_studies').select('*').eq('slug', slug).eq('status', 'published').single()
  if (error) throw error
  return data
}

// ─── TEAM / TESTIMONIALS ────────────────────────
export async function getTeam() {
  const { data, error } = await supabase.from('team_members').select('*').eq('is_active', true).order('sort_order')
  if (error) throw error
  return data ?? []
}
export async function getFeaturedTestimonials() {
  const { data, error } = await supabase.from('v_featured_testimonials').select('*')
  if (error) throw error
  return data ?? []
}

// ─── NAV ────────────────────────────────────────
export async function getNav(location = 'header') {
  const { data: menu } = await supabase.from('nav_menus').select('id').eq('location', location).single()
  if (!menu) return []
  const { data, error } = await supabase.from('nav_items').select('*').eq('menu_id', menu.id).order('sort_order')
  if (error) return []
  const map = {}
  data.forEach(item => { map[item.id] = { ...item, children: [] } })
  const tree = []
  data.forEach(item => {
    if (item.parent_id && map[item.parent_id]) map[item.parent_id].children.push(map[item.id])
    else tree.push(map[item.id])
  })
  return tree
}

// ─── SETTINGS ───────────────────────────────────
export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('key, value')
  if (error) throw error
  const obj = {}
  ;(data ?? []).forEach(s => {
    obj[s.key] = typeof s.value === 'string' ? s.value.replace(/^"|"$/g, '') : s.value
  })
  return obj
}

// ─── CATEGORIES ─────────────────────────────────
export async function getCategories() {
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) throw error
  return data ?? []
}

// ─── SEARCH ─────────────────────────────────────
export async function search(query, { limit = 10 } = {}) {
  const [pr, pg] = await Promise.all([
    supabase.from('posts').select('id,title,slug,excerpt,published_at').eq('status', 'published').textSearch('title', query, { type: 'websearch' }).limit(limit),
    supabase.from('pages').select('id,title,slug,excerpt').eq('status', 'published').textSearch('title', query, { type: 'websearch' }).limit(limit),
  ])
  return { posts: pr.data ?? [], pages: pg.data ?? [] }
}

// ─── CLIENTS (marquee ribbon) ────────────────────
export async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  if (error) throw error
  return data ?? []
}

// ─── CONTENT IMAGES ─────────────────────────────
export async function getContentImages(contentType, contentId, section = null) {
  let q = supabase
    .from('v_content_images')
    .select('*')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
  if (section) q = q.eq('section', section)
  const { data, error } = await q
  if (error) throw error
  return data ?? []
}

// ─── SITE CONFIG ─────────────────────────────────────
export async function getSiteConfig(section = null) {
  let q = supabase.from('v_site_config').select('*')
  if (section) q = q.eq('section', section)
  const { data, error } = await q
  if (error) throw error
  return data ?? []
}

export async function getStats() {
  const rows = await getSiteConfig('stats')
  return rows.map(r => r.value).filter(Boolean)
}

export async function getCTAButtons() {
  const rows = await getSiteConfig('cta_buttons')
  const map = {}
  rows.forEach(r => { map[r.key] = r.value })
  return map
}

// ─── KNOWLEDGE HUB RESOURCES ─────────────────────────
export async function getResources({ type = null, topic = null, limit = 20, page = 1 } = {}) {
  let q = supabase
    .from('v_published_resources')
    .select('*', { count: 'exact' })
  if (type && type !== 'all') q = q.eq('resource_type', type)
  if (topic && topic !== 'All Topics') q = q.eq('topic', topic)
  const from = (page - 1) * limit
  const { data, error, count } = await q.range(from, from + limit - 1)
  if (error) throw error
  return { resources: data ?? [], total: count ?? 0, limit }
}

export async function getFeaturedResources(limit = 3) {
  const { data, error } = await supabase
    .from('v_published_resources')
    .select('*')
    .eq('is_featured', true)
    .limit(limit)
  if (error) throw error
  return data ?? []
}

// ─── KNOWLEDGE HUB ───────────────────────────────────
export async function getKnowledgeHub(type = null, limit = 12) {
  const sb = createClient(
    'https://cinlfqmiiabwmeunowol.supabase.co',
    'sb_publishable_cgStjgEhCnFlQi58_VYFvA_6gRE-tYo'
  )
  let q = sb.from('v_knowledge_hub').select('*')
  if (type) q = q.eq('type', type)
  const { data } = await q.limit(limit)
  return data ?? []
}

// ─── CLAUDE ZONE ─────────────────────────────────────
export async function getClaudeSolutions({ industry = null, limit = 50 } = {}) {
  let q = supabase
    .from('claude_solutions')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  if (industry) q = q.eq('industry', industry)
  if (limit) q = q.limit(limit)
  const { data, error } = await q
  if (error) throw error
  return data ?? []
}

export async function getClaudeSolution(slug) {
  const { data, error } = await supabase
    .from('claude_solutions')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (error) throw error
  return data
}

export async function getAllClaudeSolutionSlugs() {
  const { data } = await supabase
    .from('claude_solutions')
    .select('slug')
    .eq('status', 'published')
  return (data ?? []).map(s => ({ slug: s.slug }))
}
