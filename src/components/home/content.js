// Copy for the home page, taken from StratAI-Homepage-Design.pdf (2026-11-23).
// Anything the PDF left as a [placeholder] (founding year, headcounts, GSTIN, LLPIN, Google rating,
// opening hours, Harish's surname, extra team members) is NOT shown here until the real value is known.

export const PHONE_DISPLAY = '+91 96009 71045'
export const PHONE_TEL = 'tel:+919600971045'
export const EMAIL = 'harish@stratai.io'
export const WHATSAPP = 'https://wa.me/919600971045?text=Hi%20StratAI%2C%20I%20would%20like%20to%20book%20a%20free%20half-day%20AI%20audit.'
export const LINKEDIN = 'https://www.linkedin.com/company/strataiio'
export const ADDRESS_LINES = ['Code Base, SMM Apartments, NRI Gardens, Saravanampatti, Coimbatore', '641035']
export const MAP_SRC = 'https://www.google.com/maps?q=' + encodeURIComponent('Code Base, SMM Apartments, NRI Gardens, Saravanampatti, Coimbatore 641035') + '&output=embed'

export const HERO = {
  eyebrow: 'For manufacturers with ₹50–1,000 Cr revenue · Coimbatore-born',
  h1: 'AI for Manufacturing Companies in India — Built to Show Up in Your P&L',
  body: 'You already know where the money leaks. The lot your buyer rejected. The machine that stopped on a Saturday night. The order that left two days late. We help you plug those leaks with AI, on your own shop floor, and we measure it in rupees.',
  primary: 'Book a free half-day AI audit',
  secondary: 'See what we’ve built',
  micro: 'No fee · No commitment · Leave with 3–5 AI use cases ranked by rupee impact',
  quote: '“If AI isn’t in your P&L, it isn’t real.”',
  quoteBy: 'Palaniappan SN, Co-Founder · MBA, IIM Bangalore · BE Mechanical, PSG Tech',
}

export const FORM = {
  title: 'Tell us where it hurts',
  sub: 'A co-founder will call you within one working day.',
  options: [
    'Rejections and rework',
    'Machine breakdowns and downtime',
    'Late orders and deliveries',
    'Purchase cost and vendor prices',
    'Slow quotes and lost enquiries',
    'Not sure yet',
  ],
  button: 'Book my free audit',
  trust: ['NDA before we see any data', 'Your data stays on your servers', 'No sales deck, no pressure'],
}

// Client logo wall: logo files are in /public/client-logos (cut from the sheet of nine logos the user sent on 2026-11-23).
// Padma Raj Jewellers is in the PDF but has no logo file yet, so it shows as a name tile.
export const CLIENTS = [
  { name: 'Precot', logo: '/client-logos/precot.webp', w: 349, h: 144 },
  { name: 'Compass Tex', logo: '/client-logos/compass-tex.webp', w: 373, h: 56 },
  { name: 'Symphony Space Crafted', logo: '/client-logos/symphony.webp', w: 217, h: 189 },
  { name: 'Lakshmi Krishna Naturals', logo: '/client-logos/lakshmi-krishna.webp', w: 307, h: 152 },
  { name: 'Aishwaryam Oils', logo: '/client-logos/aishwaryam-oils.webp', w: 188, h: 187 },
  { name: 'B-ARM Technologies', logo: '/client-logos/b-arm.webp', w: 336, h: 120 },
  { name: 'Step8Up', logo: '/client-logos/step8up.webp', w: 334, h: 155 },
  { name: 'Kovai Pazhamudhir Nilayam', logo: '/client-logos/kovai-pazhamudhir-nilayam.webp', w: 190, h: 189 },
  { name: 'Techno Tackle Software Solutions', logo: '/client-logos/techno-tackle.webp', w: 407, h: 121 },
  { name: 'Padma Raj Jewellers', logo: null },
]

export const PAINS = {
  eyebrow: 'Sound familiar?',
  h2: 'You don’t have an AI problem. You have a margin problem that AI can fix.',
  sub: 'These are things plant owners told us in our first meeting. Maybe one of them is yours.',
  items: [
    { q: '“We found the defect at the buyer’s warehouse, not ours.”', t: 'Every 1% of rejection on a ₹100 Cr line is ₹1 Cr lost to scrap, rework or credit notes.' },
    { q: '“The machine stopped on Saturday night. We found out on Monday.”', t: 'Unplanned breakdowns stall orders, burn overtime and push dispatch dates.' },
    { q: '“Only two people here can make a quote. One is on leave.”', t: 'Enquiries wait, buyers move on, and growth depends on a few busy people.' },
    { q: '“Our production plan lives in a WhatsApp group.”', t: 'Urgent orders and shortages turn every morning into a firefight.' },
  ],
}

