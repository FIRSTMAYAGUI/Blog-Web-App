import { MessageSquare } from "lucide-react"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function CommentSection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">2 Comments</h2>
      </CardHeader>

      <CardContent className="space-y-8">
        <form className="space-y-4">
          <Field>
            <FieldLabel htmlFor="comment-body">Comment</FieldLabel>
            <Textarea
              id="comment-body"
              placeholder="Share your thoughts"
            />
          </Field>
          <Button type="submit">Comment</Button>
        </form>

        <Separator />

        <section className="space-y-6">
          <div className="flex gap-4">
            <Avatar className="size-10 shrink-0">
              <AvatarImage
                src="https://avatar.vercel.sh/Jane Cooper"
                alt="Jane Cooper"
              />
              <AvatarFallback>JC</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Jane Cooper</p>
                <p className="text-muted-foreground text-xs">Jan 15, 2026</p>
              </div>
              <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                This was such a helpful read, thanks for breaking it down so clearly!
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Avatar className="size-10 shrink-0">
              <AvatarImage
                src="https://avatar.vercel.sh/Marcus Lee"
                alt="Marcus Lee"
              />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Marcus Lee</p>
                <p className="text-muted-foreground text-xs">Jan 18, 2026</p>
              </div>
              <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                I&apos;ve been struggling with this exact problem all week. Bookmarking this.
              </p>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  )
}