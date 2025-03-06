import { mutation, query } from "@/convex/_generated/server";
import { v } from "convex/values";

export const insertUserAIAssistant = mutation({
  args: {
    userId: v.string(),
    assistantList: v.any(),
    aiModelId: v.optional(v.string()),
  },
  handler: async (ctx, { userId, assistantList, aiModelId }) => {
    await deleteUserAIAssistantByUserId(ctx, { userId });

    return await Promise.all(
      assistantList.map(async (assistant: any) => {
        return await ctx.db.insert("userAIAssistant", {
          userId,
          aiModelId: aiModelId || "Google: Gemini 2.0 Flash",
          ...assistant,
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

export const getAllUserAIAssistants = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("userAIAssistant")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
  },
});

export const updateUserAIAssistant = mutation({
  args: {
    id: v.id("userAIAssistant"),
    userInstruction: v.string(),
    aiModelId: v.string(),
  },
  handler: async (ctx, { id, aiModelId, userInstruction }) => {
    return await ctx.db.patch(id, {
      aiModelId,
      userInstruction,
    });
  },
});
