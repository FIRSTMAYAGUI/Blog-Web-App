"use client"

import { useState, useEffect } from "react"
import { Search, Clock, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"
import { getRecentSearches, addRecentSearch, type RecentSearchItem } from "@/lib/recent-searches"

function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
}

export function SearchInput() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [debouncedValue, setDebouncedValue] = useState("")
  const [recentSearches, setRecentSearches] = useState
  <{ _id: string; title: string; content: string }[]>(() => getRecentSearches())

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(searchValue)
    }, 400)

    return () => clearTimeout(timeout)
  }, [searchValue])

  const searchResults = useQuery(
    api.queries.posts.searchPosts,
    debouncedValue.trim() !== "" ? { searchTerm: debouncedValue } : "skip"
  )

  const isSearching =
    searchValue.trim() !== "" &&
    (searchValue !== debouncedValue || searchResults === undefined)

  const isSearchMode = searchValue.trim() !== ""

  function handleResultClick(post: RecentSearchItem) {
    const updated = addRecentSearch(post)
    setRecentSearches(updated)

    setOpen(false)
    router.push(`/blog/${post._id}`)
    setSearchValue("")
    setDebouncedValue("")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />

        <PopoverTrigger asChild>
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-8"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </PopoverTrigger>
      </div>

      <PopoverContent
        className="w-72 p-2"
        align="start"
        sideOffset={6}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {!isSearchMode ? (
          <>
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground px-2 py-1.5">
              <Clock className="size-3.5" />
              Recent searches
            </p>

            {recentSearches.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No recent searches yet.
              </p>
            ) : (
              <div className="flex flex-col">
                {recentSearches.map((post) => (
                  <button
                    key={post._id}
                    type="button"
                    onClick={() => handleResultClick(post)}
                    className="flex flex-col items-start gap-0.5 rounded-md px-2 py-1.5 text-left hover:bg-muted transition-colors"
                  >
                    <span className="text-sm font-medium">
                      {truncate(post.title, 28)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {truncate(post.content, 35)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : isSearching ? (
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Searching...
          </div>
        ) : searchResults && searchResults.length > 0 ? (
          <div className="flex flex-col">
            {searchResults.map((post) => (
              <button
                key={post._id}
                type="button"
                onClick={() => handleResultClick(post)}
                className="flex flex-col items-start gap-0.5 rounded-md px-2 py-1.5 text-left hover:bg-muted transition-colors"
              >
                <span className="text-sm font-medium">
                  {truncate(post.title, 25)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {truncate(post.content, 30)}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-6">
            No posts found.
          </p>
        )}
      </PopoverContent>
    </Popover>
  )
}