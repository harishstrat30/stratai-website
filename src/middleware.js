import { NextResponse } from 'next/server'

// Redirects are cached for 60 seconds to avoid DB calls on every request
let redirectCache = null
let cacheTime = 0
const CACHE_TTL = 60_000

async function getRedirects() {
  const now = Date.now()
  if (redirectCache && now - cacheTime < CACHE_TTL) return redirectCache

  try {
    const res = await fetch(
      'https://cinlfqmiiabwmeunowol.supabase.co/rest/v1/redirects?is_active=eq.true&select=from_path,to_path,status_code',
      {
        headers: {
          apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpbmxmcW1paWFid21ldW5vd29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0OTcwNzYsImV4cCI6MjA5MDA3MzA3Nn0.MP4Tn7lgqCEoOic7TabvAak9VYKdS_WtWu7M1G2AgSg',
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      }
    )
    if (res.ok) {
      redirectCache = await res.json()
      cacheTime = now
    }
  } catch {}

  return redirectCache || []
}

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const redirects = await getRedirects()
  const match = redirects.find(r => r.from_path === pathname)

  if (match) {
    const url = request.nextUrl.clone()
    url.pathname = match.to_path.startsWith('http') ? match.to_path : match.to_path
    if (match.to_path.startsWith('http')) {
      return NextResponse.redirect(match.to_path, { status: match.status_code })
    }
    url.pathname = match.to_path
    return NextResponse.redirect(url, { status: match.status_code })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
