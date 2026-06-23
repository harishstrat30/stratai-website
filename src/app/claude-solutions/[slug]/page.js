'use client'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ClaudeSolutionSlug() {
  const { slug } = useParams()
  const router = useRouter()

  useEffect(() => {
    // Redirect to parent page — the detail panel opens client-side
    router.replace('/claude-solutions')
  }, [])

  return null
}
