"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchInput() {
  return (
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search posts..."
        className="pl-8"
      />
    </div>
  )
}