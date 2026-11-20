import { supabase } from '@/lib/supabase'

// The public view exposes the cover uploaded in the CMS (featured_image_public_url); the case_studies table does not.
// Rows without one fall back to the bundled /case-covers/{slug}.webp (see caseCover in shared.jsx).
export async function attachCovers(rows) {
  if (!rows?.length) return rows || []
  const { data } = await supabase.from('v_published_case_studies').select('id,featured_image_public_url')
  const map = new Map((data || []).map(r => [r.id, r.featured_image_public_url]))
  return rows.map(r => ({ ...r, featured_image_public_url: r.featured_image_public_url || map.get(r.id) || null }))
}
