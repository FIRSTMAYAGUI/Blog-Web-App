import { Suspense } from 'react'
import { PostContent } from './post-content'
import { SingleBlogSkeleton } from './single-blog-skeleton'

export default async function SingleBlog({
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