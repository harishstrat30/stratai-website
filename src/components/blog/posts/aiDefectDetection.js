// Article content for the "new template" version of the AI Defect Detection post.
// Source: "Blog · AI Defect Detection (merged, new template).pdf" (2026-11-24). Nothing here is written to the CMS database:
// the template reads this file for the slug below and keeps using the database post for its author, category and related data.
//
// Inline markup inside strings: **bold** and [link text](href). Everything else is plain text.

export const SLUG = 'ai-defect-detection-quality-control-manufacturing-india'

const HERO_IMG = 'https://cinlfqmiiabwmeunowol.supabase.co/storage/v1/object/public/media/images/2026/10/1793078674736-ai-defect-detection-india-hero.jpg'
const CHECKLIST_IMG = 'https://cinlfqmiiabwmeunowol.supabase.co/storage/v1/object/public/media/images/2026/10/1793078679063-ai-defect-detection-india-checklist.jpg'

export const POST = {
  title: 'AI Defect Detection in Manufacturing: How Mid-Market Plants Cut Rejection Rates by Closing the Feedback Loop',
  intro: 'Manual inspection catches quality problems after the cost is already locked in. Here’s how AI-powered defect detection helps mid-market Indian manufacturers catch issues in real time, and what it actually takes to make it work.',
  metaDescription: 'How AI defect detection works in manufacturing, what poor quality costs, where it fits, what it takes to start and how mid-market Indian plants cut rejection rates by closing the feedback loop.',
  updated: '23 November 2026',
  readMinutes: 12,
  heroImage: { src: HERO_IMG, alt: 'AI defect detection on a manufacturing line: manual inspection samples after the fact, AI checks quality in real time' },
  author: {
    name: 'Palaniappan SN',
    role: 'Co-Founder, StratAI',
    credentials: 'MBA, IIM Bangalore · BE (Mechanical), PSG Tech',
    linkedin: 'https://www.linkedin.com/in/palaniappan-sn-b10820108',
    avatar: '/palani.jpeg',
    bio: 'Palaniappan SN is a Business Strategy Consultant who has spent his career at the intersection of business strategy and operational reality, working across management levels from the boardroom to the shop floor to understand where organisations actually win and lose. His conviction is simple: AI should never be an experiment. It should be an advantage. That belief is the foundation of StratAI’s AI Advantage Systems methodology, built not from technology-first thinking but from the ground up, with the discipline to walk away from projects where the conditions for success don’t exist.',
  },
  takeaways: [
    'Poor quality costs many manufacturers 15 to 20% of sales, and most plants never calculate it.',
    'Manual inspection samples parts after the cost is locked in. AI inspection checks continuously and records what it finds.',
    'AI inspection on its own stalls. When people, machine data, ERP and AI work as one system, the gains compound.',
    'Alerts and action plans reach shift supervisors, plant heads and operators on the same shift, not at a weekly review.',
    'Start small: phone-based defect capture connected to the data you already hold. Fixed cameras come later.',
    'AI inspection suits visible defects where rework is expensive: castings, machined parts, incoming fabric. It is weak for final garment inspection.',
    'Measure in rupees: rejection rate, first-pass yield and the time from defect to corrective action.',
  ],
  sidebarCta: { h: 'Where do defects cost your plant most?', p: 'Free half-day plant audit. No fee, no commitment.', button: 'Book the audit', href: '/contact' },
  related: [
    { slug: 'ai-aluminium-die-casting-india', tag: 'Shop Floor & Operations', title: 'Why Your Die Casting Plant Is Losing Money Every Month, and Your ERP Won’t Tell You' },
    { slug: 'manufacturing-data-strategy-capture-convert-compound', tag: 'Data & ERP', title: 'AI Transformation for Manufacturing: All You Need to Understand About Data' },
    { slug: 'ai-enabled-manufacturing-erp-india', tag: 'Data & ERP', title: 'Your ERP Was Built to Record the Past. Here’s What Is Now Possible.' },
  ],
}

