import { mutation } from "@/convex/_generated/server";
import { v } from "convex/values";

export const insertUserAIAssistant = mutation({
  args: {
    userId: v.string(),
    assistantIdList: v.array(v.number()),
  },
  handler: async (ctx, { userId, assistantIdList }) => {
    await deleteUserAIAssistantByUserId(ctx, { userId });

    return await Promise.all(
      assistantIdList.map(async (assistantId: number) => {
        return await ctx.db.insert("userAIAssistant", {
          userId,
          assistantId,
        });
      }),
    );
  },
});

export const deleteUserAIAssistantByUserId = mutation({
  args: {
    userId: v.string(), // The userId to match
  },
  handler: async (ctx, { userId }) => {
    // Fetch all documents where userId matches
    const userAIAssistants = await ctx.db
      .query("userAIAssistant")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    // Delete each matching document
    await Promise.all(
      userAIAssistants.map(async (doc) => {
        await ctx.db.delete(doc._id);
      }),
    );
  },
});
