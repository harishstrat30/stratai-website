import Link from 'next/link'

export const metadata = {
  title: { absolute: 'Claude AI Implementation for Organisations — Enterprise & Team Deployments | StratAI™' },
  description: 'Claude AI implementation for organisations that want AI embedded into how work actually gets done — not just available to use. Custom agents, shared project libraries, automated pipelines.',
  alternates: { canonical: 'https://stratai.io/claude-implementation' },
}

const BENEFITS = [
  {
    num: '01',
    title: 'AI Built Into Workflows',
    desc: 'Claude embedded into actual work — not available as a chat tab. Custom agents, project libraries, and automated pipelines that become part of how your team operates every day.',
  },
  {
    num: '02',
    title: 'Measurable Productivity Gains',
    desc: 'We define the target before we start: time saved per task, output quality improvement, hours recovered per week. Then we track against it. Productivity gains that show in your team\'s output — not your PowerPoint.',
  },
  {
    num: '03',
    title: 'Implementation With Change Management',
    desc: 'AI that people don\'t adopt is AI that doesn\'t work. We embed Claude with the change management needed to make adoption real — not assumed. Behavioural change, not just technical deployment.',
  },
  {
    num: '04',
    title: 'No Vendor Lock-In',
    desc: 'Your team owns what we build. The prompts, the agents, the project libraries — everything is documented, transferable, and yours. We build for independence, not dependency.',
  },
  {
    num: '05',
    title: 'Practitioner Advantage',
    desc: 'We implement Claude across 12+ organisations right now. You benefit from the patterns, failures, and optimisations we encounter across all of them — compressed into your implementation.',
  },
  {
    num: '06',
    title: 'Official Partnership Access',
    desc: 'As an official Anthropic Claude Partner, we have access to partner-tier resources, guidance, and roadmap visibility that independent implementors do not. Your implementation benefits from this directly.',
  },
]

const LEVELS = [
  {
    level: 'LEVEL 01 · INDIVIDUAL',
    title: 'Personal AI Advantage',
    desc: 'For individual contributors and leaders who want Claude deeply embedded in how they work — not just as a search assistant.',
    points: [
      'Personal prompt libraries built around your actual deliverables',
      'Custom Claude Projects with persistent instructions for recurring workflows',
      'Role-specific agent configurations for research, writing, analysis',
      'MCP connectors wired to your tools — Drive, Notion, Sheets, Slack',
    ],
  },
  {
    level: 'LEVEL 02 · DEPARTMENT',
    title: 'Team-Level Workflow Infrastructure',
    desc: 'For teams that want shared AI infrastructure — standardised outputs, collaborative Claude Projects, and embedded review workflows.',
    points: [
      'Shared Claude Projects with team-wide instructions and knowledge bases',
      'Standardised prompt templates for common team outputs',
      'AI-assisted review and quality control for team deliverables',
      'Onboarding and adoption programme for all team members',
    ],
    active: true,
  },
  {
    level: 'LEVEL 03 · ORGANISATION',
    title: 'Organisation-Wide AI Infrastructure',
    desc: 'For organisations embedding Claude as a permanent operational layer — custom agents, automated pipelines, and measurable productivity at scale.',
    points: [
      'Custom Claude agents for specific business functions and workflows',
      'Automated pipelines: brief → draft → review → publish',
      'Claude connected to your ERP, CRM, or operational databases',
      'Governance framework: usage policy, risk guardrails, audit trail',
    ],
  },
]

const WHAT_WE_BUILD = [
  {
    icon: '👑',
    title: 'Custom Claude Agents',
    desc: 'Role-specific agents with defined personas, knowledge bases, and output formats — built for your team\'s real workflows.',
  },
  {
    icon: '📚',
    title: 'Shared Project Libraries',
    desc: 'Persistent Claude Projects with team-wide instructions, document libraries, and standardised prompt templates — usable from Day 1.',
  },
  {
    icon: '⚡',
    title: 'Automated Pipelines',
    desc: 'End-to-end workflows that run without manual prompting — brief to draft, data to summary, trigger to action.',
  },
  {
    icon: '🔗',
    title: 'Tool & System Integrations',
    desc: 'Claude connected to your live data — Google Drive, Notion, Slack, Sheets, CRM, and more via MCP connectors.',
  },
]

