import { Suspense } from "react";
import { PostsList } from "./post-list";
import { PostsGridSkeleton } from "./post-grid-skeleton";

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 mb-3 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts, and trends from our team.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Suspense fallback={<PostsGridSkeleton />}>
          <PostsList />
        </Suspense>
      </div>
    </div>
  )
}