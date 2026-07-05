import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import placeholderImage from '../../images/gallery-2.jpg'
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";

export async function PostsList() {
  const posts = await fetchQuery(api.queries.posts.getPosts)

  console.log(
    posts.map(p => p.imageUrl)
  )

  if (posts.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No posts yet. Be the first to create one!
      </p>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
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
  )
}