import { z } from 'zod';

export const commentSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  body: z.string().min(2, "Comment must be at least 2 characters").max(500, "Comment must be at most 500 characters"),
});

export type CommentFormValues = z.infer<typeof commentSchema>;