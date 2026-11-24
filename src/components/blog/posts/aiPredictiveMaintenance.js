// Article content for the "new template" version of the AI Predictive Maintenance post.
// Source: "Blog · AI Predictive Maintenance (merged, new template).pdf" (2026-11-24). Nothing here is written to the CMS database:
// the template reads this file for the slug below and keeps using the database post for its category and author data.
//
// Inline markup inside strings: **bold** and [link text](href). Everything else is plain text.

export const SLUG = 'ai-predictive-maintenance-in-manufacturing-explained'

const HERO_IMG = 'https://cinlfqmiiabwmeunowol.supabase.co/storage/v1/object/public/media/images/2026/09/1789456521974-image.png'
const SIGNALS_IMG = 'https://cinlfqmiiabwmeunowol.supabase.co/storage/v1/object/public/media/images/2026/09/1789456526285-image.png'

export const POST = {
  title: 'AI Predictive Maintenance in Manufacturing: How It Works, Algorithms and Use Cases',
  intro: 'Unplanned downtime costs manufacturers billions every year, and most plants that call their maintenance “predictive” are still running preventive maintenance with a different name. Here is what AI predictive maintenance actually is, how it works, and what it takes to start.',
  metaDescription: 'What AI predictive maintenance is, how it predicts machine failure, the main algorithm types, how it differs from preventive maintenance, what it costs to start and how to measure results in a mid-market plant.',
  updated: '24 November 2026',
  updatedIso: '2026-11-24T00:00:00+05:30',
  readMinutes: 13,
  heroImage: { src: HERO_IMG, alt: 'AI predictive maintenance in manufacturing explained: use machine data to plan the next intervention' },
  author: {
    name: 'Palaniappan SN',
    role: 'Co-Founder, StratAI',
    credentials: 'MBA, IIM Bangalore · BE (Mechanical), PSG Tech',
    linkedin: 'https://www.linkedin.com/in/palaniappan-sn-b10820108',
    avatar: '/palani.jpeg',
    bio: 'Palaniappan SN is a Business Strategy Consultant who has spent his career at the intersection of business strategy and operational reality, working across management levels from the boardroom to the shop floor to understand where organisations actually win and lose. His conviction is simple: AI should never be an experiment. It should be an advantage. That belief is the foundation of StratAI’s AI Advantage Systems methodology, built not from technology-first thinking but from the ground up, with the discipline to walk away from projects where the conditions for success don’t exist.',
  },
  about: {
    text: 'StratAI builds AI Advantage Systems for mid-market manufacturing companies across India. Official Registered Claude Partner and Anthropic Partner. 12+ retainer clients across textile, jewellery, furnishings, commodity processing and component manufacturing.',
    links: [{ label: 'stratai.io/contact', href: '/contact' }, { label: 'palani@stratai.io', href: 'mailto:palani@stratai.io' }],
    phone: '+91 99402 25924',
    quote: '“If AI isn’t in your P&L, it isn’t real.”',
  },
  takeaways: [
    'Most plants cannot say what an hour of downtime on their bottleneck machine costs. That one number decides whether predictive maintenance is worth doing.',
    'IoT gives you the data. AI interprets it against the machine manual and tells your team what to do. That is the gap predictive maintenance closes.',
    'The progression is clear: no maintenance, then preventive on a fixed schedule, then predictive on actual machine parameters.',
    'McKinsey reports predictive maintenance typically cuts machine downtime by 30 to 50 percent and extends machine life by 20 to 40 percent.',
    'Programmes stall for two reasons: data that is not integrated, and a team that does not yet believe AI can cut downtime.',
    'Start with one machine, the one with the highest downtime. Measure downtime against a target, then extend to a department and the plant.',
  ],
  sidebarCta: { h: 'What does an hour of downtime cost you?', p: 'Free half-day plant audit. No fee, no commitment.', button: 'Book the audit', href: '/contact' },
  related: [
    { slug: 'ai-defect-detection-quality-control-manufacturing-india', tag: 'Shop Floor & Operations', title: 'AI Defect Detection in Manufacturing: How Mid-Market Plants Cut Rejection Rates' },
    { slug: 'ai-use-cases-for-manufacturing-companies-shop-floor', tag: 'Shop Floor & Operations', title: 'AI Use Cases for Manufacturing Companies on the Shop Floor' },
    { slug: 'ai-aluminium-die-casting-india', tag: 'Shop Floor & Operations', title: 'Why Your Die Casting Plant Is Losing Money Every Month, and Your ERP Won’t Tell You' },
  ],
}

