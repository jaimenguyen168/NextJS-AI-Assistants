import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    profileImage: v.string(),
  },
  handler: async (ctx, { name, email, profileImage }) => {
    // check if user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .collect();

    if (user.length > 0) {
      return user[0];
    }

    // add new user
    const newUser = {
      name,
      email,
      profileImage,
      credits: 5000,
    };
    await ctx.db.insert("users", newUser);

    return newUser;
  },
});
