import { PostsList } from './post-list'

export default function Blog() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 mb-3 max-w-2xl mx-auto text-xl text-muted-foreground">
          Browse a wide variety of thoughts.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <PostsList />
      </div>
    </div>
  )
}