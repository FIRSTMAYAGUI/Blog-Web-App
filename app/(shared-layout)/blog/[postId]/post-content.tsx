import { Separator } from '@/components/ui/separator'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import placeholderImage from '../../../images/gallery-2.jpg'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { notFound } from 'next/navigation'
import { CommentSection } from './comment-section'

export async function PostContent({ postId }: { postId: string }) {
  const post = await fetchQuery(api.queries.posts.getPostById, {
    postId: postId as Id<"posts">,
  })

  if (!post) notFound()

  return (
    <>
      <Link
        className={buttonVariants({ variant: "outline" })}
        href="/blog"
      >
        <ArrowLeft className="size-4" />
        Back to blog
      </Link>

      <div className="relative w-full h-[400px] my-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={post.imageUrl ?? placeholderImage}
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>

        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Posted on:{" "}
            {new Date(post._creationTime).toLocaleDateString("en-US")}
          </p>
        </div>
      </div>

      <Separator className="my-8" />

      <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
        {post.content}
      </p>

      <Separator className="my-8" />

      <CommentSection />
    </>
  )
}