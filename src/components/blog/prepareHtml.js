// Prepares a CMS post's HTML for the new blog template.
// The HTML comes from our own CMS (same source the old page rendered with dangerouslySetInnerHTML).
//  - drops <h1> (the template's hero already shows the title) and the in-body byline (the hero shows the author)
//  - wraps every table so it can scroll sideways on small screens and gets the template's table look
//  - gives every <h2> an id and returns the list for the "On this page" menu
//  - says whether the HTML already contains its own FAQ section (so the structured FAQs are not shown twice)

const stripTags = s => s.replace(/<[^>]+>/g, '')
const decode = s => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/&#8217;/g, '’').replace(/&#8211;/g, '–')
const slugify = s => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'section'

const norm = s => decode(stripTags(s)).replace(/\s+/g, ' ').trim().toLowerCase()

// Some posts carry hard-coded colours in inline styles. The old brand orange, the light-orange tint,
// the assorted greys and the undefined --text1 are mapped onto the site's own colours, so every post matches the theme.
// The purple / blue / green used to colour-code categories in a few posts are left alone on purpose.
const STYLE_MAP = [
  [/#e8571a/gi, 'var(--orange)'],
  [/#fd[f0]1?[ea]a\b/gi, 'var(--orange-light)'],
  [/#d9d9d6|#cccccc|#ccc\b|#ddd\b|rgb\(204,\s*204,\s*204\)/gi, 'var(--border)'],
  [/#1a1a1a/gi, 'var(--bg-dark)'],
  [/#c0392b/gi, 'var(--danger)'],
  [/var\(--text1\)/g, 'var(--text)'],
]
const harmonizeStyles = html => html.replace(/\sstyle="([^"]*)"/gi, (m, s) => ` style="${STYLE_MAP.reduce((acc, [re, to]) => acc.replace(re, to), s)}"`)

export function prepareArticleHtml(raw = '', { intro = '' } = {}) {
  let html = String(raw)

  html = html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi, '')
  html = html.replace(/<p\b[^>]*class="[^"]*\bbyline\b[^"]*"[^>]*>[\s\S]*?<\/p>/gi, '')

  // the hero already shows the intro, so an identical standfirst/lead paragraph at the top of the body is dropped
  const key = norm(intro).slice(0, 60)
  if (key.length >= 30) {
    html = html.replace(/<p\b[^>]*class="[^"]*\b(?:standfirst|lead)\b[^"]*"[^>]*>([\s\S]*?)<\/p>/i, (m, inner) => (norm(inner).startsWith(key) ? '' : m))
  }

  html = harmonizeStyles(html)
  html = html.replace(/<table\b[^>]*>/gi, '<div class="bt-tablewrap"><table class="bt-table">').replace(/<\/table>/gi, '</table></div>')

  const toc = []
  const used = new Set()
  html = html.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (m, attrs, inner) => {
    const label = decode(stripTags(inner)).replace(/\s+/g, ' ').trim()
    if (!label) return m
    let id = slugify(label), n = 2
    while (used.has(id)) id = `${slugify(label)}-${n++}`
    used.add(id)
    // the "Direct answer" heading sits inside the answer box, it is not a section of its own
    if (!/^direct answer\b/i.test(label)) toc.push({ id, label })
    const cleaned = attrs.replace(/\sid="[^"]*"/i, '')
    return `<h2${cleaned} id="${id}">${inner}</h2>`
  })

  const hasFaq = /class="[^"]*\bfaq-item\b/i.test(html) || toc.some(t => /^(frequently asked questions|faqs?\b)/i.test(t.label))
  const hasCta = /class="[^"]*\bcta-block\b/i.test(html)
  return { html, toc, hasFaq, hasCta }
}
