"use client"

import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageSquare, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

import { commentSchema, CommentFormValues } from "@/app/schemas/commentSchema"
import { createCommentAction } from "@/app/actions"

export function CommentSection({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      postId,
      body: "",
    },
  })

  function onSubmit(values: CommentFormValues) {
    startTransition(async () => {
      const result = await createCommentAction(values)

      if (result?.error) {
        toast.error(result.error)
        return
      }

      toast.success("Comment added successfully")
      form.reset({ postId, body: "" })
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">2 Comments</h2>
      </CardHeader>

      <CardContent className="space-y-8">
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="comment-body">Comment</FieldLabel>
                <Textarea
                  id="comment-body"
                  aria-invalid={fieldState.invalid}
                  placeholder="Share your thoughts"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <span>Comment</span>
            )}
          </Button>
        </form>

        <Separator />

        <ScrollArea className="h-[150px] rounded-md border">
          <section className="space-y-6 p-4">
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
        </ScrollArea>
      </CardContent>
    </Card>
  )
}