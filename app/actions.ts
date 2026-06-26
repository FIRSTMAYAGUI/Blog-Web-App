"use server"

import { api } from "@/convex/_generated/api";
import { fetchAuthMutation } from "@/lib/auth-server";
import { PostFormValues, postSchema } from "./schemas/postShema";

export async function createBlogAction(data: PostFormValues) {
  const validatedData = postSchema.safeParse(data)

  if (!validatedData.success) {
    return { error: "Invalid form data" }
  }

  try {
    await fetchAuthMutation(api.mutations.posts.createBlog, {
      title: validatedData.data.title,
      content: validatedData.data.content,
    })

    return { success: true }
  } catch (error) {
    console.error('from the server',error)
    return { error: "Failed to create post. Please try again." }
  }
}