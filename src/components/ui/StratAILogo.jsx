'use client'
import { useEffect, useRef } from 'react'

/**
 * StratAI™ Animated Logo
 * Three bars (signal/growth icon) with orange→red gradient,
 * rising left-to-right like the actual logo.
 * animated: bars pulse/grow on mount
 * size: controls overall dimensions
 * dark: white text variant for dark backgrounds
 * showText: whether to show "STRATAI" wordmark next to bars
 * showTM: show trademark symbol
 */
export default function StratAILogo({
  size = 32,
  dark = false,
  animated = true,
  showText = true,
  showTM = true,
  className = '',
  style = {},
}) {
  const bar1Ref = useRef()
  const bar2Ref = useRef()
  const bar3Ref = useRef()

  useEffect(() => {
    if (!animated) return
    const bars = [bar1Ref.current, bar2Ref.current, bar3Ref.current]
    // Stagger bar entrance
    bars.forEach((bar, i) => {
      if (!bar) return
      bar.style.transformOrigin = 'bottom'
      bar.style.transform = 'scaleY(0)'
      bar.style.opacity = '0'
      setTimeout(() => {
        bar.style.transition = `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i*0.08}s, opacity 0.3s ease ${i*0.08}s`
        bar.style.transform = 'scaleY(1)'
        bar.style.opacity = '1'
      }, 100)
    })
  }, [animated])

  const barW  = size * 0.18
  const gap   = size * 0.08
  const totalW = barW * 3 + gap * 2
  const h1 = size * 0.38  // shortest bar
  const h2 = size * 0.62  // middle bar
  const h3 = size * 0.90  // tallest bar
  const svgH = h3 + 2
  const r = barW / 2       // pill radius

  const gradId = `sg-${Math.random().toString(36).slice(2,7)}`

  const textColor = dark ? '#fff' : '#1A1917'
  const subColor  = dark ? 'rgba(255,255,255,0.5)' : '#A09E99'

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3, ...style }}>
      {/* Bars SVG */}
      <svg
        width={totalW}
        height={svgH}
        viewBox={`0 0 ${totalW} ${svgH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FF3B30" />
            <stop offset="60%"  stopColor="#FF5500" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
        </defs>
        {/* Bar 1 — shortest, leftmost */}
        <rect
          ref={bar1Ref}
          x={0}
          y={svgH - h1}
          width={barW}
          height={h1}
          rx={r}
          fill={`url(#${gradId})`}
        />
        {/* Bar 2 — medium */}
        <rect
          ref={bar2Ref}
          x={barW + gap}
          y={svgH - h2}
          width={barW}
          height={h2}
          rx={r}
          fill={`url(#${gradId})`}
        />
        {/* Bar 3 — tallest, rightmost */}
        <rect
          ref={bar3Ref}
          x={(barW + gap) * 2}
          y={svgH - h3}
          width={barW}
          height={h3}
          rx={r}
          fill={`url(#${gradId})`}
        />
      </svg>

      {/* Wordmark */}
      {showText && (
        <div style={{ position: 'relative', lineHeight: 1 }}>
          <span className="logo-wordmark" style={{
            fontFamily: 'var(--font-display)',
            fontSize: `clamp(${size * 0.5}px, ${size * 0.6}px, ${size * 0.65}px)`,
            fontWeight: 700,
            letterSpacing: '-0.05em',
            color: textColor,
          }}>
            STRAT<span style={{ color: '#FF5500' }}>AI</span>
          </span>
          {showTM && (
            <sup style={{
              fontFamily: 'var(--font-mono)',
              fontSize: size * 0.16,
              color: subColor,
              position: 'absolute',
              top: size * 0.04,
              right: -(size * 0.18),
              lineHeight: 1,
            }}>™</sup>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Animated icon only — no text, just the 3 pulsing bars
 * Loops gently after entrance
 */
export function StratAIIcon({ size = 32, pulse = true, style = {} }) {
  const containerRef = useRef()

  useEffect(() => {
    if (!containerRef.current) return
    const bars = containerRef.current.querySelectorAll('rect')
    // Entrance
    bars.forEach((bar, i) => {
      bar.style.transformOrigin = '50% 100%'
      bar.style.transform = 'scaleY(0)'
      bar.style.opacity = '0'
      setTimeout(() => {
        bar.style.transition = `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i*0.09}s, opacity 0.3s ease ${i*0.09}s`
        bar.style.transform = 'scaleY(1)'
        bar.style.opacity = '1'
      }, 80)
    })
    // Pulse loop after entrance
    if (!pulse) return
    let frame = 0
    const interval = setInterval(() => {
      frame++
      bars.forEach((bar, i) => {
        const phase = (frame * 0.04 + i * 0.7)
        const scale = 0.88 + Math.sin(phase) * 0.12
        bar.style.transform = `scaleY(${scale})`
      })
    }, 40)
    return () => clearInterval(interval)
  }, [pulse])

  const barW = size * 0.18
  const gap  = size * 0.08
  const totalW = barW * 3 + gap * 2
  const h1 = size * 0.38
  const h2 = size * 0.62
  const h3 = size * 0.90
  const svgH = h3
  const r = barW / 2
  const gradId = `si-${size}-${Math.random().toString(36).slice(2,5)}`

  return (
    <svg
      ref={containerRef}
      width={totalW}
      height={svgH}
      viewBox={`0 0 ${totalW} ${svgH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible', ...style }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FF3B30" />
          <stop offset="60%"  stopColor="#FF5500" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      <rect x={0}              y={svgH-h1} width={barW} height={h1} rx={r} fill={`url(#${gradId})`} />
      <rect x={barW+gap}       y={svgH-h2} width={barW} height={h2} rx={r} fill={`url(#${gradId})`} />
      <rect x={(barW+gap)*2}   y={svgH-h3} width={barW} height={h3} rx={r} fill={`url(#${gradId})`} />
    </svg>
  )
}
