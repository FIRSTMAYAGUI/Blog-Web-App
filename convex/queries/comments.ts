import { query } from "../_generated/server";
import { v } from "convex/values";

export const getCommentsByPostId = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_postId", (q) => q.eq("postId", args.postId))
      .order("desc")
      .collect();

    return comments;
  },
});