export const SYSTEMS = {
  eyebrow: 'What we do',
  h2: 'Five AI Advantage Systems. Each one owns a line of your P&L.',
  sub: 'Not software you have to figure out. A working system built into the machines, ERP and spreadsheets you already use, with a rupee target we agree before we start.',
  items: [
    { key: 'quality', tag: 'Quality', h: 'Catch the bad part before it ships', p: 'AI defect detection and vision inspection that traces every reject to its cause.', moves: 'Moves: rejection %, first-pass yield' },
    { key: 'throughput', tag: 'Throughput', h: 'Know a machine will fail before it does', p: 'Predictive maintenance and OEE from sensor, PLC and maintenance-log data.', moves: 'Moves: downtime, output per shift' },
    { key: 'delivery', tag: 'Delivery', h: 'Spot the late order while you can still save it', p: 'Demand forecasting and production planning against your real capacity.', moves: 'Moves: OTIF, inventory days' },
    { key: 'procurement', tag: 'Procurement', h: 'Buy at the right price, from the right vendor', p: 'Supply chain and vendor intelligence across price, lead time and quality history.', moves: 'Moves: purchase cost, working capital' },
    { key: 'revenue', tag: 'Revenue', h: 'Answer every enquiry, quote in hours', p: 'AI for B2B manufacturing sales across email, WhatsApp and Zoho CRM.', moves: 'Moves: quote time, conversion' },
  ],
  stack: {
    eyebrow: 'Built into your stack',
    h: 'No rip-and-replace. We plug into what you already run.',
    chips: ['SAP', 'Tally', 'Zoho', 'Oracle', 'PLC / SCADA', 'MES', 'Excel', 'WhatsApp', 'Claude', 'Shopify'],
    note: 'Dashboards shown are illustrative examples. Alerts reach your team on WhatsApp, email or the tools above.',
  },
  d2c: 'Also building for D2C and growth brands:',
  d2cLinks: ['AI agents', 'Marketing automation', 'CRM and sales intelligence', 'E-commerce AI'],
  banner: {
    h: 'Not sure which one is costing you the most?',
    p: 'Tell us your biggest loss in one line. We’ll reply with the one system that pays back fastest in your plant. Free, and usually within a day.',
    primary: 'Get my free recommendation',
    secondary: 'WhatsApp us',
  },
}

export const HOW = {
  eyebrow: 'How we work',
  h2: 'Start free. Prove it on one line. Then scale.',
  p: 'You never pay for the next step until the last one has earned it. Your first system typically goes live on one line in about 90 days, with measurable P&L impact within 6 months.',
  link: 'See the full engagement model →',
  steps: [
    { h: 'Free half-day audit', p: 'We walk your plant with you and your plant head, and leave 3–5 use cases ranked by rupee impact.' },
    { h: 'One-month deep dive', p: 'A fixed-fee look at your process, data, systems and people, ending in a KPI baseline you sign off.' },
    { h: 'Build, adopt and stay', p: 'We build on one line, train your supervisors in Tamil, Hindi or English, then review rupee impact with your CFO every month.' },
  ],
}

