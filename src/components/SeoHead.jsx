// Server component — renders <meta> tags into the page <head> via Next.js generateMetadata
// This file is the canonical SEO utility used by all page generateMetadata functions

export function buildMetadata({
  title,
  description,
  slug,
  canonical,
  robots = 'index,follow',
  ogTitle,
  ogDescription,
  ogImage,
  siteName = 'StratAI',
  baseUrl = 'https://stratai.io',
}) {
  const resolvedTitle = title || siteName
  const resolvedDesc  = description || ''
  const resolvedUrl   = canonical || (slug ? `${baseUrl}/${slug}` : baseUrl)

  return {
    title: resolvedTitle,
    description: resolvedDesc,
    robots: robots || 'index,follow',
    alternates: {
      canonical: resolvedUrl,
    },
    openGraph: {
      title:       ogTitle       || resolvedTitle,
      description: ogDescription || resolvedDesc,
      url:         resolvedUrl,
      siteName,
      type:        'website',
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card:        'summary_large_image',
      title:       ogTitle       || resolvedTitle,
      description: ogDescription || resolvedDesc,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}
