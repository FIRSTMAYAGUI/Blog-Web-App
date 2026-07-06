import { Separator } from '@/components/ui/separator'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import placeholderImage from '@/images/gallery-2.jpg'

export default function SingleBlogPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        className={buttonVariants({ variant: "outline" })}
        href="/blog"
      >
        <ArrowLeft className="size-4" />
        Back to blog
      </Link>

      <div className="relative w-full h-[400px] my-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={placeholderImage}
          alt="Blog post cover"
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          This is a placeholder blog post title
        </h1>

        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Posted on:{" "}
            {new Date().toLocaleDateString("en-US")}
          </p>
        </div>
      </div>

      <Separator className="my-8" />

      <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
        This is placeholder content for the blog post. The actual content will
        be fetched from the database and displayed here. It will support
        multiple paragraphs and preserve whitespace formatting.
      </p>

      <Separator className="my-8" />
    </div>
  )
}