// Case study cards: `slug` points at the existing /case-studies/{slug} page and its cover in /public/case-covers.
export const CASES = {
  eyebrow: 'Real plants, real results',
  h2: 'Every one of these started with a messy problem and a free audit',
  all: 'All case studies →',
  lead: {
    slug: 'ai-ecommerce-customer-intelligence-automation',
    meta: 'Personal care manufacturing + D2C',
    h: 'Lakshmi Krishna Naturals',
    big: '$1.5M → $5M',
    p: 'Revenue in three years. AI customer intelligence and sales automation now sell into 19 global markets, without growing the team at the same pace.',
    quote: '“Stratai.io has been our long-term partner, helping us scale from $1.5M to $5M in revenue over three years. They deliver results, not just promises.”',
    by: 'Mohan, Founder, Lakshmi Krishna Naturals',
    link: 'Read the case study →',
  },
  items: [
    { slug: 'tirupur-buying-house-ai-shop-floor-pl-impact', meta: 'Garments · German buying house, Tirupur', h: '25+ factories, one view of quality and delivery', p: 'AI systems that connect shop-floor signals from contract factories to the P&L for 50+ European fashion brands.', link: 'Read the case study →' },
    { slug: 'jewellery-manufacturer-ai-catalogue-order-intelligence', meta: 'Jewellery manufacturing', h: '64,000 designs, off PDFs and WhatsApp', p: 'An AI catalogue and order intelligence system for designs with 20+ variables each.', link: 'Read the case study →' },
    { slug: 'symphony-furnishings-ai-transformation-case-study', meta: 'Furnishings · Coimbatore · 2-year journey', h: '60 people, 12 salespeople, only 2 who could quote', p: 'How Symphony moved its operations to Zoho and built an AI-searchable fabric catalogue.', link: 'Read the story →' },
    { slug: 'domain-first-principle-ai-transformation', meta: 'Consumer medical devices', h: 'Procurement AI in 4 months, zero scope changes', p: '7–8 data sources unified into one engine that decides what to stock, and when.', link: 'Read the case study →' },
  ],
  banner: {
    h: 'Want a story like this for your plant?',
    p: 'An illustrative ₹150 Cr plant gains about ₹1.5 Cr a year from fewer rejects, less downtime and leaner inventory. Let’s work out your number.',
    primary: 'Book my free audit',
    secondary: 'Estimate my ROI',
  },
}

export const ABOUT = {
  eyebrow: 'About us',
  h2: 'A note from our founders',
  paras: [
    'We grew up around the mills and workshops of the Kongu belt. We’ve sat in the MD’s cabin and stood next to the operator on night shift, and we kept seeing the same thing.',
    'Good companies were spending real money on AI, a camera here, a dashboard there, and six months later the rejection rate hadn’t moved. The technology wasn’t the problem. Nobody had started with the plant.',
    'So we built StratAI the other way round. We learn your shop floor first. We agree a rupee target with you. And we stay until it shows up in your monthly P&L. If AI isn’t the answer to your problem, we’ll say so.',
  ],
  sign: 'Palaniappan SN and Harish, Co-Founders',
  links: [['Read our full story →', '/about'], ['Meet the team →', '/about']],
  mission: { eyebrow: 'Our mission', t: 'Help every mid-market manufacturer in India compete with AI that pays for itself.' },
  glance: {
    h: 'StratAI at a glance',
    rows: [
      ['Based in', 'Coimbatore, Tamil Nadu'],
      ['Clients in', 'India, Bangladesh, Turkey, Europe, UK'],
      ['Partner', 'Anthropic Claude Partner Network member'],
      ['Company', 'Stratworks Consulting LLP'],
    ],
  },
  values: [
    { h: 'Domain first', p: 'We learn why your yarn count drifts by shift before we choose a model.' },
    { h: 'Baseline before build', p: 'If we can’t measure it in rupees, we don’t build it.' },
    { h: 'We sit beside you', p: 'Not above you. Long-term retainers, not handovers.' },
    { h: 'Your people, your language', p: 'Training in Tamil, Hindi or English, alerts on WhatsApp.' },
  ],
  journeyH: 'Our journey so far',
  journey: [
    { when: 'Founded', t: 'In Coimbatore' },
    { when: 'First retainer', t: 'Our first long-term manufacturing client' },
    { when: 'June 2026', t: 'Joined the Anthropic Claude Partner Network as a Registered Partner' },
    { when: 'Today', t: 'Clients in 5 regions: India, Bangladesh, Turkey, Europe and the UK' },
  ],
}

export const TEAM = {
  eyebrow: 'Our team',
  h2: 'The people who’ll be on your shop floor',
  sub: 'Boardroom strategy, factory engineering and AI building under one roof. A co-founder joins every audit.',
  link: 'Meet the full team →',
  founders: ['palani', 'harish'],
  localAvatars: { palani: '/palani.jpeg', dyanesh: '/dyanesh.jpeg', arvin: '/arvin.jpeg' },
  hiring: 'We’re hiring AI engineers and manufacturing analysts in Coimbatore.',
  hiringLink: 'See open roles →',
}