export const BLOCKS = [
  { t: 'h2', id: 'what-is', text: 'What is AI defect detection in manufacturing?' },
  { t: 'answer', text: 'AI defect detection in manufacturing uses cameras and machine learning to spot defects as parts are made, and links each defect to the process conditions behind it. It works when it sits inside a closed loop: image capture, diagnosis, root cause analysis, documentation, and a corrective action that reaches the operator on the same shift. Run on its own, an AI inspection tool flags defects that nobody acts on.' },

  { t: 'h2', id: 'poor-quality-cost', toc: 'What poor quality really costs', text: 'What does poor quality really cost a manufacturer?' },
  { t: 'p', text: 'Poor quality costs many manufacturers between 15% and 20% of sales revenue, according to the American Society for Quality (ASQ), and up to 40% of operations at the worst performers. Most of that money never shows up as one line item. It is scattered across scrap, rework hours, re-inspection, expedited freight and discounted seconds that nobody codes as a quality cost.' },
  { t: 'stat', value: '15–20%', text: 'The share of sales revenue that quality-related costs consume at many manufacturers, per ASQ. The worst performers reach 40% of operations.', source: 'Source: ASQ cost of quality benchmarks, as reported in Reliamag, 8 September 2026' },
  { t: 'p', text: 'The bigger problem is visibility. ASQ’s 2025 benchmarking found that only 31% of respondents fully understand how quality costs affect their organisation’s financial performance. If you cannot see the cost, you cannot decide how much to spend on catching defects earlier. For a mid-market plant, that is margin given away batch after batch.' },

  { t: 'h2', id: 'manual-inspection-late', toc: 'Why manual inspection catches defects too late', text: 'Why does manual inspection catch defects too late?' },
  { t: 'answer', text: 'Manual inspection catches defects too late because it samples a few parts after the process that caused the defect has already run. By the time an inspector finds a bad part, the batch behind it is often in motion, and the cause keeps running uncorrected: a temperature drift, a worn tool, a changed material.' },
  { t: 'p', text: 'The usual response in Indian plants is more inspection: another checkpoint, another pair of eyes, a stricter sampling plan. That helps a little. It does not fix the structure. Manual inspection is a sample, not a system.' },
  { t: 'p', text: 'On a visit to an aluminium die casting unit, our judgement was that the gap was not a missing camera. It was four breaks in the chain:' },
  { t: 'cards', items: [
    { h: 'Fragmented data.', p: 'The information needed to judge a defect (the part, the machine parameters, the standard) sat in different places and never met.' },
    { h: 'Documentation friction.', p: 'Writing up a defect by hand was slow enough to discourage it.' },
    { h: 'A communication gap.', p: 'Even when a solution was found, it did not reach the worker in a form they could act on.' },
    { h: 'A slow feedback loop.', p: 'The time from defect to correction was long, compared with what AI assistance makes possible.' },
  ] },
  { t: 'p', strong: true, text: 'A smarter camera fixes none of those four. A connected system does.' },

  { t: 'h2', id: 'defect-types', toc: 'Types of manufacturing defects AI can detect', text: 'What types of manufacturing defects can AI detect?' },
  { t: 'answer', text: 'AI detects defects that are visible in an image: surface marks, shape errors, contamination and assembly mistakes. It does not see inside a part. Internal defects need X-ray or a prediction from process data.' },
  { t: 'p', text: 'The table shows where a camera-based approach fits and where it does not.' },
  { t: 'table', head: ['Defect type', 'What it looks like', 'Typical processes', 'Camera-detectable?'], rows: [
    ['**Cracks, scratches, dents**', 'Visible marks on the surface', 'Castings, machined parts, sheet metal', { text: 'Yes', tone: 'yes' }],
    ['**Flash, burrs, short fill**', 'Excess or missing material at edges', 'Die casting, moulding', { text: 'Yes', tone: 'yes' }],
    ['**Cold shuts, flow lines, blisters**', 'Surface lines or bubbles', 'Die casting', { text: 'Yes, on the surface', tone: 'yes' }],
    ['**Weld defects and spatter**', 'Irregular beads, spatter, gaps', 'Fabrication', { text: 'Yes', tone: 'yes' }],
    ['**Contamination, stains, discolouration**', 'Marks that differ from the standard', 'Most processes', { text: 'Yes', tone: 'yes' }],
    ['**Assembly errors**', 'Missing part, wrong label, wrong orientation', 'Assembly and packing', { text: 'Yes', tone: 'yes' }],
    ['**Fabric faults**', 'Holes, stains, weave faults', 'Incoming fabric inspection', { text: 'Yes', tone: 'yes' }],
    ['**Internal porosity and voids**', 'Hidden inside the part', 'Castings', { text: 'No. Needs X-ray or process data', tone: 'no' }],
    ['**Fine flaws on finished garments**', 'Small, hard-to-capture defects', 'Garment final inspection', { text: 'Weak', tone: 'weak' }],
  ] },

  { t: 'h2', id: 'ai-vs-manual', toc: 'AI defect detection vs manual quality inspection', text: 'AI defect detection vs manual quality inspection: what is the difference?' },
  { t: 'answer', text: 'The core difference is when and how defects are found and acted on. Manual inspection checks a sample after the process has run and records findings later. AI-assisted inspection captures defects at the source, links them to data and starts the correction while the batch is still being made.' },
  { t: 'table', head: ['Factor', 'Manual inspection', 'AI-assisted closed loop'], rows: [
    ['**Coverage**', 'A sample of parts', 'Every part that passes the camera or is photographed'],
    ['**Consistency**', 'Varies by inspector and shift', 'One standard applied every time'],
    ['**Timing**', 'After the process has run', 'At or near the point of making'],
    ['**Documentation**', 'Written up later, by hand', 'Captured at source by voice or text, in a standard format'],
    ['**Root cause**', 'Opinion and memory', 'Linked to part, machine, FMEA and standards data'],
    ['**Feedback to the worker**', 'Weekly review or verbal instruction', 'Action plan in the worker’s language, for that machine'],
  ] },
  { t: 'callout', label: 'Better together', text: 'Research summarised by Sandia National Laboratories found that combining humans, sensors and computers typically yields better inspection performance than any single component. Inspection is changing, not disappearing.', source: 'Source: Sandia National Laboratories, SAND2017-6457C, 2017, citing Hou, Lin and Drury (1993).', sourceLink: { label: 'Read the paper', href: 'https://www.osti.gov/biblio/1476816' } },
  { t: 'p', text: 'That finding is the design principle behind everything below. The goal is not to replace your inspectors. It is to give them data, speed and a standard format.' },

  { t: 'h2', id: 'machine-vision', toc: 'Machine vision and deep learning in quality control', text: 'How do machine vision and deep learning work in quality control?' },
  { t: 'answer', text: 'Machine vision uses a camera, controlled lighting and fixed rules to check things that are predictable: is the label present, is the dimension in tolerance, is the part in the right position. Deep learning learns from labelled images of good and bad parts, so it handles defects that vary in shape and location, such as scratches, cold shuts and stains.' },
  { t: 'p', text: 'Most plants end up needing both. Rule-based machine vision suits fixed-position checks. Deep learning suits variable surface defects. The catch with deep learning is the data: it needs labelled defect images from your own parts, and lighting changes can degrade it.' },
  { t: 'p', text: 'That is why we start with image capture, not an expensive camera line. Every defect photo your team captures, tagged with the part, machine and shift, builds the labelled library a vision model needs later.' },
  { t: 'h3', text: 'What this looks like on the line' },
  { t: 'ul', items: [
    'AI defect detection integrated directly into production line inspection, not a separate offline sampling step',
    'Camera-based vision inspection that checks quality in real time, as units move through the line',
    'Root cause analysis that links defect patterns back to the process variables causing them, not just the symptom',
    'Real-time alerts sent straight to shift supervisors and plant heads, so action happens on the same shift, not in a weekly quality review',
  ] },

  { t: 'h2', id: 'closed-loop', toc: 'What a closed-loop AI quality system looks like', text: 'What does a closed-loop AI quality system look like?' },
  { t: 'answer', text: 'A closed-loop AI quality system takes a defect from photograph to corrective action without breaking the chain. This is what we build as the Quality Advantage System (QAS). The aim is a lower rejection rate and a higher first-pass yield, shown in the P&L.' },
  { t: 'loop', items: [
    { h: 'Capture', p: 'A worker photographs the defect on a mobile phone at the machine.' },
    { h: 'Diagnose', p: 'AI classifies the defect against your standard.' },
    { h: 'Question the root cause', p: 'AI prompts the questions a good quality engineer would ask, so the team reaches a cause instead of a guess.' },
    { h: 'Document', p: 'The finding is recorded by voice or text in a standard format. No separate write-up.' },
    { h: 'Connect the data', p: 'The system pulls in the part record, machine parameters, FMEA, your standards book and ERP data.' },
    { h: 'Communicate', p: 'The action plan reaches the worker in the language they understand, for that machine.' },
  ] },
  { t: 'p', text: 'The value is in the connection. Humans, ERP, machine data and AI each see part of the picture. Together they spot deviations faster and shorten the time from defect to fix. Alone, each one stalls.' },
  { t: 'p', text: 'The shift is from “catch it before it ships” to **“catch it before the next hundred units are made the same way.”**' },
  { t: 'p', text: 'Installing cameras and dashboards is the easy part. The harder part, the part that actually decides whether rejection rates fall, is making sure the alerts reach someone who can act on them, and that root-cause findings actually change how the process runs. An AI quality system that flags defects nobody looks at is not a quality system. It is an expensive way to confirm what the QC team already suspected.' },

  { t: 'h2', id: 'industries', toc: 'Industries and processes where it works', text: 'Which industries and manufacturing processes does AI defect detection work in?' },
  { t: 'answer', text: 'AI defect detection works best where two conditions hold: the cost of rework or scrap is high, and the defect is easy to capture in an image. Where either condition fails, the return drops sharply.' },
  { t: 'table', head: ['Where it fits', 'Why'], rows: [
    ['**Aluminium die casting and other castings**', 'Scrap is expensive and many defects show on the surface'],
    ['**Machined and fabricated metal parts**', 'Late-found defects carry machining and rework cost'],
    ['**Incoming fabric inspection in textiles**', 'Fabric defects are easy to capture before cutting and stitching'],
    ['**Assembly and packing lines**', 'Missing parts and labelling errors are visible'],
    [{ prefix: 'Not a fit:', text: 'final garment inspection' }, 'Fine flaws are hard to capture, so the return is weak'],
    [{ prefix: 'Not a fit alone:', text: 'internal casting defects' }, 'Needs X-ray or process data, not a surface image'],
  ] },
  { t: 'stat', value: '11.2%', text: 'The average scrap rate of one aluminium high-pressure die casting part in a 2025 study of 900,000 pieces a year. The defects were mainly shrinkage and porosity, and leaks, found after downstream processing.', source: 'Source: International Journal of Metalcasting, Springer, 2025.', sourceLink: { label: 'Read the study', href: 'https://link.springer.com/article/10.1007/s40962-025-01702-8' } },
  { t: 'p', text: 'That is why die casting is a natural starting point. Scrap is found late, after machining and testing have added cost. Catching the cause earlier, and getting the fix to the operator the same shift, is where the saving sits.' },

  { t: 'h2', id: 'implementation', toc: 'Implementation requirements: cameras, data and line integration', text: 'What do you need to implement AI defect detection: cameras, data and line integration?' },
  { t: 'answer', text: 'The minimum for a first pilot is a mobile phone for defect capture, connected to data your plant already holds. You do not need fixed cameras, new machines or a full line integration to prove the loop works. You add them once the loop has earned them.' },
  { t: 'image', src: CHECKLIST_IMG, alt: 'The AI quality checklist: eight steps to catch defects in real time', caption: 'Implementation checklist: start with phones and existing data, add cameras and integration later.' },
  { t: 'h3', text: 'Cameras and lighting' },
  { t: 'p', text: 'Start with phones. They are cheap, your team already knows how to use them, and every image builds your defect library. Move to fixed cameras with controlled lighting only when a single line and defect type has proved the value and the volume justifies it. Lighting matters most at that stage, because changes in light can degrade a vision model over time.' },
  { t: 'h3', text: 'Data' },
  { t: 'p', text: 'Connect the sources you already have: part records, machine parameters, FMEA, your standards book and ERP. The common gap is traceability, meaning each defect can be tied to the part, machine and shift that made it. Fix that first. Messy data is normal. It does not block a pilot, but it shapes the scope.' },
  { t: 'h3', text: 'Production-line integration' },
  { t: 'p', text: 'Integration with PLC, MES and ERP comes after the loop works, not before. A common mistake is to commit to heavy integration and hardware before the plant has proved that defects, causes and fixes can be connected. Our view is that proving the loop on one line and one defect type is cheaper than designing the perfect system on paper.' },
  { t: 'p', text: 'Our [AI consulting and implementation services](/services) cover each of these stages, and the [AI implementation roadmap](/blog/ai-implementation-manufacturing-cxo-guide) shows how they fit together.' },

  { t: 'h2', id: 'cost', toc: 'What it costs and how we engage', text: 'How much does AI defect detection cost, and how do we engage?' },
  { t: 'p', text: 'We reduce your risk at every step. The engagement runs in three stages, and you can stop after the first one with nothing owed.' },
  { t: 'tiers', items: [
    { tag: 'Free', h: 'Half-day plant audit', p: 'A quick diagnosis of where defects cost you most, with 3–5 AI use cases ranked by P&L impact. No fee, no commitment.', hot: true },
    { tag: 'From ₹1,50,000 + GST', h: 'AI Discovery', p: 'A one-month paid engagement to detail the problem and freeze the scope. Scope confirmed after conversation.' },
    { tag: 'Scoped', h: 'Monthly retainer', p: 'Fixed after Discovery, against a specific scope and KPIs. The fee depends on the complexity of the work and the resources it needs from our side.' },
  ] },
  { t: 'p', text: 'We work this way because AI should not be an experiment. It should be an advantage. See our [manufacturing AI case studies](/case-studies) for how we approach real plants.' },

  { t: 'h2', id: 'rollout', toc: 'A 4-step rollout plan', text: 'What does a 4-step rollout of AI defect detection look like?' },
  { t: 'rollout', items: [
    { tag: 'Step 1', h: 'Take the free half-day plant audit', p: 'Find where defects cost you most and which data you already hold. No fee, no commitment.' },
    { tag: 'Step 2', h: 'Freeze the scope in AI Discovery', p: 'A one-month paid phase. Pick one line, one defect type, map the data sources and agree the KPIs.' },
    { tag: 'Step 3', h: 'Pilot the closed loop on one line', p: 'Capture on mobile, diagnose, question the root cause, document and send the action plan to the worker in their language.' },
    { tag: 'Step 4', h: 'Scale on a scoped retainer', p: 'Extend to more lines and defect types. Add fixed cameras where the loop has earned them.', wide: true },
  ] },
  { t: 'cta', h: 'See where defects cost your plant the most', p: 'In a free half-day audit, we show you your top quality loss areas and which data you already have to fix them. No fee, no commitment.', primary: { label: 'Book your free half-day plant audit', href: '/contact' }, secondary: { label: 'Chat on WhatsApp', href: 'https://wa.me/919600971045', external: true } },

  { t: 'h2', id: 'measure', toc: 'How to measure results', text: 'How do you measure the results of AI defect detection?' },
  { t: 'answer', text: 'Measure results in rupees against a baseline set before the pilot starts, not in model accuracy.' },
  { t: 'p', text: 'The point of an AI quality system is not the cameras or the dashboard. It is what moves in the P&L: a lower rejection rate, a higher first-pass yield, and margin recovered from scrap and rework that was previously treated as a fixed cost of doing business. Track these:' },
  { t: 'ul', items: [
    'Rejection rate, by defect type',
    'First-pass yield',
    'Time from defect found to corrective action reaching the worker',
    'Repeat defects: the same cause appearing again',
    'Rework hours and the rupee value of scrap',
  ] },
  { t: 'h3', text: 'The 6-Month P&L Horizon' },
  { t: 'horizon', items: [
    { h: 'Months 1–3', p: 'Diagnosis, build, getting people aligned' },
    { h: 'Months 4–5', p: 'Adoption and early signals' },
    { h: 'Month 6 onward', p: 'Impact shows in the P&L' },
  ] },
  { t: 'p', text: 'Anyone promising visible P&L results in a few weeks is selling a demo, not a system. For the wider picture, see how our [implementation approach](/engagement-model) ties each system to a measurable outcome.' },
]

