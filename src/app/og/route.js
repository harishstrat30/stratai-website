import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const dynamic = 'force-static'

const ORANGE = '#F98903'
const INK = '#14130F'

export async function GET() {
  const dir = path.join(process.cwd(), 'src/app/og/fonts')
  const [logo, chakra, plexMono] = await Promise.all([
    readFile(path.join(process.cwd(), 'public/stratai-logo-full.png')),
    readFile(path.join(dir, 'ChakraPetch-Bold.ttf')),
    readFile(path.join(dir, 'IBMPlexMono-Medium.ttf')),
  ])
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#FBF9F5' }}>
        <div style={{ width: '22px', height: '100%', background: ORANGE }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '70px 84px 64px' }}>
          <img src={logoSrc} width={400} height={102} style={{ marginLeft: '-14px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '34px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Chakra Petch', fontSize: '62px', lineHeight: 1.08, letterSpacing: '0.5px', color: INK }}>
              <span>WE HELP MANUFACTURING</span>
              <span style={{ display: 'flex' }}>COMPANIES BUILD<span style={{ color: ORANGE, marginLeft: '0.3em' }}>COMPETITIVE</span></span>
              <span style={{ display: 'flex' }}><span style={{ color: ORANGE, marginRight: '0.15em' }}>ADVANTAGE</span>WITH AI.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'IBM Plex Mono', fontSize: '28px', color: INK }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '7px', background: ORANGE }} />
              www.stratai.io
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Chakra Petch', data: chakra, weight: 700, style: 'normal' },
        { name: 'IBM Plex Mono', data: plexMono, weight: 500, style: 'normal' },
      ],
    }
  )
}
