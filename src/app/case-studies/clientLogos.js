// Client logos shown next to each client review. Files live in /public/client-logos.
// `match` is tested against the testimonial's company name, so a new review picks up its
// logo automatically. Precot, Aishwaryam Oils, B-ARM, Step8Up and Compass Tex have no
// review in the CMS yet; their logos are here for when one is added.
export const CLIENT_LOGOS = [
  { match: /techno\s*tackle/i, src: '/client-logos/techno-tackle.webp', alt: 'Techno Tackle Software Solutions', w: 407, h: 121 },
  { match: /kovai|pazham/i, src: '/client-logos/kovai-pazhamudhir-nilayam.webp', alt: 'Kovai Pazhamudhir Nilayam', w: 190, h: 189 },
  { match: /symphony/i, src: '/client-logos/symphony.webp', alt: 'Symphony Space Crafted', w: 217, h: 189 },
  { match: /lakshmi\s*krishna/i, src: '/client-logos/lakshmi-krishna.webp', alt: 'Lakshmi Krishna Naturals', w: 307, h: 152 },
  { match: /precot/i, src: '/client-logos/precot.webp', alt: 'Precot', w: 349, h: 144 },
  { match: /aishwar/i, src: '/client-logos/aishwaryam-oils.webp', alt: 'Aishwaryam Oils', w: 188, h: 187 },
  { match: /b[-\s]?arm/i, src: '/client-logos/b-arm.webp', alt: 'B-ARM Technologies', w: 336, h: 120 },
  { match: /step\s*8\s*up/i, src: '/client-logos/step8up.webp', alt: 'Step8Up', w: 334, h: 155 },
  { match: /compass\s*tex/i, src: '/client-logos/compass-tex.webp', alt: 'Compass Tex', w: 373, h: 56 },
]

export function logoFor(company) {
  if (!company) return null
  return CLIENT_LOGOS.find(l => l.match.test(company)) || null
}
