// Pure scoring helpers for the 5-Layer Domain Test. Scores are 0-10 per layer, 5 layers, so 0-50 in total.
// Nothing here talks to a server: the verdict is rule-based (see RULES in content.js).
import { LAYERS } from './content'

export const STRONG_TOTAL = 40
export const STRONG_MIN = 6
export const INSUFFICIENT_TOTAL = 25
export const LOW_SCORE = 3
export const LOW_COUNT = 2

export function verdictFor(scores) {
  const total = scores.reduce((a, b) => a + b, 0)
  const min = Math.min(...scores)
  const low = scores.filter(s => s <= LOW_SCORE).length
  if (total >= STRONG_TOTAL && min >= STRONG_MIN) return 'strong'
  if (total < INSUFFICIENT_TOTAL || low >= LOW_COUNT) return 'insufficient'
  return 'probe'
}

// The two lowest layers (ties go to the earlier layer).
export function weakestLayers(scores, n = 2) {
  return scores.map((s, i) => [s, i]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).slice(0, n).map(x => x[1])
}

// A follow-up question per weak layer. A very low score asks the foundational question, a middling one the deeper probe.
export function followUps(scores) {
  return weakestLayers(scores, 2).map(i => ({
    layer: i,
    question: LAYERS[i].probes[scores[i] <= 4 ? 0 : 1],
  }))
}

// vendors: [{ id, name, scores: number[5] }] (every score filled in). Returns them ranked, best first.
export function rankVendors(vendors) {
  return vendors
    .map(v => {
      const total = v.scores.reduce((a, b) => a + b, 0)
      return { ...v, total, min: Math.min(...v.scores), verdict: verdictFor(v.scores), weakest: weakestLayers(v.scores), followUps: followUps(v.scores) }
    })
    .sort((a, b) => b.total - a.total || b.min - a.min || String(a.name).localeCompare(String(b.name)))
    .map((v, i) => ({ ...v, rank: i + 1 }))
}

// The layer with the lowest average across the vendors being compared (ties go to the earlier layer).
export function biggestRisk(vendors) {
  const avgs = LAYERS.map((_, i) => vendors.reduce((a, v) => a + v.scores[i], 0) / vendors.length)
  let worst = 0
  avgs.forEach((a, i) => { if (a < avgs[worst]) worst = i })
  return { layer: worst, average: avgs[worst], averages: avgs }
}
