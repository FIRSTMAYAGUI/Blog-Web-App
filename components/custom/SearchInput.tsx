"use client"

import { useState } from "react"
import { Search, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
  const [searchValue, setSearchValue] = useState("")

  return (
    <Popover>
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
        
        {/* Make the Input itself the trigger directly */}
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
              <span className="text-sm font-medium">
                {truncate(post.title, 28)}
              </span>
              <span className="text-xs text-muted-foreground">
                {truncate(post.content, 35)}
              </span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}