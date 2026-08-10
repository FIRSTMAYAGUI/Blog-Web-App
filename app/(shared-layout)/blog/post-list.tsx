"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import placeholderImage from '../../images/default_image.png'
import { buttonVariants, Button } from "@/components/ui/button";
import { usePaginatedQuery } from "convex/react";
import { Loader2 } from "lucide-react";

export function PostsList() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.queries.posts.getPosts,
    {},
    { initialNumItems: 6 }
  );

  if (status === "LoadingFirstPage") {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="pt-0 animate-pulse">
            <div className="h-48 w-full bg-muted" />
            <CardContent className="mt-4 space-y-2">
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No posts yet. Be the first to create one!
      </p>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((post) => (
          <Card key={post._id} className="pt-0">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={post.imageUrl ?? placeholderImage}
                fill
                alt={post.title}
                className="object-cover"
              />
            </div>

            <CardContent>
              <Link href={`/blog/${post._id}`}>
                <h2 className="text-2xl font-bold hover:text-primary">
                  {post.title}
                </h2>
              </Link>
              <p className="text-muted-foreground line-clamp-3">{post.content}</p>
            </CardContent>

            <CardFooter>
              <Link href={`/blog/${post._id}`} className={buttonVariants()}>
                Read more
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {status === "CanLoadMore" && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => loadMore(6)}
          >
            Load more
          </Button>
        </div>
      )}

      {status === "LoadingMore" && (
        <div className="flex justify-center">
          <Button variant="outline" disabled>
            <Loader2 className="size-4 animate-spin" />
            Loading...
          </Button>
        </div>
      )}
    </div>
  )
}