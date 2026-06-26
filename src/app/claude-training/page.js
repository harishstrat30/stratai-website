import Link from 'next/link'
import TrainingSyllabus from '@/components/sections/TrainingSyllabus'

export const metadata = {
  title: { absolute: 'Claude AI Training for Corporate Teams — India | StratAI™' },
  description: 'Instructor-led Claude AI training for teams across any industry in India. Six modules, principles-first, practice throughout. Minimum 20% productivity gain guaranteed.',
  alternates: { canonical: 'https://stratai.io/claude-training' },
}

const MODULES = [
  {
    tab: 'FOUNDATION',
    duration: '~60 MIN · ALL INDUSTRIES',
    title: '15 Principles of Effective AI Use',
    desc: 'Before tools, mindset. These principles form the backbone of the programme — the mental model that makes everything else stick.',
    points: [
      { num: '01', title: "Don't prompt AI — let AI prompt you", sub: 'Conversation leads to insight.' },
      { num: '02', title: 'Iterate', sub: 'No output is final. Refinement is the workflow.' },
      { num: '03', title: 'Make Quality Objective', sub: 'Define good before you start.' },
      { num: '04–15', title: '+ 12 more principles', sub: 'Compute leverage, creativity, execution.' },
    ],
    outcome: 'A mental model for AI use that applies to every task, every day — regardless of industry or function. This is the layer that makes the rest of the training stick.',
  },
  {
    tab: 'MODULE 1',
    duration: '~20 MIN',
    title: 'Claude Interface Orientation',
    desc: 'Getting your team oriented in Claude — fast. What to use, when, and why.',
    points: [
      { title: 'Chat vs Projects vs Cowork vs Claude Code — when to use which' },
      { title: 'Model selection: Sonnet vs Haiku vs Opus' },
      { title: 'Context windows, memory, session boundaries' },
      { title: 'Setting up personal and shared project workspaces' },
    ],
    outcome: 'Confident navigation of Claude across all modes. No more fumbling with settings or picking the wrong model.',
  },
  {
    tab: 'MODULE 2',
    duration: '~40 MIN',
    title: 'Projects & Knowledge Management',
    desc: 'How to make Claude remember what matters — and reuse it across your team.',
    points: [
      { title: 'Creating Projects with persistent instructions — set once, reuse forever' },
      { title: 'Uploading documents and data as project knowledge' },
      { title: 'Prompt patterns for consistent output at scale' },
      { title: 'Hallucination risks in knowledge retrieval — detect and mitigate' },
    ],
    outcome: 'Shared Claude Projects your team uses daily — with persistent instructions that eliminate repetitive setup.',
  },
  {
    tab: 'MODULE 3',
    duration: '~35 MIN',
    title: 'Hallucination Management & Accuracy',
    desc: "Why Claude gets things wrong — and exactly how to stop it happening in your team's work.",
    points: [
      { title: 'Why LLMs hallucinate — the mechanics, not just the risk' },
      { title: 'Grounding Claude in your data with source-referencing prompts' },
      { title: 'System prompts and boundary instructions for faithful outputs' },
      { title: 'Red flags checklist — what to always verify before sending' },
    ],
    outcome: 'A practical checklist and prompt patterns that reduce hallucination risk across every deliverable.',
  },
  {
    tab: 'MODULE 4',
    duration: '~50 MIN',
    title: 'Data Analysis & Claude Code',
    desc: 'Turn business questions into data answers — without writing a single line of code.',
    points: [
      { title: 'Natural language → code: queries from business questions' },
      { title: 'Upload data files and ask analytical questions without coding' },
      { title: 'Connecting Claude to live data via Google Sheets and databases' },
      { title: 'Interpreting outputs: summaries, trends, index values' },
    ],
    outcome: 'The ability to analyse data files and answer business questions in minutes — without needing an analyst.',
  },
  {
    tab: 'MODULE 5',
    duration: '~55 MIN',
    title: 'MCP Servers, Plugins & Connectors',
    desc: 'How Claude connects to the tools your team already uses — pulling live data in real time.',
    points: [
      { title: 'What MCP is — how Claude connects to external tools and data sources' },
      { title: 'Key connectors: Google Drive, Sheets, Notion, Slack, web search' },
      { title: 'Live demo: Claude pulling live data and surfacing trends' },
      { title: 'Security and access control — what to share, what not to connect' },
    ],
    outcome: 'A connected Claude that talks to your existing tools — reducing context-switching and becoming part of your workflow.',
  },
  {
    tab: 'MODULE 6',
    duration: '~50 MIN',
    title: 'Cowork Agents & Scheduled Tasks',
    desc: 'Beyond chat — Claude workflows that run automatically and deliver outputs without manual prompting.',
    points: [
      { title: 'Introduction to Cowork — multi-step agentic tasks beyond chat' },
      { title: 'Building synthesis agents: brief → themes → deliverable draft' },
      { title: 'Scheduled tasks: weekly summaries, auto-digests, alerts' },
      { title: 'Guardrails: when to supervise vs when to let it run' },
    ],
    outcome: 'At least one automated Claude workflow running for your team — generating outputs on a schedule without manual prompting.',
  },
  {
    tab: 'YOUR INDUSTRY MODULE',
    badge: 'BUILT FOR YOUR INDUSTRY · ANY SECTOR',
    title: 'The Last Module Is Yours.',
    desc: "Built entirely around your industry, your team's actual deliverables, and your real workflows. This is what makes StratAI training different from every other programme.",
    points: [
      { title: 'Organisation-level: standardised templates, shared project workspaces' },
      { title: 'Department-level: use-case mapping to your actual output types' },
      { title: 'Individual-level: role-specific prompt patterns for the next morning' },
    ],
    outcome: "Ready-to-use Claude workflows for your specific industry. Your team doesn't need to figure out the application — we've already mapped it.",
    cta: true,
  },
]

