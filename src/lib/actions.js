'use server'

import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cinlfqmiiabwmeunowol.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_cgStjgEhCnFlQi58_VYFvA_6gRE-tYo'
)

export async function submitLead(formData) {
  const name             = formData.get('name')?.toString().trim()
  const email            = formData.get('email')?.toString().trim().toLowerCase()
  const phone            = formData.get('phone')?.toString().trim() || null
  const company          = formData.get('company')?.toString().trim() || null
  const service          = formData.get('service_interest')?.toString().trim() || null
  const message          = formData.get('message')?.toString().trim() || null
  const source           = formData.get('source')?.toString() || 'website'
  // CLA-143: lead source tracking
  const lead_source_page = formData.get('lead_source_page')?.toString() || source
  const lead_source_url  = formData.get('lead_source_url')?.toString() || null

  if (!name || !email) return { success: false, error: 'Name and email are required.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: 'Please enter a valid email address.' }

  const { error } = await sb.from('leads').insert({
    name, email, phone, company,
    service_interest: service,
    message, source,
    lead_source_page,
    lead_source_url,
  })
  if (error) {
    console.error('Lead submission error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
  return { success: true }
}
