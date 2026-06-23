import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getSettings } from '@/lib/supabase'
import { orgSchema, websiteSchema, serializeSchema } from '@/lib/schema'

export const revalidate = 60

export async function generateMetadata() {
  try {
    const s = await getSettings()
    return {
      title: {
        default: 'AI for Manufacturing Companies in India | StratAI™ — AI Advantage Systems',
        template: '%s | StratAI™',
      },
      description: 'StratAI builds AI Advantage Systems for mid-market manufacturing companies in India. Quality, Throughput, Delivery, Revenue & Procurement Advantage — measurable in your P&L within 6 months.',
      metadataBase: new URL('https://stratai.io'),
      // Per-page canonicals set individually
      keywords: [
        'AI Advantage Systems', 'manufacturing AI', 'AI for manufacturing India',
        'AI transformation consulting', 'Quality Advantage System', 'Throughput Advantage System',
        'Delivery Advantage System', 'Revenue Advantage System', 'Procurement Advantage System',
        'mid-market manufacturing AI', 'AI P&L impact', 'domain-first AI',
        'AI implementation manufacturing', 'StratAI', 'AI consulting India',
      ],
      authors: [{ name: 'StratAI', url: 'https://stratai.io' }],
      creator: 'StratAI',
      publisher: 'Stratworks Consulting LLP',
      robots: {
        index: true, follow: true,
        googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
      },
      openGraph: {
        siteName: 'StratAI™',
        type: 'website',
        locale: 'en_IN',
        title: 'AI for Manufacturing Companies in India | StratAI™',
        description: 'StratAI builds AI Advantage Systems for mid-market manufacturing companies in India. Measurable in your P&L within 6 months.',
        url: 'https://stratai.io',
        images: [{ url: '/stratai-logo.png', width: 500, height: 500, alt: 'StratAI™ Logo' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'StratAI™ — AI Advantage Systems for Manufacturing',
        description: 'AI Advantage Systems for mid-market manufacturing. QAS · TAS · DAS · RAS · PAS. Measurable P&L impact in 6 months.',
        images: ['/stratai-logo.png'],
      },
      icons: {
        icon: [
          { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
          { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
          { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
          { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
          { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
        ],
      },
      manifest: '/site.webmanifest',
    }
  } catch {
    return {
      title: {
        default: 'AI for Manufacturing Companies in India | StratAI™ — AI Advantage Systems',
        template: '%s | StratAI™',
      },
      description: 'StratAI builds AI Advantage Systems for mid-market manufacturing companies. Measurable in your P&L within 6 months.',
      metadataBase: new URL('https://stratai.io'),
      icons: {
        icon: '/favicon-32x32.png',
        apple: '/apple-touch-icon.png',
      },
    }
  }
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Site Verification — SEO specialist access */}
        <meta name="google-site-verification" content="Lv3VWqNZPLUq84vfMXMg5B65fpKto5hhwnbPWQwkFyY" />

        {/* Google Analytics GA4 — G-BN8SYT2968 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BN8SYT2968" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BN8SYT2968', {
                page_path: window.location.pathname,
              });
            `
          }}
        />

        {/* Organization schema — sitewide */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeSchema(orgSchema()) }}
        />
        {/* Website schema — sitewide */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeSchema(websiteSchema()) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        {/* WhatsApp Float Button */}
        <a
          href="https://wa.me/919600971045?text=Hi%20StratAI%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20know%20more%20about%20AI%20Advantage%20Systems%20for%20my%20business."
          target="_blank"
          rel="noopener noreferrer"
          className="wa-float"
          aria-label="Chat with StratAI on WhatsApp"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width:'28px',height:'28px',fill:'#fff'}}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </body>
    </html>
  )
}