const FAQS = [
  {
    q: 'What productivity gain can we realistically expect?',
    a: 'A minimum 20% improvement in daily productivity — with rigorous application of the trained principles. StratAI\'s own consulting teams consistently see 40% and above. These gains are not one-time; they compound daily across every trained employee. The training pays back many times over in the first month alone.',
  },
  {
    q: 'Is this training relevant for our industry?',
    a: 'Yes. Claude training is industry-agnostic. The core modules apply across manufacturing, consulting, research, retail, healthcare, and services. The final module is customised entirely to your industry and your team\'s actual workflows.',
  },
  {
    q: 'How is this different from a generic AI training course?',
    a: 'StratAI is an official Anthropic Claude Implementation Partner — not a generic training provider. We deploy Claude across 12+ organisations today. The training is built from what we actually implement, troubleshoot, and improve in production. The final module is customised to your industry — your team leaves with workflows they can use the next morning.',
  },
  {
    q: 'Does our team need any technical background?',
    a: 'No. The programme is designed for professionals across all functions — research, strategy, operations, sales, and management. It has been delivered successfully to teams with zero prior AI experience.',
  },
  {
    q: 'What do participants need to attend?',
    a: 'Each participant needs a Claude paid account. Full setup guidance is provided before the programme begins. If budget is a constraint, one account can be shared across a small group during the session.',
  },
  {
    q: 'Can this be delivered in person?',
    a: 'Yes. Default format is online, live, instructor-led. In-person delivery is available — trainer travel and accommodation at actuals, additional to the training fee.',
  },
  {
    q: 'What happens after training?',
    a: "The training is a standalone programme. Teams wanting AI advantage at department or organisation level — embedded workflows, custom agents, and systematic productivity gains — can explore StratAI's Claude Implementation service.",
  },
]

