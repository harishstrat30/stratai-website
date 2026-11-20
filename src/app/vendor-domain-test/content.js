// Copy for the 5-Layer Domain Test scorecard (/vendor-domain-test).
// The five layers and the "where vendors fail" lines come from the StratAI post
// "Your AI Vendor Knows Technology. The Question Is Whether They Know Your Business."
// (/blog/ai-vendor-selection-manufacturing-domain-expertise). Edit this file to change wording.

export const LAYERS = [
  {
    key: 'industry', num: '01', name: 'Industry knowledge', short: 'Industry',
    meaning: 'Your specific sector: how it competes and where margins live.',
    vendorsFail: 'Most vendors know manufacturing generically, not your industry specifically.',
    ask: 'What do you know about our industry, and how do we compete in it?',
    strong: 'Answers with specifics: margins, customers, seasonality, the rules of our sector.',
    weak: 'Gives generic manufacturing answers that would fit any plant.',
    probes: [
      'Which companies in our sector have you worked with, and what did the AI change in their numbers?',
      'What do our competitors do differently from the typical manufacturer in your case studies?',
    ],
  },
  {
    key: 'business', num: '02', name: 'Business model understanding', short: 'Business model',
    meaning: 'How your company makes money, and where it quietly loses it.',
    vendorsFail: 'Vendors see the org chart, not the P&L logic.',
    ask: 'How do you think our business makes money, and where does it quietly lose it?',
    strong: 'Talks in P&L terms: margin, working capital, returns, order mix.',
    weak: 'Talks about modules and features, not about how we earn.',
    probes: [
      'Walk us through how you think this company makes money. Where would you look first for leakage?',
      'Which line of our P&L will this project move, by how much, and how will it be measured?',
    ],
  },
  {
    key: 'strategy', num: '03', name: 'Strategic context', short: 'Strategic context',
    meaning: 'What stage of life the business is in. AI built for scaling looks different from AI built for survival.',
    vendorsFail: 'Vendors propose without knowing whether the company is ready: technically right, organisationally wrong.',
    ask: 'What stage is our business in, and how does that change what you would build?',
    strong: 'Separates survival-mode builds from scaling-mode builds and says which we need.',
    weak: 'Proposes the same solution to every client.',
    probes: [
      'Do you see us in survival mode or scaling mode, and what would you build differently because of it?',
      'What in our management structure would break if this project succeeded?',
    ],
  },
  {
    key: 'process', num: '04', name: 'Function-specific process knowledge', short: 'Process knowledge',
    meaning: 'How the process actually works on the floor, not how the SOP says it works.',
    vendorsFail: 'The gap between the boardroom description and floor reality is where most AI projects die.',
    ask: 'What would you NOT automate in our business, and will you work on our shop floor first?',
    strong: 'Names two or three things not to automate straight away and asks for floor time before proposing.',
    weak: 'Struggles with the question, or wants to automate everything.',
    probes: [
      'Where do people work around the system today, and what would you capture to drive decisions before the event, not after?',
      'What would you not automate in our business, and why? How many days will you spend on our shop floor before you propose?',
    ],
  },
  {
    key: 'people', num: '05', name: 'Human behaviour and change management', short: 'Change management',
    meaning: 'Who resists change and why, and who holds informal authority that no org chart shows.',
    vendorsFail: 'Entirely ignored by most vendors, yet it is the biggest reason AI adoption fails after go-live.',
    ask: 'Who will resist this, and who holds informal authority in our team?',
    strong: 'Has a change plan: named owners, training, and what happens in the first 30 days after go-live.',
    weak: 'Treats adoption as our job once the system is delivered.',
    probes: [
      'Who in our team will resist this, and who holds informal authority that the org chart will not show you?',
      'What is your plan for the first 30 days after go-live, when people are tempted to go back to the old way?',
    ],
  },
]

// What each score means, shown next to the slider.
export const BANDS = [
  { max: 3, label: 'Generic or no evidence' },
  { max: 6, label: 'Some specifics, thin proof' },
  { max: 8, label: 'Specific to our business' },
  { max: 10, label: 'Specific, referenced, and challenges us' },
]

export const VERDICTS = {
  strong: { label: 'Strong domain fit', summary: 'Proceed to references and a scoped pilot. Their answers show they know your business.' },
  probe: { label: 'Probe further', summary: 'Promising but not proven. Use the follow-up questions below before you sign anything.' },
  insufficient: { label: 'Insufficient', summary: 'This vendor is solving for the demo, not for your business. Do not sign until the gaps below are closed.' },
}

export const RULES = [
  'Strong domain fit: 40 or more out of 50, with no layer below 6.',
  'Insufficient: under 25 out of 50, or two or more layers at 3 or below.',
  'Probe further: everything in between.',
]

// The five questions from the post to ask in the room.
export const MEETING_QUESTIONS = [
  { q: 'What do you know about our industry, business model and strategy?', why: 'A vendor who did their homework answers with specifics. A vendor solving for the demo gives generic answers.' },
  { q: 'What have you done in a similar space? Can I speak to two references?', why: 'Same industry, same business stage, similar complexity. Not their best client, their most relevant one.' },
  { q: 'What would you NOT automate in our business, and why?', why: 'This separates domain experts from technology sellers. A real expert names two or three things at once.' },
  { q: 'Will you work on the ground, on our shop floor, with our team?', why: 'A vendor who proposes without time in your operations is designing for a business they imagined.' },
  { q: 'What are the top three challenges you expect, and how will you handle them?', why: 'Specific challenges show domain awareness. Generic answers show the opposite.' },
]