export const BLOCKS = [
  { t: 'h2', id: 'what-is', text: 'What is AI predictive maintenance in manufacturing?' },
  { t: 'answer', text: 'AI predictive maintenance uses machine learning on real-time and historical sensor data to predict when a specific machine is likely to fail, so maintenance happens when the machine’s actual condition requires it, not on a fixed calendar. The AI also reads the data against the machine manual and tells the maintenance team what to do and when. It matters most on high-value machines whose downtime idles people, material and money.' },

  { t: 'h2', id: 'downtime-cost', toc: 'What unplanned downtime costs', text: 'How much does unplanned downtime cost manufacturers?' },
  { t: 'p', text: 'Siemens estimates that unplanned downtime costs the world’s 500 biggest companies about $1.4 trillion a year, equal to 11% of their revenues. That is the headline. The number that matters for your plant is smaller and closer: what one hour of downtime costs on the machine your production depends on.' },
  { t: 'stat', value: '$1.4 trillion', text: 'Annual loss to unplanned downtime across the world’s 500 biggest companies, equal to 11% of their revenues, according to Siemens.', source: 'Source: Siemens, The True Cost of Downtime 2024, June 2024' },
  { t: 'p', text: 'Deloitte found that poor maintenance strategies can reduce a plant’s productive capacity by 5 to 20 percent. For a mid-market manufacturer, that is not a maintenance problem. It is a capacity problem that no amount of new orders can fix.' },
  { t: 'p', text: 'The cost is worst on high-value special-purpose machines: a textile machine, a die casting press, a machine with a high machine-hour rate that the rest of production waits on. When that machine stops, every other resource stops earning with it. People stand idle, material waits, and the money tied up in the order sits still. The loss is never just the machine.' },
  { t: 'cards', cols: 2, items: [
    { h: 'On a continuous line', p: 'A machine going down isn’t an inconvenience. There’s no buffer in the schedule and no way to recover the output later. Every idle hour burns committed labour, power and overhead with nothing coming out the other end.' },
    { h: 'In a batch plant', p: 'Ask any plant head what worries them most, and a breakdown of the one bottleneck machine sits near the top. The rest of the plant can run at full efficiency and the week is still lost.' },
  ] },
  { t: 'p', text: 'So the first question to ask in any plant is simple: **how much does downtime cost you?** If you cannot answer it, you cannot decide how much to invest in preventing it. It is a conversation about exposure, not about sensors and dashboards.' },
  { t: 'stat', value: '5 to 20%', text: 'The share of a plant’s productive capacity that poor maintenance strategies can remove, according to Deloitte.', source: 'Source: Deloitte, Making maintenance smarter, 9 May 2017' },

  { t: 'h2', id: 'iot', toc: 'Why IoT alone is not predictive maintenance', text: 'Why is IoT alone not predictive maintenance?' },
  { t: 'answer', text: 'IoT gives a plant data about its machines but not decisions about them. Sensors stream vibration, temperature and current draw to a dashboard. Someone still has to notice the trend, work out what it means for that machine and decide when to act.' },
  { t: 'p', text: 'On a plant floor, that does not happen at the pace decisions are needed. At hundreds of sensors across dozens of machines, nobody tracks every trend consistently. The maintenance supervisor does not need a vibration graph. They need to hear: **check this bearing on this machine before Thursday’s shift, or output on this order is at risk.**' },
  { t: 'p', text: 'That is the gap AI closes. It reads the IoT data, compares it with the machine manual held in a knowledge base, interprets what the pattern means and suggests a course of action. The plant moves from no maintenance, to preventive maintenance on a standard schedule, to predictive maintenance based on actual machine parameters.' },
  { t: 'h3', text: 'The three stages every plant passes through' },
  { t: 'cards', cols: 3, items: [
    { tag: 'Stage 1 · Reacting', h: 'PLC-based maintenance', p: 'Fixed rules: if temperature exceeds X, trigger an alarm. It fires only after a limit is breached, with no early warning, and it cannot see several variables drifting together.' },
    { tag: 'Stage 2 · Observing', h: 'IoT-based monitoring', p: 'Sensors stream vibration, temperature and current draw to a dashboard. You can see the trend, but someone still has to notice it, interpret it and decide when to act.' },
    { tag: 'Stage 3 · Predicting', h: 'AI predictive maintenance', p: 'A model learns the patterns that precede failure for that machine and states it directly, for example: this bearing has an 80% failure probability in the next 12 days.', hot: true },
  ] },
  { t: 'p', text: 'Each stage doesn’t replace the one before it: AI predictive maintenance still depends on the IoT sensor layer underneath. It is the intelligence layer that makes all that sensor data actionable.' },
  { t: 'image', src: SIGNALS_IMG, alt: 'From machine signals to maintenance action: PLC alerts, IoT monitoring and AI prediction, and what a useful system needs', caption: 'AI builds on machine data. People decide and act.' },

  { t: 'h2', id: 'how-predict', toc: 'How AI predicts machine failure', text: 'How does AI predict machine failure?' },
  { t: 'answer', text: 'AI predicts machine failure by learning what normal looks like for a specific machine, then flagging combinations of readings that drift away from it before the machine fails. Each step below builds on the one before.' },
  { t: 'loop', items: [
    { h: 'Sense', p: 'Collect machine parameters: vibration, temperature, current draw, acoustic signature, pressure, speed. They come from sensors added to the machine, or from the machine’s own inbuilt dashboard.' },
    { h: 'Learn normal', p: 'The model learns what normal looks like for that machine, at that speed, running that product. A 15-year-old machine’s normal is not a new machine’s normal.' },
    { h: 'Detect drift', p: 'The model watches several variables together. A machine can fail when three readings drift slightly at once, none of them crossing a limit. A PLC alarm cannot see that. A model can.' },
    { h: 'Estimate risk', p: 'The model estimates the likelihood and timing of a failure for a specific component.' },
    { h: 'Interpret', p: 'The AI checks the pattern against the machine manual and past breakdown history held in a knowledge base, so the output is a diagnosis, not just an alert.' },
    { h: 'Act and learn', p: 'A specific action goes to the right person on a mobile interface. The decision, diagnosis, failure and corrective action are logged, so the next prediction is better.' },
  ] },

  { t: 'h2', id: 'algorithms', toc: 'Types of predictive maintenance algorithms', text: 'What are the types of predictive maintenance algorithms?' },
  { t: 'answer', text: 'Predictive maintenance uses four main families of algorithm, each answering a different question and needing different data. The right choice depends on what failure history your plant actually has.' },
  { t: 'table', head: ['Algorithm type', 'Question it answers', 'Data needed', 'Best used when'], rows: [
    ['**Anomaly detection (unsupervised)**', 'Is this machine behaving differently from normal?', 'Normal operating data. No failure history needed', 'Starting out. Few recorded failures'],
    ['**Classification (supervised)**', 'Will a failure happen soon, and which kind?', 'Labelled records of past failures and their causes', 'You have good breakdown history'],
    ['**Regression and remaining useful life**', 'How much time is left before this part fails?', 'Run-to-failure history across time', 'You need to plan the intervention date'],
    ['**Time-series deep learning**', 'What complex pattern across many signals precedes failure?', 'Large volumes of continuous sensor data', 'Many sensors, high-frequency data'],
  ] },
  { t: 'p', text: 'Most mid-market plants should start with anomaly detection, because it needs no failure history. As logged failures and corrective actions build up, classification and remaining-useful-life models become possible. This is why logging every decision matters from the first day: it builds the data the better models need.' },
  { t: 'callout', label: 'The layer most vendors skip', text: 'A prediction is only useful when someone knows what to do about it. A knowledge layer that reads the machine manual and your maintenance history turns a prediction into an instruction. We treat that as part of the system, not an add-on.' },

  { t: 'h2', id: 'vs-preventive', toc: 'Predictive vs preventive maintenance', text: 'What is the difference between predictive and preventive maintenance?' },
  { t: 'answer', text: 'Preventive maintenance services a machine at a fixed interval, whatever its condition. Predictive maintenance services it when its actual parameters say it is needed. Reactive maintenance waits for the breakdown.' },
  { t: 'table', head: ['Factor', 'Reactive', 'Preventive', 'Predictive (AI)'], rows: [
    ['**Trigger**', 'Breakdown', 'Calendar or run hours', 'Actual machine parameters'],
    ['**Timing of intervention**', 'Too late', 'Often too early or too late', 'Right time for that machine'],
    ['**Unplanned downtime**', 'High', 'Reduced, not removed', 'Lowest'],
    ['**Parts life used**', 'Run to failure', 'Replaced with life left', 'Used closer to full life'],
    ['**Data needed**', 'None', 'Manual and schedule', 'Machine data, manual, history'],
    ['**Upfront effort**', 'Low', 'Moderate', 'Higher, then pays back'],
  ] },
  { t: 'p', text: 'Four patterns show up again and again in preventive programmes:' },
  { t: 'ul', items: [
    'Parts replaced on schedule that still had useful life left.',
    'Machines that broke down between scheduled services anyway.',
    'Service intervals taken from the manual, whatever the machine’s real condition.',
    'Downtime that is not measured, or is measured but never compared with a target.',
  ] },
  { t: 'p', text: 'Plants that call their maintenance predictive are often still running preventive maintenance under a new name. **They have automated the calendar, not the decision.**' },
  { t: 'stat', value: '30 to 50%', text: 'The typical reduction in machine downtime from predictive maintenance, with a 20 to 40 percent increase in machine life, according to McKinsey.', source: 'Source: McKinsey & Company, Manufacturing: Analytics unleashes productivity and profitability, July 2017' },
  { t: 'h3', text: 'Benefits beyond avoiding breakdowns' },
  { t: 'cards', cols: 3, items: [
    { h: 'Right-timed intervention', p: 'Parts get serviced when needed: not too early, wasting good life, and not too late, causing unplanned failure.' },
    { h: 'Fewer emergency repairs', p: 'Less collateral stress on the adjacent components that get damaged when one part fails without warning.' },
    { h: 'Extended asset life', p: 'Often the most underrated line in the business case: more usable life from equipment you have already paid for, which matters for plants that can’t replace machinery on a short cycle.', hot: true },
  ] },

  { t: 'h2', id: 'stall', toc: 'Why predictive maintenance programmes stall', text: 'Why do predictive maintenance programmes stall?' },
  { t: 'answer', text: 'Predictive maintenance programmes stall for two main reasons: the data is not integrated, and the team does not believe AI can reduce downtime. The AI model itself is rarely the problem.' },
  { t: 'p', text: 'In our conversations with textile spinning mill operators, the barrier almost never turns out to be the AI model. It is what has to exist before the model can do anything useful.' },
  { t: 'h3', text: '1. The data is not integrated' },
  { t: 'p', text: 'Machine parameters, the machine manual and the maintenance history sit in different places. Raw data also means nothing without context for that machine’s use. Someone has to define what a pattern means for that machine, running that product, at that speed.' },
  { t: 'p', text: 'This often needs cooperation from the machinery manufacturer. Many machinery makers prefer to control that data themselves, because it lets them charge for analytics or service later. It is a commercial choice, not a technical limit. **This is a cooperation gap, not a technology gap.** It takes the shop floor, the machinery manufacturer and the AI partner working together. None can solve it alone.' },
  { t: 'h3', text: '2. The team does not yet believe it' },
  { t: 'p', text: 'If the team does not believe AI can reduce downtime, predictions go ignored and the programme dies quietly. McKinsey makes the same point from its own work: a failure prediction does little good until the maintenance process, technician deployment and spare parts are reworked to act on it.' },
  { t: 'p', text: 'The fix is execution against a number. Measure current downtime, set a target downtime, and run the programme on the gap between them. **Belief follows evidence.**' },

  { t: 'h2', id: 'industries', toc: 'Industries benefiting from predictive maintenance', text: 'Which industries benefit from predictive maintenance?' },
  { t: 'answer', text: 'Predictive maintenance pays back wherever the cost of downtime is high. We sort plants by how downtime hurts them, not by industry name. Three types stand out.' },
  { t: 'table', head: ['Production type', 'Examples', 'Why downtime hurts'], rows: [
    ['**Continuous flow**', 'Petroleum, steel, textile', 'No buffer. Every idle hour is lost output that cannot be recovered'],
    ['**Assembly lines**', 'Automobile', 'One station down blocks the entire line'],
    ['**Batch production on high machine-hour-rate machines**', 'Special-purpose machinery, die casting press shops, textile machines', 'The bottleneck machine sets the output of the whole week'],
  ] },

  { t: 'h2', id: 'use-cases', toc: 'Real manufacturing use cases', text: 'What are real manufacturing use cases for predictive maintenance?' },
  { t: 'h3', text: 'Documented cases' },
  { t: 'cards', cols: 2, items: [
    { tag: 'Oil producer · Offshore compressors', p: 'Platform compressors kept failing, and each breakdown stopped production at a cost of $1 to $2 million a day. Engineers had struggled for years to find the cause. Analysing data from hundreds of sensors across 1,000 parameters, advanced analytics found that high pressure and high temperature, together with other factors, correlated with the breakdowns. The model predicted failures several weeks ahead. The failure itself could not be prevented, but pre-positioning people and repair equipment cut downtime from **14 days to six**.' },
    { tag: 'Train operator · Locomotive batteries', p: 'The operator predicted battery pack failures in its locomotives. The prediction did little good until the company reworked its maintenance procedures, technician deployment and spare-parts supply chain. The lesson applies to every plant: **the prediction is half the system. The response is the other half.**' },
  ] },
  { t: 'note', text: 'Source for both cases: McKinsey & Company, Manufacturing: Analytics unleashes productivity and profitability, July 2017.' },
  { t: 'h3', text: 'Illustrative scenarios: what this looks like on your floor' },
  { t: 'p', em: true, text: 'These two scenarios are illustrations of how the approach would work. They are not client results.' },
  { t: 'cards', cols: 2, items: [
    { h: 'A textile ring frame', p: 'Vibration and motor current drift slightly together on a ring frame. Neither crosses an alarm limit. The AI compares the pattern with the machine manual and past service history, and tells the supervisor which component to inspect before the next shift, not after a stoppage.' },
    { h: 'A die casting press', p: 'Hydraulic and process parameters on a press move away from their normal band. The AI flags the pattern, links it to the likely wear point in the manual, and schedules the check into a planned stop instead of an unplanned one.' },
  ] },
  { t: 'cta', h: 'How much does downtime cost you?', p: 'In a free half-day plant audit, we find your highest-downtime machine, show you the cost of an hour of lost output and identify the data you already hold. No fee, no commitment. At the end of it, you can say no. We confirm your audit date within one business day.', primary: { label: 'Book your free half-day plant audit', href: '/contact' }, secondary: { label: 'Chat on WhatsApp', href: 'https://wa.me/919600971045', external: true } },

  { t: 'h2', id: 'implementation', toc: 'Implementation costs and requirements', text: 'What are the implementation costs and requirements for AI predictive maintenance?' },
  { t: 'answer', text: 'AI predictive maintenance needs four things: machine data, a knowledge base, a mobile interface for decisions, and a first point of contact who wants to use AI. Cost depends on the number of machines, whether sensors must be added, how easily the data can be accessed and how clean your records are.' },
  { t: 'cards', cols: 3, items: [
    { h: 'Machine data', p: 'Parameters from sensors added to the machine, or pulled from its inbuilt dashboard where the machine maker allows access.' },
    { h: 'A knowledge base', p: 'The machine manual, past breakdown records and service history, so the AI can interpret the data and not just chart it.' },
    { h: 'A mobile interface', p: 'Decisions are needed on the go, so recommendations must reach the maintenance team where they work.' },
    { h: 'A baseline and a target', p: 'Current downtime and the downtime you want, so progress is measured.' },
    { h: 'The right first point of contact', p: 'Someone who actively wants to use AI, not someone who is passive about it.' },
  ] },
  { t: 'p', text: 'On hardware, we collaborate with sensor and IoT partners and with the machine maker for sensors and data access. StratAI builds the intelligence layer on top: a simple, scoped system with clear triggers, tied to the people who need to act on them. Not a black-box enterprise platform.' },
  { t: 'h3', text: 'How we engage' },
  { t: 'tiers', items: [
    { tag: 'Free', h: 'Half-day plant audit', p: 'A quick diagnosis. No fee, no commitment.', hot: true },
    { tag: 'From ₹1,50,000 + GST', h: 'AI Discovery', p: 'A one-month paid engagement to detail the problem and freeze the scope. Scope confirmed after conversation.' },
    { tag: 'Scoped', h: 'Monthly retainer', p: 'Fixed after Discovery, against a specific scope and KPIs, based on the complexity of the work and the resources it needs from our side.' },
  ] },
  { t: 'p', text: 'This builds on the Throughput work in our [Throughput Advantage System](/advantage-systems#tas), which turns machine data into throughput that is protected, not just monitored. See our [AI predictive maintenance solutions](/advantage-systems) for the full set of AI Advantage Systems, and our [AI consulting services for manufacturing](/services) for how we deliver them.' },

  { t: 'h2', id: 'rollout', toc: 'A 4-step rollout plan', text: 'What does a 4-step rollout of AI predictive maintenance look like?' },
  { t: 'rollout', cols: 4, items: [
    { tag: 'Step 1', h: 'Pick the machine with the highest downtime', p: 'Baseline its downtime and set a target. Name a first point of contact who wants to use AI.' },
    { tag: 'Step 2', h: 'Integrate the data and pilot', p: 'Connect machine data, the manual and maintenance history. Map the output to real-time decisions on a mobile interface.' },
    { tag: 'Step 3', h: 'Log everything', p: 'Record every decision, diagnosis, failure and corrective action. This is what moves the downtime number.' },
    { tag: 'Step 4', h: 'Extend', p: 'Measure current against target KPIs. Extend to a department, then to the entire plant.' },
  ] },
  { t: 'p', text: 'The first point of contact matters as much as the first machine. A person who proactively wants to use AI builds the proof that wins over the rest of the plant. A person who is passive about it stalls the programme before it starts. For the full picture of how we run engagements, see our [AI implementation roadmap](/blog/ai-implementation-manufacturing-cxo-guide).' },

  { t: 'h2', id: 'measure', toc: 'How to measure results', text: 'How do you measure the results of AI predictive maintenance?' },
  { t: 'answer', text: 'Measure results as measured downtime against target downtime, tracked in rupees. Set the baseline before the pilot starts.' },
  { t: 'ul', items: [
    'Unplanned downtime hours on the pilot machine, against the target',
    'Utilisation of the machine and of the people and material that depend on it',
    'Number of emergency repairs',
    'Parts replaced with life remaining',
    'Rupee value of output protected',
  ] },
  { t: 'h3', text: 'The 6-Month P&L Horizon' },
  { t: 'horizon', items: [
    { h: 'Months 1–3', p: 'Diagnosis, build, getting people aligned' },
    { h: 'Months 4–5', p: 'Adoption and early signals' },
    { h: 'Month 6 onward', p: 'Impact shows in the P&L' },
  ] },
  { t: 'p', text: 'Anyone promising visible results in weeks is selling a demo, not a system.' },
  { t: 'p', text: 'Predictive maintenance is one part of a larger system. The same closed-loop thinking applies on the quality side: see [how AI defect detection works in manufacturing](/blog/ai-defect-detection-quality-control-manufacturing-india), and the [AI use cases we have solved on the shop floor](/blog/ai-use-cases-for-manufacturing-companies-shop-floor).' },
]

