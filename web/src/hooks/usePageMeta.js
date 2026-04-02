import { useEffect } from 'react'

/**
 * Sets document <title> and meta description per page.
 * Called at the top of any page component.
 *
 * usePageMeta('Sponsor Dashboard', 'Fund cells and track your impact.')
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    const base = 'DOWNFLOW — School of Life'
    document.title = title ? `${title} | ${base}` : base

    let meta = document.querySelector('meta[name="description"]')
    if (meta && description) {
      meta.setAttribute('content', description)
    }

    // OG title
    let og = document.querySelector('meta[property="og:title"]')
    if (og && title) og.setAttribute('content', `${title} | ${base}`)

    // OG description
    let ogd = document.querySelector('meta[property="og:description"]')
    if (ogd && description) ogd.setAttribute('content', description)

    return () => {
      // reset on unmount
      document.title = base
    }
  }, [title, description])
}
