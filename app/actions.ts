"use server"

import { api } from "@/convex/_generated/api";
import { fetchAuthMutation } from "@/lib/auth-server";
import { postSchema } from "./schemas/postShema";
import { commentSchema } from "./schemas/commentSchema";
import { Id } from "@/convex/_generated/dataModel";

//blog creation
export async function createBlogAction(data: {
  title: string;
  content: string;
  storageId?: Id<"_storage">;
}) {
  const validatedData = postSchema.pick({ title: true, content: true }).safeParse(data)

  if (!validatedData.success) {
    return { error: "Invalid form data" }
  }

  try {
    await fetchAuthMutation(api.mutations.posts.createBlog, {
      title: validatedData.data.title,
      content: validatedData.data.content,
      imageStorageId: data.storageId,
    })

    return { success: true }
  } catch (error) {
    console.error('from the server', error)
    return { error: "Failed to create post. Please try again." }
  }
}

//comments
export async function createCommentAction(data: {
  postId: string;
  body: string;
}) {
  const validatedData = commentSchema.safeParse(data)

  if (!validatedData.success) {
    return { error: "Invalid comment" }
  }

  try {
    await fetchAuthMutation(api.mutations.comments.createComment, {
      postId: validatedData.data.postId as Id<"posts">,
      body: validatedData.data.body,
    })

    return { success: true }
  } catch (error) {
    console.error('from the server', error)
    return { error: "Failed to add comment. Please try again." }
  }
}