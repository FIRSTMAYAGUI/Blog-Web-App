import { Skeleton } from "@/components/ui/skeleton"
import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function SingleBlogSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 relative">
      <Link
        className={buttonVariants({ variant: "outline" })}
        href="/"
      >
        <ArrowLeft className="size-4" />
        Back to blog
      </Link>

      <Skeleton className="w-full h-[400px] my-8 rounded-xl" />

      <div className="space-y-4 flex flex-col">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="my-8 h-px bg-border" />

      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="my-8 h-px bg-border" />
    </div>
  )
}