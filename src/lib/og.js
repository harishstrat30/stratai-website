export const DEFAULT_OG_IMAGE = { url: '/og', width: 1200, height: 630, alt: 'StratAI™ — AI Advantage Systems for Manufacturing' }

export const ogImages = (customUrl) =>
  customUrl ? [{ url: customUrl, width: 1200, height: 630 }] : [DEFAULT_OG_IMAGE]
