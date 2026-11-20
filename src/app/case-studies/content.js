// Editorial copy for the /case-studies page. Case study cards come from Supabase (case_studies table);
// everything here is the page copy around them. Edit this file to change wording, links or filters.

export const GOALS = [
  { key: 'quality',  label: 'Quality & scrap' },
  { key: 'uptime',   label: 'Uptime & OEE' },
  { key: 'planning', label: 'Planning & delivery' },
  { key: 'sales',    label: 'Sales & revenue' },
  { key: 'claude',   label: 'Claude rollout' },
]

// Which goal filters each case study appears under (by slug).
export const GOALS_BY_SLUG = {
  'symphony-furnishings-ai-transformation-case-study': ['sales'],
  'tirupur-buying-house-ai-shop-floor-pl-impact': ['quality'],
  'jewellery-manufacturer-ai-catalogue-order-intelligence': ['planning', 'sales'],
  'domain-first-principle-ai-transformation': ['planning'],
  'ai-ecommerce-customer-intelligence-automation': ['sales'],
}

// Card eyebrow (second half) for each case study; falls back to the first tag.
export const CARD_EYEBROW = {
  'tirupur-buying-house-ai-shop-floor-pl-impact': 'Voice AI & QC automation',
  'jewellery-manufacturer-ai-catalogue-order-intelligence': 'AI catalogue & order intelligence',
  'domain-first-principle-ai-transformation': 'Domain-first AI transformation',
  'ai-ecommerce-customer-intelligence-automation': 'Customer intelligence',
}

// Which KPI (index into the case study's kpis) to show on its card. Default is the first.
export const CARD_KPI_INDEX = {
  'ai-ecommerce-customer-intelligence-automation': 2,
}

// Long-form case studies that live as blog posts (category "Case Studies") instead of a case_studies row.
// /case-studies/[slug] renders them in the case study design. Text below is taken from the post itself.
export const POST_CASES = {
  'symphony-furnishings-ai-transformation-case-study': {
    client: 'Symphony Furnishings (Coimbatore)',
    industry: 'Furniture Manufacturing',
    tags: ['Furniture manufacturing', 'Coimbatore', 'Zoho Creator', 'AI fabric database', 'Architect portal', 'Claude', 'n8n', 'Pinterest content engine'],
    kpis: [
      { label: 'QUOTE TIME', value: '-50%', description: 'Quote generation cut from 30 min to 1.5 h down to 15 to 45 min' },
      { label: 'STITCHING SHEET', value: '2 sec', description: 'Generated automatically, down from 1 to 1.5 hours per order' },
      { label: 'FABRICS PER MONTH', value: '5,000', description: 'Up from 200 a month: 1,500 with n8n, then 5,000 with Claude' },
      { label: 'ENGAGEMENT', value: '5 phases', description: 'Over 2 years, from a quoting system to a closed-loop quote system' },
    ],
    challenge: 'Only two people, the founder and one senior employee, could price a quote, so every quote from every store waited on them. A single-room quote took 30 minutes and a multi-room quote up to 1.5 hours, and twelve salespeople across two stores could not quote on their own.',
    solution: 'A quoting system in Zoho Creator (no AI at first) that encoded the founder\'s pricing logic, then a 5,000-fabric AI database, an architect portal with natural language search, and a Pinterest and blog content engine.',
    timeline: [
      ['Duration', '2 years so far, in 5 phases'],
      ['Live today', 'Quoting system, fabric database and pipeline dashboard'],
      ['In testing', 'Architect portal, internal testing with a soft launch imminent'],
      ['Still to build', 'Closed-loop quote system, about six months from completion at the time of writing'],
    ],
  },
}

// Featured case study (the Symphony post). Its full page is rendered by /case-studies/[slug].
export const FEATURED = {
  slug: 'symphony-furnishings-ai-transformation-case-study',
  href: '/case-studies/symphony-furnishings-ai-transformation-case-study',
  eyebrow: 'Featured · Furniture manufacturing · Coimbatore',
  industry: 'Furniture Manufacturing',
  title: 'How Symphony Furnishings cut quote time by 50% with AI',
  challenge: 'Only two people in the company could price a quote, so every quote waited on them.',
  built: 'A quoting system, then a 5,000-fabric AI database and an architect portal.',
  chips: ['AI fabric database', '2-year engagement, 5 phases'],
  metrics: [
    { value: '50%', label: 'Faster quotes' },
    { value: '2 sec', label: 'Stitching sheet, down from 1 to 1.5 hours' },
    { value: '5,000', label: 'Fabrics in the AI database' },
  ],
}

// Hero tiles that are not derived from the data.
export const FIXED_STATS = [
  { value: '≤ 6 mo', label: 'To measured results' },
]
export const FIRST_RESULTS = { value: 'Month 4', label: 'First results reported' }

export const HERO_COPY =
  'See how Indian manufacturers and brands used AI with StratAI to cut manual work, speed up planning and grow revenue. Every case study shows the problem, what we built, how long it took and the measured result.'

export const WHAT_EVERY_ONE_SHOWS = [
  { title: 'The challenge', text: "In the client's own business terms" },
  { title: 'What we built', text: 'The system and how it connects' },
  { title: 'The timeline', text: 'From kickoff to go-live' },
  { title: 'The result', text: 'Measured against a baseline' },
]

export const SOLUTIONS = [
  { name: 'AI Defect Detection', outcome: '↓ Rejection rate', href: '/advantage-systems#qas', image: '/solution-covers/defect.webp' },
  { name: 'AI Predictive Maintenance', outcome: '↓ Unplanned downtime', href: '/advantage-systems#tas', image: '/solution-covers/maintenance.webp' },
  { name: 'AI Production Planning', outcome: '↑ On-time delivery', href: '/advantage-systems#das', image: '/solution-covers/planning.webp' },
  { name: 'AI for B2B Sales', outcome: '↑ Qualified leads', href: '/advantage-systems#ras', image: '/solution-covers/sales.webp' },
  { name: 'AI Procurement', outcome: '↓ Purchase cost', href: '/advantage-systems#pas', image: '/solution-covers/procurement.webp' },
]

export const FAQS = [
  {
    q: 'What results can manufacturers expect from AI?',
    a: 'It depends on the lever. Typical targets are a lower rejection rate, less unplanned downtime, better on-time delivery, more qualified leads or lower purchase cost. StratAI agrees a baseline before building and measures the result against it within 6 months.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'In the case studies above, first measured results were reported around Month 4, after a discovery phase. A full AI Advantage System is measured within 6 months of deployment.',
    link: { href: '/engagement-model', text: 'See timelines by engagement model' },
  },
  {
    q: 'Can we speak to a past client?',
    a: 'References are available on request after a scoping call.',
  },
  {
    q: 'Which industries have you worked with?',
    a: 'Furniture manufacturing, garment manufacturing, jewellery manufacturing, consumer medical devices and e-commerce.',
  },
  {
    q: 'How do you measure AI success?',
    a: 'In rupees and operating metrics such as scrap rate, OEE and on-time delivery, not model accuracy.',
    link: { href: '/blog/how-to-measure-ai-success-manufacturing', text: 'Read how we measure AI success' },
  },
]

export const RESULT_OPTIONS = [
  'Less scrap and rework',
  'Less unplanned downtime',
  'Better on-time delivery',
  'More qualified leads',
  'Lower purchase cost',
  'Not sure yet',
]

export const WHATSAPP_HREF =
  'https://wa.me/919600971045?text=Hi%20StratAI%2C%20I%20saw%20your%20case%20studies%20and%20want%20results%20like%20these%20in%20my%20plant.'
