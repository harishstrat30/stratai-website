import { prepareArticleHtml } from './prepareHtml'

// Turns a database post (and, for hand-built posts, an article file) into the one shape NewTemplatePost renders.

const LOCAL_AVATARS = { palani: '/palani.jpeg', arvin: '/arvin.jpeg', dyanesh: '/dyanesh.jpeg' }
function avatarFor(name = '', url) {
  if (url) return url
  const first = name.split(' ')[0].toLowerCase()
  const key = Object.keys(LOCAL_AVATARS).find(k => first.startsWith(k))
  return key ? LOCAL_AVATARS[key] : null
}
const fmtDate = d => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '')
const dayGap = (a, b) => Math.abs(new Date(a) - new Date(b)) / 86400000

// Closing call to action for posts whose own text has none (this replaces the old page's "WORK WITH US" bar).
export const CLOSING_CTA = {
  t: 'cta',
  h: 'Want results like these in your plant?',
  p: 'In a free half-day audit, we show you where your plant is losing the most money and which AI use cases pay back fastest. No fee, no commitment.',
  primary: { label: 'Book your free half-day plant audit', href: '/contact' },
  secondary: { label: 'Chat on WhatsApp', href: 'https://wa.me/919600971045', external: true },
}

const SIDEBAR_CTA = { h: 'Where is your plant losing money?', p: 'Free half-day plant audit. No fee, no commitment.', button: 'Book the audit', href: '/contact' }

// Hand-built article (see posts/aiDefectDetection.js): content comes from the file, the rest from the database row.
export function modelFromEntry(post, entry) {
  const { POST: P, BLOCKS, FAQS, FAQ_HEADING } = entry
  return {
    post, slug: post.slug,
    title: P.title, intro: P.intro,
    category: post.category_name || 'Knowledge Hub', categorySlug: post.category_slug,
    hero: P.heroImage,
    author: { name: P.author.name, role: P.author.role, credentials: P.author.credentials, linkedin: P.author.linkedin, avatar: P.author.avatar, bio: P.author.bio },
    about: P.about || null,
    metaLine: `${P.author.credentials} · Updated ${P.updated} · ${P.readMinutes} min read`,
    takeaways: P.takeaways,
    blocks: BLOCKS,
    toc: [...BLOCKS.filter(b => b.t === 'h2' && b.toc).map(b => ({ id: b.id, label: b.toc })), { id: 'faqs', label: 'FAQs' }],
    faqs: FAQS, faqHeading: FAQ_HEADING, showFaqSection: true,
    gallery: [],
    related: P.related,
    sidebarCta: P.sidebarCta,
    schemaPost: { ...post, title: P.title, excerpt: P.intro, meta_description: P.metaDescription, updated_at: P.updatedIso || '2026-11-23T00:00:00+05:30' },
    schemaFaqs: FAQS,
  }
}

// Any other post: the CMS HTML is rendered inside the template.
export function modelFromPost(post, { images = [], related = [], bundledCover = null } = {}) {
  const cover = post.featured_image_public_url || bundledCover
  const firstImage = cover ? null : images[0]
  const hero = cover ? { src: cover, alt: post.title } : firstImage ? { src: firstImage.public_url, alt: firstImage.alt_text || post.title } : null
  // With the bundled cover on top, the first uploaded image (the former top image) is replaced by it, so it is not repeated
  // in the gallery; with a CMS cover the first uploaded image is ordinary content and stays.
  const gallery = post.featured_image_public_url ? images : images.slice(1)

  const prepared = prepareArticleHtml(post.content?.html || '', { intro: post.excerpt || '' })
  const faqs = (Array.isArray(post.faqs) ? post.faqs : []).filter(f => f && f.question && f.answer)
  const showFaqSection = faqs.length > 0 && !prepared.hasFaq

  const published = fmtDate(post.published_at)
  const updated = post.updated_at && post.published_at && dayGap(post.updated_at, post.published_at) > 1 ? fmtDate(post.updated_at) : ''
  const takeaways = Array.isArray(post.key_takeaways) ? post.key_takeaways.filter(Boolean) : []
  const sameAsIntro = post.summary && post.excerpt && post.summary.slice(0, 60) === post.excerpt.slice(0, 60)

  return {
    post, slug: post.slug,
    title: post.title, intro: post.excerpt || '',
    category: post.category_name || 'Knowledge Hub', categorySlug: post.category_slug,
    hero,
    author: post.author_name ? {
      name: post.author_name, role: post.author_role, credentials: post.author_credentials,
      linkedin: post.author_linkedin_url, avatar: avatarFor(post.author_name, post.author_avatar_url), bio: post.author_bio,
    } : null,
    metaLine: [post.author_credentials, published && `Published ${published}`, updated && `Updated ${updated}`, post.read_time_minutes && `${post.read_time_minutes} min read`].filter(Boolean).join(' · '),
    overview: post.summary && !sameAsIntro ? post.summary : '',
    takeaways,
    html: prepared.html,
    toc: [...prepared.toc, ...(showFaqSection ? [{ id: 'faqs', label: 'FAQs' }] : [])],
    faqs, faqHeading: 'Frequently asked questions', showFaqSection,
    closingCta: !prepared.hasCta,
    gallery,
    related,
    sidebarCta: SIDEBAR_CTA,
    schemaPost: post,
    schemaFaqs: faqs,
  }
}
