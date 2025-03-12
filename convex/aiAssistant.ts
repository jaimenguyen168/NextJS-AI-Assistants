import { mutation } from "@/convex/_generated/server";
import { v } from "convex/values";

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
