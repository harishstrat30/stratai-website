import * as aiDefectDetection from './posts/aiDefectDetection'
import * as aiPredictiveMaintenance from './posts/aiPredictiveMaintenance'

// Posts shown with a hand-built article. The key is the post slug; the database post is still used for
// its category, author and canonical data, but the article text comes from the file in ./posts.
// To give another post its own article file, add one like aiDefectDetection.js and register it here.
export const NEW_TEMPLATE_POSTS = {
  [aiDefectDetection.SLUG]: aiDefectDetection,
  [aiPredictiveMaintenance.SLUG]: aiPredictiveMaintenance,
}

// Lists (Knowledge Hub, /blog, home page, "Keep reading") read titles from the database. For a post that has a
// hand-built article, show that article's title, intro and read time so the card matches the page it opens.
export function withPostOverrides(posts = []) {
  return posts.map(p => {
    const entry = NEW_TEMPLATE_POSTS[p.slug]
    if (!entry) return p
    return { ...p, title: entry.POST.title, excerpt: entry.POST.intro, read_time_minutes: entry.POST.readMinutes }
  })
}
