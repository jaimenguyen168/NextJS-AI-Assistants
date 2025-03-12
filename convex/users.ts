import { mutation, query } from "./_generated/server";
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
      .first();

    if (user) return user;

    // add new user
    const newUser = {
      name,
      email,
      profileImage,
      credits: 50000,
      tokens: 0,
    };
    await ctx.db.insert("users", newUser);

    return newUser;
  },
});

export const getUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();
  },
});

export const updateUserTokens = mutation({
  args: {
    id: v.id("users"),
    tokens: v.number(),
  },
  handler: async (ctx, { id, tokens }) => {
    const user = await ctx.db.get(id);
    const currentTokens = user?.tokens ?? 0;
    const updatedTokens = currentTokens + tokens;

    await ctx.db.patch(id, {
      tokens: updatedTokens,
    });
  },
});

export const updateUserPlan = mutation({
  args: {
    id: v.id("users"),
    orderId: v.string(),
    credits: v.number(),
  },
  handler: async (ctx, { id, orderId, credits }) => {
    await ctx.db.patch(id as any, {
      orderId,
      credits,
    });
  },
});
