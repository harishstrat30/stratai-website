import Link from 'next/link'
import { inline } from './inline'

// Renders the article blocks from a post data file (see posts/aiDefectDetection.js).
function Cell({ c }) {
  if (c && typeof c === 'object') {
    if (c.tone) return <span className={`bt-pill ${c.tone}`}>{c.text}</span>
    if (c.prefix) return <><span className="bad">{c.prefix}</span> <strong>{c.text}</strong></>
  }
  return <>{inline(String(c))}</>
}

function Block({ b }) {
  switch (b.t) {
    case 'h2': return <h2 id={b.id}>{b.text}</h2>
    case 'h3': return <h3>{b.text}</h3>
    case 'p': return <p className={b.strong ? 'bt-strong' : b.em ? 'bt-em' : undefined}>{inline(b.text)}</p>
    case 'note': return <p className="bt-note">{inline(b.text)}</p>
    case 'answer': return <div className="bt-answer">{inline(b.text)}</div>
    case 'stat': return (
      <div className="bt-stat"><b>{b.value}</b><div><p>{b.text}</p><small>{b.source}{b.sourceLink && <> <a href={b.sourceLink.href} target="_blank" rel="noopener noreferrer">{b.sourceLink.label}</a></>}</small></div></div>
    )
    case 'cards': return (
      <div className={'bt-cards' + (b.cols === 3 ? ' c3' : '')}>
        {b.items.map((i, k) => (
          <div className={'bt-card' + (i.hot ? ' hot' : '')} key={i.h || i.tag || k}>
            {i.tag && <span className="bt-tag">{i.tag}</span>}
            {i.h && <b>{i.h}</b>}
            <p>{inline(i.p)}</p>
          </div>
        ))}
      </div>
    )
    case 'table': return (
      <div className="bt-tablewrap">
        <table className="bt-table">
          <thead><tr>{b.head.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
          <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><Cell c={c} /></td>)}</tr>)}</tbody>
        </table>
      </div>
    )
    case 'callout': return (
      <aside className="bt-callout"><b>{b.label}</b><p>{inline(b.text)}</p>{b.source && <small>{b.source}{b.sourceLink && <> <a href={b.sourceLink.href} target="_blank" rel="noopener noreferrer">{b.sourceLink.label}</a></>}</small>}</aside>
    )
    case 'ul': return <ul>{b.items.map(i => <li key={i}>{inline(i)}</li>)}</ul>
    case 'loop': return (
      <div className="bt-loop">{b.items.map((s, i) => (
        <div className={'bt-step' + (i === b.items.length - 1 ? ' last' : '')} key={s.h}><i>{i + 1}</i><b>{s.h}</b><p>{s.p}</p></div>
      ))}</div>
    )
    case 'image': return (
      <figure className="bt-fig"><img src={b.src} alt={b.alt} loading="lazy" decoding="async" />{b.caption && <figcaption>{b.caption}</figcaption>}</figure>
    )
    case 'tiers': return (
      <div className="bt-tiers">{b.items.map(t => <div className={'bt-tier' + (t.hot ? ' hot' : '')} key={t.h}><span>{t.tag}</span><b>{t.h}</b><p>{t.p}</p></div>)}</div>
    )
    case 'rollout': return (
      <div className={'bt-roll' + (b.cols === 4 ? ' c4' : '')}>{b.items.map(s => <div className={'bt-rstep' + (s.wide ? ' wide' : '')} key={s.h}><span>{s.tag}</span><b>{s.h}</b><p>{s.p}</p></div>)}</div>
    )
    case 'cta': return (
      <div className="bt-cta">
        <div><h3>{b.h}</h3><p>{b.p}</p></div>
        <div className="bt-btns">
          <Link href={b.primary.href} className="bt-btn bt-btn-primary">{b.primary.label}</Link>
          {b.secondary.external
            ? <a href={b.secondary.href} className="bt-btn bt-btn-light" target="_blank" rel="noopener noreferrer">{b.secondary.label}</a>
            : <Link href={b.secondary.href} className="bt-btn bt-btn-light">{b.secondary.label}</Link>}
        </div>
      </div>
    )
    case 'horizon': return (
      <div className="bt-horizon">{b.items.map(i => <div key={i.h}><b>{i.h}</b>{i.p}</div>)}</div>
    )
    default: return null
  }
}

export default function ArticleBody({ blocks }) {
  return <>{blocks.map((b, i) => <Block b={b} key={i} />)}</>
}
