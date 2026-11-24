import Link from 'next/link'
import { blogPostSchema, breadcrumbSchema, faqSchema, serializeSchema } from '@/lib/schema'
import { TEMPLATE_CSS } from './templateStyles'
import ArticleBody from './ArticleBody'
import Toc from './Toc'
import { CLOSING_CTA } from './models'

// The blog post template used by every post (design from "Blog · AI Defect Detection (merged, new template).pdf").
// `model` is built in ./models.js, either from a hand-built article file or from the database post's HTML.
export default function NewTemplatePost({ model: m }) {
  const crumbCategory = m.category
  const schemas = [
    blogPostSchema(m.schemaPost),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Knowledge Hub', url: '/knowledge-hub' },
      { name: crumbCategory, url: `/blog?category=${m.categorySlug}` },
      { name: m.title, url: `/blog/${m.slug}` },
    ]),
    faqSchema(m.schemaFaqs),
  ].filter(Boolean)

  return (
    <div className="bt">
      <style dangerouslySetInnerHTML={{ __html: TEMPLATE_CSS }} />
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(s) }} />)}

      <header className={'bt-hero' + (m.hero ? '' : ' bt-hero-flat')}>
        <div className="bt-wrap">
          <nav className="bt-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> › <Link href="/knowledge-hub">Knowledge Hub</Link> › <Link href={`/blog?category=${m.categorySlug}`}>{crumbCategory}</Link>
          </nav>
          <Link href={`/blog?category=${m.categorySlug}`} className="bt-badge">{crumbCategory}</Link>
          <h1 className="bt-h1">{m.title}</h1>
          {m.intro && <p className="bt-intro">{m.intro}</p>}
          {m.author && (
            <div className="bt-by">
              {m.author.avatar ? <img src={m.author.avatar} alt={m.author.name} width="46" height="46" /> : <span className="bt-ph" aria-hidden="true" />}
              <div>
                <b>{m.author.name}</b>
                {m.author.role && <> · {m.author.role}</>}
                {m.author.linkedin && <> · <a href={m.author.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></>}
                {m.metaLine && <span>{m.metaLine}</span>}
              </div>
            </div>
          )}
          {m.hero && (
            <figure className="bt-heroimg">
              <img src={m.hero.src} alt={m.hero.alt} fetchPriority="high" decoding="async" />
            </figure>
          )}
        </div>
      </header>

      <div className="bt-wrap bt-layout">
        <aside className="bt-aside">
          <Toc items={m.toc} />
          <div className="bt-sidecta">
            <b>{m.sidebarCta.h}</b>
            <p>{m.sidebarCta.p}</p>
            <Link href={m.sidebarCta.href} className="bt-btn bt-btn-primary">{m.sidebarCta.button}</Link>
          </div>
        </aside>

        <article className="bt-main">
          {m.takeaways.length > 0 && (
            <section className="bt-take" aria-labelledby="bt-take-h">
              <h2 id="bt-take-h">Key takeaways</h2>
              <ol>{m.takeaways.map((t, i) => <li key={i}><i>{String(i + 1).padStart(2, '0')}</i><span>{t}</span></li>)}</ol>
            </section>
          )}

          <div className="bt-body">
            {m.overview && <div className="bt-answer bt-overview"><b>Overview</b>{m.overview}</div>}

            {m.blocks
              ? <ArticleBody blocks={m.blocks} />
              : m.html
                ? <div className="bt-html" dangerouslySetInnerHTML={{ __html: m.html }} />
                : <p className="bt-soon">Content coming soon.</p>}

            {m.gallery.length > 0 && (
              <section className="bt-gallery" aria-label="Images">
                {m.gallery.map(img => (
                  <figure key={img.id || img.public_url}>
                    <img src={img.public_url} alt={img.alt_text || ''} loading="lazy" decoding="async" />
                    {img.caption && <figcaption>{img.caption}</figcaption>}
                  </figure>
                ))}
              </section>
            )}

            {m.showFaqSection && (
              <section className="bt-faq" aria-labelledby="faqs">
                <h2 id="faqs">{m.faqHeading}</h2>
                {m.faqs.map(f => <article key={f.question}><h3>{f.question}</h3><p>{f.answer}</p></article>)}
              </section>
            )}

            {m.closingCta && <div className="bt-closing"><ArticleBody blocks={[CLOSING_CTA]} /></div>}
          </div>

          {m.author && (
            <section className="bt-author" aria-label="About the author">
              {m.author.avatar ? <img src={m.author.avatar} alt={m.author.name} width="72" height="72" loading="lazy" /> : <span className="bt-ph" aria-hidden="true" />}
              <div>
                <small>Written by</small>
                <h3>{m.author.name}</h3>
                <p className="bt-cred">
                  {[m.author.role, m.author.credentials].filter(Boolean).join(' · ')}
                  {m.author.linkedin && <>{' · '}<a href={m.author.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></>}
                </p>
                {m.author.bio && <p className="bt-bio">{m.author.bio}</p>}
              </div>
            </section>
          )}

          {m.about && (
            <aside className="bt-about" aria-label="About StratAI">
              <small>About StratAI</small>
              <p>{m.about.text}</p>
              <p className="bt-about-links">
                {m.about.links.map((l, i) => (
                  <span key={l.href}>{i > 0 && ' · '}{l.href.startsWith('/') ? <Link href={l.href}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}</span>
                ))}
                {m.about.phone && <> · {m.about.phone}</>}
                {m.about.quote && <> · <em>{m.about.quote}</em></>}
              </p>
            </aside>
          )}
        </article>
      </div>

      {m.related.length > 0 && (
        <section className="bt-more" aria-labelledby="bt-more-h">
          <div className="bt-wrap">
            <div className="bt-more-head"><h2 id="bt-more-h">Keep reading</h2><Link href="/knowledge-hub">All guides →</Link></div>
            <div className="bt-more-grid">
              {m.related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="bt-more-card"><span>{r.tag}</span><b>{r.title}</b><i>Read →</i></Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