export const FAQ_HEADING = 'FAQs: AI predictive maintenance in manufacturing'
export const FAQS = [
  { question: 'What is AI predictive maintenance in manufacturing?', answer: 'AI predictive maintenance is a maintenance approach where machine learning models analyse real-time and historical sensor data, such as vibration, temperature and current draw, to predict when a specific machine part is likely to fail. Instead of servicing on a fixed calendar or waiting for a breakdown, the plant acts when the machine’s actual condition says it is needed. The AI also interprets the data against the machine manual and tells the maintenance team what to do.' },
  { question: 'How does AI predict machine failure?', answer: 'It learns what normal looks like for a specific machine at its speed and product, then watches several readings together, such as vibration, temperature and current draw. When a combination drifts away from normal, even if no single reading crosses a limit, the model estimates the risk and timing of a failure, checks the pattern against the machine manual and breakdown history, and sends a specific action to the right person.' },
  { question: 'What is the difference between predictive and preventive maintenance?', answer: 'Preventive maintenance services a machine at a fixed interval, whatever its actual condition. Predictive maintenance services it when its actual parameters say it is needed, based on a model that learns the patterns that precede failure for that specific machine. Many plants running “predictive maintenance” today are still running preventive maintenance under a different name: they have automated the calendar, not the decision.' },
  { question: 'How much can AI predictive maintenance reduce downtime?', answer: 'McKinsey reports that predictive maintenance typically cuts machine downtime by 30 to 50 percent and extends machine life by 20 to 40 percent. Your result depends on your baseline, which is why we measure current downtime and set a target before the pilot starts.' },
  { question: 'What does AI predictive maintenance cost and what do we need to start?', answer: 'You need machine data, a knowledge base (the manual and breakdown history), a mobile interface for decisions, a downtime baseline and target, and a first point of contact who wants to use AI. With StratAI, the half-day plant audit is free, AI Discovery starts at ₹1,50,000 + GST, and a monthly retainer is fixed after Discovery. The barrier for mid-market plants is rarely the cost of the AI model itself; a scoped system built on the data you already have is achievable within mid-market budgets.' },
  { question: 'How long before AI predictive maintenance reduces downtime?', answer: 'We work to a 6-Month P&L Horizon: months 1 to 3 for diagnosis, build and alignment, months 4 and 5 for adoption and early signals, and from month 6 the impact shows in the P&L. If sensor data and machine context must be built up first, the timeline extends, but fewer emergency repairs and longer asset life still pay for the investment over time.' },
  { question: 'Do I need IoT sensors to implement AI predictive maintenance?', answer: 'Usually, yes: either sensors retrofitted onto the equipment, or data pulled from the machine’s own inbuilt dashboard, if the machinery manufacturer allows access to it. Sensors alone aren’t enough, though. The data needs to be contextualised against how that specific machine is used before an AI model can turn it into a reliable prediction.' },
  { question: 'Why do machinery manufacturers resist sharing machine data?', answer: 'Many machinery manufacturers want to retain control of data generated by their own equipment, since it allows them to charge for analytics or maintenance services later. This is a commercial decision, not a technical limitation, and it is one of the most common reasons AI predictive maintenance projects stall before they start.' },
]
