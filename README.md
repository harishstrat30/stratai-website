# StratAI Website — stratai.io

Next.js 14 website for StratAI — Anthropic Claude Partner Network Member.

## Stack
- **Framework:** Next.js 14 (App Router)
- **Hosting:** Vercel
- **Database / CMS:** Supabase (cinlfqmiiabwmeunowol)
- **Styling:** CSS variables in globals.css (no Tailwind)

## Structure
```
src/
  app/          → Pages (App Router)
  components/   → Reusable components
    layout/     → Header, Footer
    sections/   → Page sections (Hero, ContrastBlock, etc.)
    ui/         → Small components (ContactForm, StratAILogo, etc.)
  lib/          → Supabase client, schema, server actions
public/         → Static assets (favicons, logos)
```

## Local Development
```bash
npm install
cp .env.example .env.local
# Fill in .env.local with Supabase credentials
npm run dev
```

## Deployment
- **Production:** Automatic on push to `main` branch (once GitHub connected to Vercel)
- **Preview:** Automatic on every pull request → creates a sandbox URL

## SEO Notes
- All metadata set per-page via Next.js `export const metadata`
- FAQ schema on blog posts
- LocalBusiness schema in layout.js
- Sitemap at /sitemap.xml (auto-generated)
- Robots at /robots.txt

## Content (CMS)
All blog posts, case studies, and page content managed via:
`cms.stratai.io`

Do NOT edit blog content in code — use the CMS.

## For SEO Person
- Edit meta titles/descriptions via CMS (cms.stratai.io)
- Edit page-level SEO in each `app/[page]/page.js` under `export const metadata`
- globals.css contains all CSS variables and responsive breakpoints
- Do NOT touch lib/ files — those are database connections
