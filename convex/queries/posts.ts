import { query } from "../_generated/server";

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return posts;
  },
});