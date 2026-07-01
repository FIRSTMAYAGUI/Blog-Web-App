"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import Image from "next/image";
import placeholderImage from '../../images/gallery-2.jpg'

export default function Blog() {
  const posts = useQuery(api.queries.posts.getPosts)

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

      {posts === undefined ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
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
      ) : posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts yet. Be the first to create one!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post._id} className="pt-0">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={placeholderImage}
                  fill
                  alt={post.title}
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
                <Link href={`/blog/${post._id}`} className="text-primary hover:underline underline-offset-4">
                  Read more
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}