export default function ClaudeImplementationPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Announcement bar ── */}
      <div style={{ background: 'var(--bg-dark)', borderBottom: '1px solid #1f1f1e', padding: '10px clamp(16px,4vw,24px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '9999px', border: '1px solid rgba(255,85,0,0.45)', background: 'rgba(255,85,0,0.10)' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#FF5500"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.12em', fontWeight: 700 }}>OFFICIAL ANTHROPIC CLAUDE PARTNER NETWORK MEMBER</span>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em' }}>INDUSTRY-AGNOSTIC · ALL ORGANISATIONS · ALL SIZES</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(56px,7vw,96px) clamp(16px,4vw,24px) clamp(48px,6vw,72px)', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '20px' }}>Claude AI Implementation — Enterprise &amp; Team Deployments</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,84px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--text)', marginBottom: '28px', maxWidth: '860px' }}>
            Claude isn't just a chat tool. In the right hands, it becomes{' '}
            <span style={{ color: 'var(--orange)' }}>infrastructure.</span>
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--text2)', maxWidth: '560px', lineHeight: '1.7', marginBottom: '14px' }}>
            Claude AI implementation for organisations that want AI embedded into how work actually gets done — not just available to use.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text3)', maxWidth: '560px', lineHeight: '1.7', marginBottom: '36px' }}>
            Custom Claude agents. Shared project libraries. Automated pipelines. Knowledge systems. AI review workflows. Built and embedded by practitioners who run Claude across 12+ organisations today.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ padding: '12px 28px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
              → Talk to Us About Implementation
            </Link>
            <Link href="/claude-training" style={{ padding: '12px 24px', borderRadius: '9999px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text2)', textDecoration: 'none' }}>
              Explore Claude Training First →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Key Benefits (dark) ── */}
      <div style={{ background: 'var(--bg-dark)', borderBottom: '1px solid #1f1f1e', position: 'relative', overflow: 'hidden' }}>
        <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.10 }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>CLAUDE IMPLEMENTATION — KEY BENEFITS</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#fff', marginBottom: '48px', lineHeight: 1.05 }}>
            What Claude implementation actually means{' '}
            <span style={{ color: 'var(--orange)' }}>for your organisation.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: '#1f1f1e', border: '1px solid #1f1f1e', borderRadius: 'var(--r)', overflow: 'hidden' }} className="about-3-grid">
            {BENEFITS.map((b) => (
              <div key={b.num} style={{ background: 'rgba(255,255,255,0.03)', padding: 'clamp(24px,4vw,36px)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '14px' }}>{b.num}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,2vw,19px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#fff', marginBottom: '10px', lineHeight: 1.3 }}>{b.title}</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7', margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Implementation Levels ── */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>IMPLEMENTATION LEVELS</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '10px', lineHeight: 1.05 }}>
            We meet you where you are.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text2)', marginBottom: '40px', lineHeight: 1.6, maxWidth: '640px' }}>
            Implementation scaled to your current readiness — from individual power users to full organisational AI infrastructure.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden' }} className="about-3-grid">
            {LEVELS.map((lv) => (
              <div key={lv.level} style={{ background: 'var(--bg)', padding: 'clamp(24px,4vw,36px)', borderTop: lv.active ? '3px solid var(--orange)' : '3px solid transparent', position: 'relative' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: lv.active ? 'var(--orange)' : 'var(--text3)', letterSpacing: '0.1em', marginBottom: '14px' }}>{lv.level}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,2vw,20px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '10px', lineHeight: 1.2 }}>{lv.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.7', marginBottom: '18px' }}>{lv.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {lv.points.map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--orange)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: '11px', marginTop: '2px' }}>→</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', lineHeight: '1.6' }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── What We Build ── */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(16px,4vw,24px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '16px' }}>WHAT WE BUILD</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '40px', lineHeight: 1.05 }}>
            The Claude infrastructure your organisation will actually use.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden' }} className="about-3-grid">
            {WHAT_WE_BUILD.map((item, i) => (
              <div key={i} style={{ background: 'var(--bg)', padding: 'clamp(24px,4vw,36px)' }}>
                <div style={{ fontSize: '24px', marginBottom: '14px' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,2vw,18px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '10px', lineHeight: 1.2 }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text3)', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Partner badge section ── */}
      <div style={{ padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,24px)', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '7px 18px', borderRadius: '9999px', border: '1px solid rgba(255,85,0,0.45)', background: 'rgba(255,85,0,0.08)', marginBottom: '28px' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#FF5500"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.12em', fontWeight: 700 }}>OFFICIAL ANTHROPIC CLAUDE PARTNER NETWORK — SELECT TIER</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: '20px', lineHeight: 1.05 }}>
            StratAI is one of the first Claude Partners in India.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '36px' }}>
            Anthropic launched the Claude Partner Network in March 2026, selecting approximately 100 global firms — including Accenture, Cognizant, and Deloitte. StratAI is among that first cohort, and one of the first Registered Partners in India focused exclusively on manufacturing AI and mid-market implementation.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', marginBottom: '32px' }}>
            {[
              { val: '10+', label: 'CERTIFIED PRACTITIONERS' },
              { val: '12+', label: 'AI USE CASES IN PRODUCTION' },
              { val: '90%+', label: 'CLIENT RETENTION RATE' },
            ].map((s, i) => (
              <div key={i} style={{ padding: 'clamp(20px,3vw,32px)', background: 'var(--bg)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--orange)', marginBottom: '6px' }}>{s.val}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text3)' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <Link href="/claude-partner" style={{ display: 'inline-flex', padding: '11px 28px', borderRadius: '9999px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text2)', textDecoration: 'none' }}>
            View Full Partner Profile →
          </Link>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: 'var(--bg-dark)', padding: 'clamp(64px,8vw,100px) clamp(16px,4vw,24px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.10 }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.1em', marginBottom: '20px' }}>START THE CONVERSATION</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,60px)', fontWeight: 600, letterSpacing: '-0.04em', color: '#fff', marginBottom: '0', lineHeight: 1.05 }}>
            Stop using Claude like a search box.
          </h2>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,60px)', fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--orange)', marginBottom: '24px', lineHeight: 1.05 }}>
            Start using it like infrastructure.
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '36px', lineHeight: 1.75, maxWidth: '500px', margin: '0 auto 36px' }}>
            Whether you want to start with training or move directly to implementation — we begin with a conversation, not a pitch deck.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ padding: '13px 28px', borderRadius: '9999px', background: 'var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', textDecoration: 'none' }}>
              → Talk to Us
            </Link>
            <Link href="/claude-training" style={{ padding: '13px 24px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.06)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
              Explore Claude Training →
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
