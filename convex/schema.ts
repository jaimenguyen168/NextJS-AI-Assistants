import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    profileImage: v.string(),
    credits: v.number(),
    tokens: v.optional(v.number()),
    orderId: v.optional(v.string()),
  }),

  aiAssistant: defineTable({
    name: v.string(),
    title: v.string(),
    image: v.string(),
    instruction: v.optional(v.string()),
    sampleQuestions: v.optional(v.array(v.string())),
  }),

  chats: defineTable({
    messages: v.array(
      v.object({
        role: v.string(),
        content: v.string(),
      }),
    ),
  }),

  userAIAssistant: defineTable({
    userId: v.string(),
    assistantId: v.string(),
    aiModelId: v.optional(v.string()),
    chatId: v.optional(v.string()),
    userInstruction: v.string(),
    modifiedAt: v.optional(v.number()),
  }),
});