export default function ClaudeTrainingPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(56px,7vw,96px) clamp(16px,4vw,24px) clamp(48px,6vw,72px)', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '20px' }}>Claude AI Training for Corporate Teams — India</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,84px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--text)', marginBottom: '24px', maxWidth: '860px' }}>
            The highest-ROI learning initiative your organisation can run{' '}
            <span style={{ color: 'var(--orange)' }}>right now.</span>
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text2)', maxWidth: '560px', lineHeight: '1.7', marginBottom: '12px' }}>
            Instructor-led Claude AI training for teams across any industry in India — built on what we actually implement across 12+ companies. Not a generic course. A programme designed to change how your team works, starting Day 1.
          </p>
          <p style={{ fontSize: '15px', color: 'var(--text)', fontWeight: 600, marginBottom: '32px' }}>
            Minimum guaranteed productivity improvement: 20%.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ padding: '12px 28px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
              Get Training for Your Team →
            </Link>
            <a href="#syllabus" style={{ padding: '12px 24px', borderRadius: '9999px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text2)', textDecoration: 'none' }}>
              View Syllabus →
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'var(--border)' }} className="about-3-grid">
          {[
            { val: '20%+', label: 'MINIMUM PRODUCTIVITY GAIN', sub: 'Guaranteed with rigorous application' },
            { val: '40%+', label: 'GAINS IN STRATAI TEAMS', sub: 'These gains compound daily' },
            { val: '3–5×', label: 'FASTER FIRST DRAFTS', sub: 'Reports, decks, analysis — any function' },
            { val: 'Day 1', label: 'READY TO APPLY', sub: 'Every module maps to real workflows' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--bg)', padding: 'clamp(20px,3vw,36px) clamp(16px,3vw,28px)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--orange)', marginBottom: '8px' }}>
                {s.val}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: '4px' }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── The Difference ── */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>The Difference</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '40px', lineHeight: 1.05 }}>
            Most AI training ends at the slide deck.<br />We begin there.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)' }} className="contrast-grid">
            {/* Left — Generic */}
            <div style={{ background: 'var(--bg2)', padding: 'clamp(24px,4vw,40px)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: '20px' }}>GENERIC AI TRAINING</div>
              {['Generic concepts, not your workflows','Measured in hours delivered','Trainers who teach tools they don\'t implement','Productivity gains left to chance after the session','No change management — adoption assumed'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--text3)', flexShrink: 0, marginTop: '2px' }}>✕</span>
                  <span style={{ fontSize: '14px', color: 'var(--text3)', lineHeight: '1.6' }}>{item}</span>
                </div>
              ))}
            </div>
            {/* Right — StratAI */}
            <div style={{ background: 'var(--bg)', padding: 'clamp(24px,4vw,40px)', borderLeft: '3px solid var(--orange)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: '20px' }}>STRATAI CLAUDE TRAINING</div>
              {['Final module customised to your industry and use cases','Measured in productivity gains — minimum 20%','Implementors who train, not trainers who talk','15 principles that make adoption stick from Day 1','Practice-based self-learning approach built in'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--ok)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                  <span style={{ fontSize: '14px', color: 'var(--text)', lineHeight: '1.6', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Syllabus (tabbed — client component) ── */}
      <div id="syllabus" style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>Programme Syllabus</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '8px', lineHeight: 1.05 }}>
            Six modules. Principles first. Practice throughout.
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text2)', marginBottom: '36px' }}>
            Two live instructor-led sessions · 3.5 hours total · Industry-agnostic · Customised final module for your team.
          </p>
          <TrainingSyllabus modules={MODULES} />
        </div>
      </div>

      {/* ── Why StratAI ── */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>Why StratAI</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '40px', lineHeight: 1.05 }}>
            Implementors who train.<br />Not trainers who talk.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1px', background: 'var(--border)' }} className="why-grid">
            {[
              { num: '01', title: 'Business-First Approach', desc: 'Our founders come from business strategy and consulting. We design training the way a business thinks — outcomes, adoption, and ROI first.' },
              { num: '02', title: 'Principles Over Tools', desc: "Tools change. Principles don't. We teach the mental models that make you effective with any AI — today and three years from now." },
              { num: '03', title: 'Real-Life AI Practitioners', desc: 'We are active Claude implementors across 12+ companies. Everything we teach comes from live production — not slides, not theory.' },
              { num: '04', title: 'Practice-Based Self-Learning', desc: 'You leave with a structured approach to keep getting better on your own. Not dependent on us. Not waiting for the next training.' },
              { num: '05', title: 'Industry-Agnostic', desc: 'Manufacturing. Consulting. Research. Retail. Healthcare. The programme works across any sector — and the final module is always customised to yours.' },
            ].map((item, i) => (
              <div key={i} style={{ background: i === 0 ? 'var(--bg)' : 'var(--bg2)', padding: 'clamp(20px,3vw,32px)', borderTop: i === 0 ? '3px solid var(--orange)' : '3px solid transparent' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--orange)', marginBottom: '12px' }}>{item.num}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(14px,1.5vw,17px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '10px', lineHeight: 1.3 }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trainers ── */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>Your Trainers</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '8px', lineHeight: 1.05 }}>
            Two practitioners. Not two presenters.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text2)', marginBottom: '40px' }}>Every session delivered by the same people who implement Claude for clients today.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)' }} className="contrast-grid">
            {[
              {
                name: 'Palani',
                role: 'FOUNDER, STRATAI · STRATEGY & TRAINING LEAD',
                tags: ['MBA — IIM Bangalore', 'BE — PSG Tech', 'JCI Certified Trainer', 'Toastmasters International', 'Strategy Consultant'],
                desc: 'Brings strategic frameworks and business application thinking to AI adoption. Designs training with P&L impact in mind — not just tool familiarity. Has helped SMEs and mid-market firms apply AI to real business problems.',
                avatar: '/palani.jpeg',
              },
              {
                name: 'Harish',
                role: 'AI TECHNICAL ARCHITECT & CLAUDE EXPERT, STRATAI',
                tags: ['MS — Univ. of South Wales, UK', 'BE — PSG Tech', 'Claude Expert', 'AI Technical Architect'],
                desc: 'Leads all live demonstrations and real-world architecture sessions. Builds and deploys Claude systems for clients daily — every example in the training comes from live production implementations, not slides.',
                avatar: null,
              },
            ].map((t, i) => (
              <div key={i} style={{ background: 'var(--bg)', padding: 'clamp(24px,4vw,40px)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', marginBottom: '20px', background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {t.avatar
                    ? <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text)' }}>{t.name[0]}</span>
                  }
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '6px' }}>{t.name}</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '0.08em', marginBottom: '16px' }}>{t.role}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {t.tags.map((tag, j) => (
                    <span key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text2)', border: '1px solid var(--border)', borderRadius: '9999px', padding: '3px 10px' }}>{tag}</span>
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.7', margin: 0 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── How It Works ── */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>How It Works</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '8px', lineHeight: 1.05 }}>
            From first message to first day of productivity gains.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text2)', marginBottom: '48px' }}>A simple process. We handle the preparation — your team shows up ready to learn.</p>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', height: '1px', background: 'var(--border)', zIndex: 0 }} />
            {[
              { num: '01', title: 'Reach Out', sub: 'Share team size, industry, and goals', active: true },
              { num: '02', title: 'Brief Intake Call', sub: '15–20 min. We understand your workflows and goals.' },
              { num: '03', title: 'Customised Proposal', sub: 'Syllabus with your industry module + commercial terms.' },
              { num: '04', title: 'Confirm & Prepare', sub: 'Confirm dates and count. We handle all logistics.' },
              { num: '05', title: 'Live Training', sub: 'Two sessions. 3.5 hours. Working Claude habits.' },
            ].map((step, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: step.active ? 'var(--orange)' : 'var(--bg)', border: `1px solid ${step.active ? 'var(--orange)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: step.active ? '#fff' : 'var(--text3)', marginBottom: '12px' }}>{step.num}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600, color: step.active ? 'var(--orange)' : 'var(--text)', marginBottom: '6px' }}>{step.title}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', lineHeight: 1.5, maxWidth: '120px' }}>{step.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>Frequently Asked Questions</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '40px', lineHeight: 1.05 }}>
            What teams ask before booking.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
            {FAQS.map((faq, i) => (
              <details key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', cursor: 'pointer', listStyle: 'none', fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,2vw,18px)', fontWeight: 600, color: 'var(--text)' }}>
                  {faq.q}
                  <span style={{ color: 'var(--orange)', fontSize: '20px', flexShrink: 0, marginLeft: '16px' }}>+</span>
                </summary>
                <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.75', paddingBottom: '20px', maxWidth: '720px', margin: 0 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,24px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>THE NEXT STEP</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.1 }}>
            Your team could be 20% more productive by next week.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text2)', marginBottom: '32px', lineHeight: 1.7 }}>
            Reach out with your team size, industry, and goals. We'll send a customised proposal within 24 hours.
          </p>
          <Link href="/contact" style={{ padding: '14px 36px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
            Get Training for Your Team →
          </Link>
        </div>
      </div>

    </div>
  )
}
