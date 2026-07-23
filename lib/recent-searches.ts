export type RecentSearchItem = {
  _id: string
  title: string
  content: string
}

const STORAGE_KEY = "recent-post-searches"
const MAX_RECENT = 5

export function getRecentSearches(): RecentSearchItem[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export function addRecentSearch(post: RecentSearchItem): RecentSearchItem[] {
  const current = getRecentSearches()

  // Remove this post if it's already in the list (no duplicates)
  const filtered = current.filter((item) => item._id !== post._id)

  // Put the newest one at the front, then keep only the first 5
  const updated = [post, ...filtered].slice(0, MAX_RECENT)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}