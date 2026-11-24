import Link from 'next/link'

// Tiny inline markup for article strings: **bold** and [link text](href). No HTML is ever injected.
export function inline(text) {
  const out = []
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0, m, i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1] !== undefined) out.push(<strong key={i++}>{m[1]}</strong>)
    else if (m[3].startsWith('/')) out.push(<Link key={i++} href={m[3]}>{m[2]}</Link>)
    else out.push(<a key={i++} href={m[3]} target="_blank" rel="noopener noreferrer">{m[2]}</a>)
    last = re.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}
