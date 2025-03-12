import { v } from "convex/values";
import { mutation, query } from "@/convex/_generated/server";

export const addChatMessage = mutation({
  args: {
    chatId: v.id("chats"),
    role: v.string(),
    content: v.string(),
  },
  handler: async (ctx, { chatId, role, content }) => {
    const chat = await ctx.db.get(chatId);

    if (!chat) {
      throw new Error("Chat not found");
    }

    const updatedMessages = [...chat.messages, { role, content }];

    await ctx.db.patch(chatId, { messages: updatedMessages });

    return { success: true };
  },
});

export const getChatById = query({
  args: {
    chatId: v.id("chats"),
  },
  handler: async (ctx, { chatId }) => {
    const chat = await ctx.db.get(chatId);

    if (!chat) {
      throw new Error("Chat not found");
    }

    return chat.messages;
  },
});

export const deleteChatById = mutation({
  args: {
    chatId: v.id("chats"),
  },
  handler: async (ctx, { chatId }) => {
    await ctx.db.delete(chatId);
  },
});
