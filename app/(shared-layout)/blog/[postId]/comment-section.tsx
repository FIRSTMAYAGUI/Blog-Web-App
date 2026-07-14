"use client"

import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageSquare, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useQuery } from "convex/react"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

import { commentSchema, CommentFormValues } from "@/app/schemas/commentSchema"
import { createCommentAction } from "@/app/actions"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

export function CommentSection({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition()
  const comments = useQuery(api.queries.comments.getCommentsByPostId, {
    postId: postId as Id<"posts">,
  })

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
        <h2 className="text-xl font-bold">{comments?.length ?? 0} Comments</h2>
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
                <span>Commenting...</span>
              </>
            ) : (
              <span>Comment</span>
            )}
          </Button>
        </form>

        {comments && comments.length > 0 && <Separator />}

        {comments === undefined ? (
          <p className="text-sm text-muted-foreground">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          <ScrollArea className="h-[150px] rounded-md border">
            <section className="space-y-6 p-4">
              {comments.map((comment) => (
                <div key={comment._id} className="flex gap-4">
                  <Avatar className="size-10 shrink-0">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${comment.authorName}`}
                      alt={comment.authorName}
                    />
                    <AvatarFallback>
                      {comment.authorName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{comment.authorName}</p>
                      <p className="text-muted-foreground text-xs">
                        {new Date(comment._creationTime).toLocaleDateString("en-US")}
                      </p>
                    </div>
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {comment.body}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}