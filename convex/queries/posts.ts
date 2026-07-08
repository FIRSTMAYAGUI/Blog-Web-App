import { query } from "../_generated/server";
import { v } from "convex/values";

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();

    return Promise.all(
      posts.map(async (post) => ({
        ...post,
        imageUrl: post.imageStorageId ? await ctx.storage.getUrl(post.imageStorageId) : null,
      }))
    );
  },
});

export const getPostById = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);

    if (!post) return null;

    return {
      ...post,
      imageUrl: post.imageStorageId ? await ctx.storage.getUrl(post.imageStorageId) : null,
    };
  },
});