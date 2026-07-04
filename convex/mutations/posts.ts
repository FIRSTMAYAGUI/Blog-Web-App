import { mutation } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "../auth";

export const createBlog = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx)

    if (!user) {
      throw new ConvexError('Unauthenticated');
    }

    const blogArticle = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      authorId: user._id,
      imageStorageId: args.imageStorageId,
    });

    return blogArticle
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) throw new ConvexError('Unauthenticated');
    return await ctx.storage.generateUploadUrl();
  },
});