export const TRUST = {
  eyebrow: 'Why you can trust us',
  h2: 'Letting outsiders into your plant data is a big decision. Here’s our promise, in writing.',
  promiseH: 'Our promise to every client',
  stamp: 'Signed with every audit',
  promises: [
    { h: '01 · NDA on day one', p: 'We sign your NDA before the audit. Your data and results never appear in our marketing without written approval.', icon: 'doc' },
    { h: '02 · Your data stays with you', p: 'Sensitive data can stay in your own environment. We build on enterprise-grade AI as an Anthropic Claude partner.', icon: 'lock' },
    { h: '03 · A co-founder, every time', p: 'A co-founder joins every audit and stays on your project. You’re never handed to a junior team.', icon: 'person' },
    { h: '04 · The honest answer', p: 'If AI isn’t the right fix, we’ll tell you, even if it means no project for us.', icon: 'check' },
  ],
  signers: ['Palaniappan SN', 'Harish'],
  reviewsEyebrow: 'In our clients’ words',
  reviewsOrder: ['Arun', 'Bharath', 'Balavishnu Ranganathan'],
  reviewsLink: 'Read all client reviews →',
  verifyH: 'Don’t take our word for it. Check us out yourself:',
  verify: [
    { h: 'Claude Partner Network', p: 'Member since June 2026', icon: 'spark', href: '/claude-partner' },
    { h: 'LinkedIn', p: 'Team and client updates', icon: 'in', href: LINKEDIN },
    { h: 'Registered LLP', p: 'Stratworks Consulting LLP', icon: 'building' },
  ],
}

export const LOCATION = {
  eyebrow: 'Rooted in the heartland',
  h2: 'An AI company in Coimbatore, a short drive from the factories we serve',
  p: 'Tiruppur, Erode and Karur are down the road. We also work with manufacturers in Chennai, Bengaluru, Pune, Ahmedabad and abroad. Drop in for filter coffee and a conversation about your plant.',
  org: 'StratAI · Stratworks Consulting LLP',
  link: 'AI services in Coimbatore →',
}

export const HUB = {
  eyebrow: 'Latest from the Knowledge Hub',
  h2: 'Field notes for plant owners, written from the shop floor',
  all: 'All guides and case studies →',
}

export const FAQ = {
  h2: 'Questions plant owners ask us first',
  items: [
    { q: 'Who is StratAI?', a: 'StratAI is a Coimbatore-based AI company and Anthropic Claude partner that builds AI systems for mid-market manufacturers in India. It is run by Stratworks Consulting LLP.' },
    { q: 'Who do you work with?', a: 'Mostly manufacturers with ₹50–1,000 Cr revenue in textiles, engineering, jewellery, FMCG and medical devices, plus D2C brands that make their own products.' },
    { q: 'What happens in the free audit?', a: 'We spend half a day at your plant and hand you 3–5 AI use cases ranked by rupee impact. If AI isn’t the answer, we’ll tell you.' },
    { q: 'How soon will we see results?', a: 'Your first system typically goes live on one line in about 90 days, with measurable P&L impact within 6 months.' },
    { q: 'How do you keep our production data safe?', a: 'We sign an NDA before the audit, can keep sensitive data in your own environment, and build on enterprise-grade AI as an Anthropic Claude partner.' },
    { q: 'Is StratAI related to companies with similar names?', a: 'No. StratAI (stratai.io) is a brand of Stratworks Consulting LLP, Coimbatore, and isn’t connected to other companies with similar names.' },
  ],
}

// These three need pages that do not exist yet, so they point at the contact page for now.
export const RESOURCES = {
  h2: 'Not ready to talk yet? Start here.',
  items: [
    { tag: '2-minute check', h: 'AI Readiness Check for Manufacturers', p: '10 questions, an instant score and the system to start with.', href: '/contact' },
    { tag: '60-second estimate', h: 'Manufacturing AI ROI Calculator', p: 'See what fewer rejects and less downtime could be worth to you.', href: '/contact' },
    { tag: 'Free PDF', h: '90-Day Manufacturing AI Roadmap', p: 'Phase plan, data checklist and KPI baseline template.', href: '/contact' },
  ],
}

export const FINAL = {
  h2: 'Give us half a day. We’ll show you where your plant is losing money.',
  p: 'One co-founder, your plant, your numbers. You leave with an AI opportunity scorecard, the payback on your top use case and a 90-day plan you can run with or without us.',
  micro: 'NDA on day one · A co-founder replies within one working day',
  primary: 'Book my free half-day audit',
  secondary: 'WhatsApp Harish now',
}
