// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD Schema Markup Generator
// Generates structured data for Google, Bing, and AI engines
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://stratai.io'
const ORG_NAME = 'StratAI'

// ── Organization (sitewide) ───────────────────────────────────────────────────
export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: ORG_NAME,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
      width: 200,
      height: 60,
    },
    description: 'Building AI Advantage Systems for mid-market manufacturing companies. Quality, Throughput, Delivery, Revenue, and Procurement Advantage — measurable in your P&L within 6 months.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.linkedin.com/company/stratai',
    ],
  }
}

// ── Website ───────────────────────────────────────────────────────────────────
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: ORG_NAME,
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/knowledge-hub?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────
export function breadcrumbSchema(items) {
  // items = [{name, url}]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  }
}

// ── Blog Post (Article) ───────────────────────────────────────────────────────
export function blogPostSchema(post) {
  // Build full Person schema when author fields are available (from v_published_posts view)
  const authorSchema = post.author_name
    ? {
        '@type': 'Person',
        name: post.author_name,
        ...(post.author_linkedin_url ? { url: post.author_linkedin_url } : { url: `${BASE_URL}/about` }),
        ...(post.author_role ? { jobTitle: post.author_role } : {}),
        worksFor: { '@type': 'Organization', name: ORG_NAME, url: BASE_URL },
        ...(post.author_credentials ? {
          // Parse "MBA, IIM Bangalore · BE (Mechanical), PSG Tech" into alumniOf array
          alumniOf: post.author_credentials.split('·').map(c => ({
            '@type': 'EducationalOrganization',
            name: c.replace(/^.*?,\s*/, '').trim(), // extract institution name after the degree
          })).filter(a => a.name),
        } : {}),
      }
    : { '@id': `${BASE_URL}/#organization` }

  // Build keywords array from focus_keyword + entity_mentions
  const keywordsArr = [
    post.focus_keyword,
    ...(post.entity_mentions || []),
  ].filter(Boolean)

  // Word count from HTML
  const wordCount = post.content?.html
    ? post.content.html.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${BASE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.meta_description || post.excerpt || '',
    url: post.canonical_url || `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at,
    author: authorSchema,
    publisher: { '@id': `${BASE_URL}/#organization` },
    ...(post.og_image_url || post.featured_image_public_url ? {
      image: {
        '@type': 'ImageObject',
        url: post.og_image_url || post.featured_image_public_url,
        width: 1200,
        height: 630,
      },
    } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': post.canonical_url || `${BASE_URL}/blog/${post.slug}` },
    keywords: keywordsArr,
    ...(post.category_name ? { articleSection: post.category_name } : {}),
    ...(wordCount ? { wordCount } : {}),
    timeRequired: post.read_time_minutes ? `PT${post.read_time_minutes}M` : undefined,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${BASE_URL}/#website` },
  }
}

// ── Case Study (Article) ──────────────────────────────────────────────────────
export function caseStudySchema(cs) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${BASE_URL}/case-studies/${cs.slug}#article`,
    headline: cs.title,
    description: cs.meta_description || cs.challenge?.slice(0, 200) || '',
    url: `${BASE_URL}/case-studies/${cs.slug}`,
    datePublished: cs.published_at || cs.created_at,
    dateModified: cs.updated_at || cs.published_at,
    publisher: { '@id': `${BASE_URL}/#organization` },
    author: { '@id': `${BASE_URL}/#organization` },
    about: cs.client ? { '@type': 'Organization', name: cs.client } : undefined,
    keywords: cs.tags?.join(', ') || '',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/case-studies/${cs.slug}` },
    inLanguage: 'en-IN',
  }
  if (cs.og_image_url) {
    schema.image = { '@type': 'ImageObject', url: cs.og_image_url, width: 1200, height: 630 }
  }
  return schema
}

// ── Service ───────────────────────────────────────────────────────────────────
export function serviceSchema(svc) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/services/${svc.slug}#service`,
    name: svc.title,
    description: svc.short_description || svc.meta_description || '',
    url: `${BASE_URL}/services/${svc.slug}`,
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'India' },
    serviceType: 'AI Consulting',
    image: svc.og_image_url
      ? { '@type': 'ImageObject', url: svc.og_image_url, width: 1200, height: 630 }
      : undefined,
  }
}

// ── FAQ Page ──────────────────────────────────────────────────────────────────
export function faqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ── Knowledge Hub (DigitalDocument / VideoObject / PodcastEpisode) ────────────
export function hubItemSchema(item) {
  const base = {
    '@context': 'https://schema.org',
    url: `${BASE_URL}/knowledge-hub/${item.slug}`,
    name: item.title,
    description: item.excerpt || item.meta_description || '',
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: 'en-IN',
    datePublished: item.published_at || item.created_at,
    dateModified: item.updated_at || item.published_at,
  }
  const typeMap = {
    blog:       'BlogPosting',
    ebook:      'Book',
    whitepaper: 'ScholarlyArticle',
    checklist:  'HowTo',
    template:   'DigitalDocument',
    video:      'VideoObject',
    podcast:    'PodcastEpisode',
    webinar:    'Event',
  }
  base['@type'] = typeMap[item.type] || 'Article'
  if (item.type === 'video' && item.video_url) base.embedUrl = item.video_url
  if (item.type === 'podcast' && item.podcast_url) base.associatedMedia = { '@type': 'AudioObject', contentUrl: item.podcast_url }
  if (item.cover_image) base.image = { '@type': 'ImageObject', url: item.cover_image }
  return base
}

// ── Helper: serialize schema to script tag content ────────────────────────────
export function serializeSchema(schema) {
  return JSON.stringify(schema, null, 0)
}