export const FAQ_HEADING = 'FAQs: AI defect detection in manufacturing'
export const FAQS = [
  { question: 'What is AI defect detection in manufacturing?', answer: 'AI defect detection in manufacturing uses cameras and machine learning to identify defects in parts as they are made, then links each defect to the process conditions behind it. The useful version does not stop at flagging a bad part. It captures the image, helps find the root cause, records the finding in a standard format and sends the corrective action to the operator, so the same defect is not made again on the next shift.' },
  { question: 'How is AI quality inspection different from manual inspection?', answer: 'Manual inspection samples a percentage of units at a point in time, after the process that caused the defect has already run. AI-assisted inspection checks every part that passes the camera or is photographed, applies one standard every time, and flags the process variable behind the defect, not just the defective unit, so the correction happens before the next hundred units are made the same way.' },
  { question: 'Do we need new cameras or machines to start AI defect detection?', answer: 'No. A first pilot needs only mobile phones for defect capture, connected to data your plant already holds. You do not need to replace your machinery. Fixed cameras with controlled lighting are added as checkpoints on your existing line once one line and one defect type have proved the value.' },
  { question: 'Which industries and defects suit AI inspection best?', answer: 'AI inspection suits visible defects where rework or scrap is expensive: aluminium die casting and other castings, machined and fabricated metal parts, incoming fabric inspection and assembly or packing lines. It is weak for final garment inspection, and internal casting defects need X-ray or process data rather than a surface image.' },
  { question: 'How long before AI defect detection lowers our rejection rate?', answer: 'We work to a 6-Month P&L Horizon. Months 1 to 3 cover diagnosis, build and getting people aligned. Months 4 and 5 bring adoption and early signals. From month 6, the impact shows in the P&L as a lower rejection rate and higher first-pass yield, not as activity metrics like “system installed”.' },
  { question: 'How much does AI defect detection cost in India?', answer: 'With StratAI, the half-day plant audit is free. AI Discovery, a one-month paid engagement that freezes the scope, starts at ₹1,50,000 + GST, with scope confirmed after a conversation. After Discovery, a monthly retainer is fixed against a specific scope and KPIs, based on the complexity of the work.' },
]
