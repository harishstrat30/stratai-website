import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const sb = createClient(
  'https://cinlfqmiiabwmeunowol.supabase.co',
  'sb_publishable_cgStjgEhCnFlQi58_VYFvA_6gRE-tYo'
)

export default async function robots() {
  // Default config
  const config = {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] },
    ],
    sitemap: 'https://stratai.io/sitemap.xml',
  }

  try {
    const { data } = await sb
      .from('site_config')
      .select('value')
      .eq('section', 'technical_seo')
      .eq('key', 'robots_txt')
      .single()

    if (data?.value) {
      // Parse the stored text into Next.js robots format
      const text = typeof data.value === 'string'
        ? data.value.replace(/^"|"$/g, '').replace(/\\n/g, '\n')
        : ''

      const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
      const rules = []
      let current = null

      for (const line of lines) {
        if (line.startsWith('User-agent:')) {
          if (current) rules.push(current)
          current = { userAgent: line.replace('User-agent:', '').trim(), allow: [], disallow: [] }
        } else if (line.startsWith('Allow:') && current) {
          current.allow.push(line.replace('Allow:', '').trim())
        } else if (line.startsWith('Disallow:') && current) {
          current.disallow.push(line.replace('Disallow:', '').trim())
        }
      }
      if (current) rules.push(current)

      if (rules.length > 0) config.rules = rules
    }
  } catch {}

  return config
}
