import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    profileImage: v.string(),
    credits: v.number(),
    orderId: v.optional(v.string()),
  }),

  userAIAssistant: defineTable({
    userId: v.string(),
    assistantId: v.number(),
    aiModelId: v.optional(v.string()),
    name: v.string(),
    title: v.string(),
    image: v.string(),
    instruction: v.string(),
    userInstruction: v.string(),
    sampleQuestions: v.array(v.string()),
  }),
});
