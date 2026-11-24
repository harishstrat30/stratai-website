// Small "dashboard" pictures shown on top of each AI Advantage System card.
// They are illustrative examples (the page says so), drawn in HTML/CSS, so they stay sharp and cost no image weight.

function Label({ left, right }) {
  return <div className="hm-pl"><span>{left}</span><span>{right}</span></div>
}

function QualityPanel() {
  return (
    <div className="hm-panel">
      <Label left="Vision QC · Line 2" right="Shift B" />
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '12px' }}>
        <div style={{ position: 'relative', background: '#1f2937', borderRadius: '8px', minHeight: '104px' }}>
          <span className="hm-pill hot" style={{ position: 'absolute', top: '8px', left: '8px' }}>Porosity · 94%</span>
          <svg viewBox="0 0 120 70" width="100%" height="100%" style={{ position: 'absolute', inset: 0, padding: '28px 14px 10px' }} aria-hidden="true">
            <rect x="8" y="14" width="104" height="42" rx="12" fill="#374151" />
            <circle cx="26" cy="35" r="9" fill="#111827" /><circle cx="94" cy="35" r="9" fill="#111827" />
            <rect x="46" y="22" width="26" height="22" fill="none" stroke="#FFB27A" strokeWidth="1.6" strokeDasharray="3 2" />
            <circle cx="59" cy="33" r="2" fill="#FFB27A" />
          </svg>
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)' }}>
          Inspected<b style={{ display: 'block', fontSize: '18px', color: '#fff', margin: '1px 0 8px' }}>1,248</b>
          Rejected<b style={{ display: 'block', fontSize: '18px', color: '#fca5a5', margin: '1px 0 8px' }}>31</b>
          Top cause<b style={{ display: 'block', fontSize: '12px', color: '#fff', marginTop: '1px' }}>Die temp high</b>
        </div>
      </div>
    </div>
  )
}

function ThroughputPanel() {
  return (
    <div className="hm-panel">
      <Label left="Machine health" right="Live" />
      <div style={{ background: '#1b1b1b', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', marginBottom: '6px' }}>
          <span>CNC-04 · bearing</span><span className="hm-pill hot">Fail risk ~6 days</span>
        </div>
        <svg viewBox="0 0 220 44" width="100%" height="44" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="20" x2="220" y2="20" stroke="rgba(255,255,255,.28)" strokeDasharray="3 3" />
          <polyline points="0,30 40,30 80,29 120,27 150,24 180,16 220,6" fill="none" stroke="#FFB27A" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="hm-row"><span>Press-02</span><span className="hm-pill ok">Healthy</span></div>
      <div className="hm-row"><span>Compressor-01</span><span className="hm-pill ok">Healthy</span></div>
    </div>
  )
}

function DeliveryPanel() {
  const rows = [['PO-2231', 'Due 24 Nov', 'At risk', 'risk'], ['PO-2235', 'Due 26 Nov', 'On track', 'ok'], ['PO-2240', 'Due 28 Nov', 'On track', 'ok']]
  return (
    <div className="hm-panel">
      <Label left="Order tracker" right="38 open" />
      <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>1 order at risk this week</div>
      {rows.map(([po, due, st, cls]) => (
        <div className="hm-row" key={po}>
          <b style={{ fontSize: '11px' }}>{po}</b><span style={{ color: 'rgba(255,255,255,.7)', fontSize: '11px' }}>{due}</span><span className={'hm-pill ' + cls}>{st}</span>
        </div>
      ))}
    </div>
  )
}

function ProcurementPanel() {
  const v = [['Vendor A', '₹262', 92, false], ['Vendor B', '₹255', 85, false], ['Vendor C · on-time 98%', '₹249', 78, true]]
  return (
    <div className="hm-panel">
      <Label left="Cotton yarn 30s · ₹/kg" right="Today" />
      {v.map(([n, p, w, best]) => (
        <div key={n}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: best ? 700 : 400 }}><span>{n}</span><span>{p}</span></div>
          <div className="hm-bar"><i className={best ? 'best' : ''} style={{ width: w + '%' }} /></div>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px', fontSize: '10px', color: 'rgba(255,255,255,.6)' }}>
        <span className="hm-pill hot">Recommended: Vendor C</span><span>Buy before 25 Nov</span>
      </div>
    </div>
  )
}

function RevenuePanel() {
  const rows = [['Export buyer · Germany', 'Email · 5,000 pcs', 'Hot · 86', 'hot'], ['Distributor · Pune', 'WhatsApp · repeat order', 'Warm · 64', 'warm'], ['New lead · Chennai', 'Zoho CRM · price check', 'Cool · 31', 'cool']]
  return (
    <div className="hm-panel">
      <Label left="Enquiry inbox" right="Today · 14" />
      {rows.map(([n, s, tag, cls]) => (
        <div className="hm-row" key={n}>
          <span style={{ fontSize: '11px', fontWeight: 600 }}>{n}<small>{s}</small></span><span className={'hm-pill ' + cls}>{tag}</span>
        </div>
      ))}
    </div>
  )
}

const PANELS = { quality: QualityPanel, throughput: ThroughputPanel, delivery: DeliveryPanel, procurement: ProcurementPanel, revenue: RevenuePanel }

export default function SystemPanel({ k }) {
  const P = PANELS[k]
  return P ? <div aria-hidden="true"><P /></div> : null
}
