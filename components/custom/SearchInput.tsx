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

const recentSearches = [
  {
    _id: "1",
    title: "Getting Started with Next.js and Convex",
    content: "Learn how to build full stack apps with real-time data.",
  },
  {
    _id: "2",
    title: "Understanding React Server Components",
    content: "A deep dive into the mental model behind RSCs.",
  },
  {
    _id: "3",
    title: "Why Zod is the best validation library",
    content: "Schema validation made simple and type-safe.",
  },
  {
    _id: "4",
    title: "Building forms with react-hook-form",
    content: "Performant, flexible, and easy to validate forms.",
  },
  {
    _id: "5",
    title: "Deploying your app to Vercel",
    content: "A step by step guide to shipping your project.",
  },
]

function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
}

export function SearchInput() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [debouncedValue, setDebouncedValue] = useState("")

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

  function handleResultClick(postId: string) {
    setOpen(false)          // ← explicitly close it, don't rely on Radix's memory
    router.push(`/blog/${postId}`)
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
        {/* ...unchanged content, just replace onClick handlers below */}
        {!isSearchMode ? (
          <>
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground px-2 py-1.5">
              <Clock className="size-3.5" />
              Recent searches
            </p>
            <div className="flex flex-col">
              {recentSearches.map((post) => (
                <button
                  key={post._id}
                  type="button"
                  onClick={() => setSearchValue(post.title)}
                  className="flex flex-col items-start gap-0.5 rounded-md px-2 py-1.5 text-left hover:bg-muted transition-colors"
                >
                  <span className="text-sm font-medium">{truncate(post.title, 28)}</span>
                  <span className="text-xs text-muted-foreground">{truncate(post.content, 35)}</span>
                </button>
              ))}
            </div>
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
                onClick={() => handleResultClick(post._id)}
                className="flex flex-col items-start gap-0.5 rounded-md px-2 py-1.5 text-left hover:bg-muted transition-colors"
              >
                <span className="text-sm font-medium">{truncate(post.title, 25)}</span>
                <span className="text-xs text-muted-foreground">{truncate(post.content, 30)}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-6">No posts found.</p>
        )}
      </PopoverContent>
    </Popover>
  )
}