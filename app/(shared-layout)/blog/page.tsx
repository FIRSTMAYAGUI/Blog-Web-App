"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

export default function Blog(){
const posts = useQuery(api.queries.posts.getPosts)

  console.log("all posts:", posts?.[0].title)

  return (
    <>
        <div className="py-12">
        <div className="text-center pb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Our Blog
            </h1>
            <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
              Insights, thoughts, and trends from our team.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="pt-0">
                <div className="relative h-48 w-full overflow-hidden">
                </div>

                <CardContent>
                  <Link href={'/'}>
                    <h1 className="text-2xl font-bold hover:text-primary">
                      Title
                    </h1>
                  </Link>
                  <p className="text-muted-foreground line-clamp-3">Content</p>
                </CardContent>

                <CardFooter>
                  Read more
                </CardFooter>
              </Card>
            </div>
        </div>
        </div>
    </>
  )
}