"use client"

import { useState, useEffect } from "react"
import { Search, Clock, Loader2, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"
import { getRecentSearches, addRecentSearch, type RecentSearchItem } from "@/lib/recent-searches"
import { VisuallyHidden } from "radix-ui"

function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
}

export function SearchInput() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [debouncedValue, setDebouncedValue] = useState("")
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>(() => getRecentSearches())

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
    setMobileOpen(false)
    router.push(`/blog/${post._id}`)
    setSearchValue("")
    setDebouncedValue("")
  }

  // Shared results content — used inside both the desktop Popover and mobile Dialog
  function renderResults() {
    if (!isSearchMode) {
      return (
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
      )
    }

    if (isSearching) {
      return (
        <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Searching...
        </div>
      )
    }

    if (searchResults && searchResults.length > 0) {
      return (
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
      )
    }

    return (
      <p className="text-sm text-muted-foreground text-center py-6">
        No posts found.
      </p>
    )
  }

  return (
    <>
      {/* Desktop version — visible sm and up */}
      <div className="hidden sm:block">
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
            {renderResults()}
          </PopoverContent>
        </Popover>
      </div>

      {/* Mobile version — icon only, opens full-screen dialog */}
      <div className="sm:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          aria-label="Search"
        >
          <Search className="size-5" />
        </Button>

        <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
          <DialogContent
            className="max-w-full w-screen h-screen sm:h-screen rounded-none p-0 gap-0 top-0 left-0 translate-x-0 translate-y-0"
            showCloseButton={false}
          >
            <VisuallyHidden.Root asChild>
              <DialogTitle>Search Posts</DialogTitle>
            </VisuallyHidden.Root>
            
            <div className="flex items-center gap-2 p-3 border-b">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label="Close search"
              >
                <ArrowLeft className="size-5" />
              </Button>

              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  className="pl-8"
                  autoFocus
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>

            <div className="p-2 overflow-y-auto">
              {renderResults()}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}