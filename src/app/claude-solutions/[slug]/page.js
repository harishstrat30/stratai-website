import { redirect } from 'next/navigation'
import { getAllClaudeSolutionSlugs } from '@/lib/supabase'

export async function generateStaticParams() {
  const slugs = await getAllClaudeSolutionSlugs().catch(() => [])
  return slugs || []
}

export default function ClaudeSolutionSlug() {
  redirect('/claude-solutions')
}
