import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0F0F0E', padding: '72px 80px', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '48px' }}>
            <div style={{ width: '12px', height: '20px', background: '#FF5500' }} />
            <div style={{ width: '12px', height: '34px', background: '#FF5500' }} />
            <div style={{ width: '12px', height: '48px', background: '#FF5500' }} />
          </div>
          <div style={{ fontSize: '44px', fontWeight: 700, letterSpacing: '-1px' }}>StratAI™</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '64px', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-2px' }}>AI Advantage Systems for Manufacturing</div>
          <div style={{ fontSize: '32px', color: '#FF5500' }}>If AI isn&apos;t in your P&amp;L, it isn&apos;t real.</div>
        </div>
        <div style={{ fontSize: '24px', color: 'rgba(255,255,255,0.55)', letterSpacing: '2px' }}>STRATAI.IO</div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
