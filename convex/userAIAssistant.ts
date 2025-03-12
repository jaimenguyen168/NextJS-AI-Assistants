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
        const assistantId = await insertAIAssistant(ctx, {
          name: assistant.name,
          title: assistant.title,
          image: assistant.image,
          instruction: assistant.instruction,
          sampleQuestions: assistant.sampleQuestions,
        });

        return await ctx.db.insert("userAIAssistant", {
          userId,
          assistantId,
          aiModelId: aiModelId || "Google: Gemini 2.0 Flash",
          userInstruction: assistant.userInstruction || "",
        });
      }),
    );
  },
});

export const addNewUserAIAssistant = mutation({
  args: {
    userId: v.string(),
    aiModelId: v.string(),
    name: v.string(),
    title: v.string(),
    image: v.string(),
    userInstruction: v.string(),
  },
  handler: async (
    ctx,
    { userId, aiModelId, name, title, image, userInstruction },
  ) => {
    const assistantId = await insertAIAssistant(ctx, {
      name,
      title,
      image,
    });

    const result = await ctx.db.insert("userAIAssistant", {
      userId,
      aiModelId: aiModelId || "Google: Gemini 2.0 Flash",
      assistantId,
      userInstruction: userInstruction || "",
    });

    return await getUserAIAssistantById(ctx, { id: result });
  },
});

export const insertAIAssistant = mutation({
  args: {
    name: v.string(),
    title: v.string(),
    image: v.string(),
    instruction: v.optional(v.string()),
    sampleQuestions: v.optional(v.array(v.string())),
  },
  handler: async (
    ctx,
    { name, title, image, instruction, sampleQuestions },
  ) => {
    return await ctx.db.insert("aiAssistant", {
      name,
      title,
      image,
      instruction,
      sampleQuestions: sampleQuestions || [],
    });
  },
});

export const deleteUserAIAssistantByUserId = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    const userAIAssistants = await ctx.db
      .query("userAIAssistant")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    const assistantIds = userAIAssistants.map((doc) => doc.assistantId);

    await Promise.all(
      userAIAssistants.map(async (doc) => {
        await ctx.db.delete(doc._id);
      }),
    );

    if (assistantIds.length > 0) {
      await Promise.all(
        assistantIds.map(async (assistantId: any) => {
          await deleteAIAssistantById(ctx, { assistantId });
        }),
      );
    }
  },
});

export const deleteAIAssistantById = mutation({
  args: {
    assistantId: v.id("aiAssistant"),
  },
  handler: async (ctx, { assistantId }) => {
    await ctx.db.delete(assistantId);
  },
});

export const deleteUserAIAssistantById = mutation({
  args: {
    id: v.id("userAIAssistant"),
  },
  handler: async (ctx, { id }) => {
    const userAIAssistant = await ctx.db
      .query("userAIAssistant")
      .filter((q) => q.eq(q.field("_id"), id))
      .first();
    const assistantId = userAIAssistant?.assistantId as any;
    await deleteAIAssistantById(ctx, { assistantId });

    await ctx.db.delete(id);
  },
});

export const getAllUserAIAssistants = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    const userAssistants = await ctx.db
      .query("userAIAssistant")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect();

    return await Promise.all(
      userAssistants.map(async (userAssistant) => {
        const assistantDetails = await ctx.db
          .query("aiAssistant")
          .filter((q) => q.eq(q.field("_id"), userAssistant.assistantId))
          .first();

        return {
          ...userAssistant,
          assistant: assistantDetails || null,
        };
      }),
    );
  },
});

export const getUserAIAssistantById = query({
  args: {
    id: v.id("userAIAssistant"),
  },
  handler: async (ctx, { id }) => {
    const userAIAssistant = await ctx.db.get(id);
    if (!userAIAssistant) return null;

    const assistant = await ctx.db.get(userAIAssistant.assistantId as any);

    return { ...userAIAssistant, assistant };
  },
});

export const updateUserAIAssistant = mutation({
  args: {
    id: v.id("userAIAssistant"),
    userInstruction: v.string(),
    aiModelId: v.string(),
  },
  handler: async (ctx, { id, aiModelId, userInstruction }) => {
    await ctx.db.patch(id, {
      aiModelId,
      userInstruction,
    });

    return await ctx.db.get(id);
  },
});
