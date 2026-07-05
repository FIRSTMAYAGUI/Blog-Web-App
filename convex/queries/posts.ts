import { query } from "../_generated/server";

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