import { query } from "../_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getPosts = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("posts")
      .order("desc")
      .paginate(args.paginationOpts);

    const page = await Promise.all(
      result.page.map(async (post) => ({
        ...post,
        imageUrl: post.imageStorageId ? await ctx.storage.getUrl(post.imageStorageId) : null,
      }))
    );

    return { ...result, page };
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

export const searchPosts = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    if (args.searchTerm.trim() === "") {
      return [];
    }

    const posts = await ctx.db
      .query("posts")
      .withSearchIndex("search_title", (q) =>
        q.search("title", args.searchTerm)
      )
      .take(6);

    return Promise.all(
      posts.map(async (post) => ({
        ...post,
        imageUrl: post.imageStorageId ? await ctx.storage.getUrl(post.imageStorageId) : null,
      }))
    );
  },
});