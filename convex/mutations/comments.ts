import { mutation } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "../auth";

export const createComment = mutation({
  args: {
    postId: v.id("posts"),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx)

    if (!user) {
      throw new ConvexError('Unauthenticated');
    }

    const post = await ctx.db.get(args.postId)

    if (!post) {
      throw new ConvexError('Post not found');
    }

    const comment = await ctx.db.insert("comments", {
      postId: args.postId,
      authorId: user._id,
      authorName: user.name ?? "Anonymous",
      body: args.body,
    });

    return comment
  },
});