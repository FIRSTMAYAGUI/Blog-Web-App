import { Suspense } from 'react'
import { PostContent } from './post-content'
import { SingleBlogSkeleton } from './single-blog-skeleton'
import { Metadata } from 'next'
import { fetchQuery } from 'convex/nextjs'
import { Id } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>
}): Promise<Metadata> {
  const { postId } = await params
  const post = await fetchQuery(api.queries.posts.getPostById, {
    postId: postId as Id<"posts">,
  })

  if (!post) return {}

  return {
    title: post.title,
    description: post.content.slice(0, 150),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 150),
      images: post.imageUrl ? [post.imageUrl] : [],
      type: "article",
    },
  }
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Suspense fallback={<SingleBlogSkeleton />}>
        <PostContent postId={postId} />
      </Suspense>
    </div>
  )
}