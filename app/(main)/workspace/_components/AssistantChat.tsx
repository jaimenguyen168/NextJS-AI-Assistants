import React, { useContext, useEffect, useRef, useState } from "react";
import EmptyChatState from "@/app/(main)/workspace/_components/EmptyChatState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Send } from "lucide-react";
import { aiModelList } from "@/constants";
import { AssistantContext } from "@/context/AssistantContext";
import axios from "axios";
import Image from "next/image";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { addChatMessage, getChatById } from "@/convex/chats";
import Spinner from "@/components/Spinner";
import { updateModifiedUserAIAssistant } from "@/convex/userAIAssistant";

type Message = {
  role: string;
  content: string;
};

const AssistantChat = () => {
  const scrollRef = useRef<any>(null);
  const { user, setUser } = useContext(AuthContext);
  const { currentAssistant } = useContext(AssistantContext);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const updateUserTokens = useMutation(api.users.updateUserTokens);
  const addChatMessage = useMutation(api.chats.addChatMessage);
  const updateModifiedUserAIAssistant = useMutation(
    api.userAIAssistant.updateModifiedUserAIAssistant,
  );
  const [loadingChat, setLoadingChat] = useState(true);

  const convex = useConvex();

  useEffect(() => {
    if (currentAssistant?.chatId) {
      getMessages().then(() => console.log("Done"));
    }
    setLoadingChat(false);
  }, [currentAssistant?.chatId]);

  const getMessages = async () => {
    const result = await convex.query(api.chats.getChatById, {
      chatId: currentAssistant?.chatId,
    });

    console.log("chat result", result);

    if (result) {
      setMessages(result as any);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [currentAssistant]);

  const onSendMessage = async () => {
    setLoading(true);

    const userInput = input;
    setInput("");
    const aiModel = aiModelList.find(
      (item) => item.name === currentAssistant.aiModelId,
    );

    await addChatMessage({
      chatId: currentAssistant?.chatId,
      role: "user",
      content: userInput,
    });

    const instruction = currentAssistant?.instruction || "No instruction";

    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: [
        {
          type: "text",
          content: {
            text: msg.content,
          },
        },
      ],
    }));

    formattedMessages.push({
      role: "user",
      content: [
        {
          type: "text",
          content: {
            text:
              userInput +
              " : " +
              instruction +
              " : " +
              currentAssistant.userInstruction,
          },
        },
      ],
    });

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
      {
        role: "assistant",
        content: "Responding...",
      },
    ]);

    try {
      const result = await axios.post("/api/eden-ai", {
        provider: aiModel?.edenAi,
        messages: formattedMessages,
      });

      setMessages((prev) => prev.slice(0, -1));
      setMessages((prev) => [...prev, result.data]);

      await addChatMessage({
        chatId: currentAssistant?.chatId,
        role: "assistant",
        content: result.data.content,
      });

      await handleUserToken(result.data?.content);
      await updateModifiedUserAIAssistant({ id: currentAssistant?._id });
    } catch (error) {
      console.error("Error calling AI:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserToken = async (text?: string) => {
    const tokens = text ? text.trim().split(" ").length : 0;

    await updateUserTokens({
      id: user?._id,
      tokens: tokens,
    });

    setUser((user: any) => ({
      ...user,
      tokens: user.tokens + tokens,
    }));
  };

  if (loadingChat) {
    return (
      <div className="flex-col items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-8 p-12 relative h-[95vh] w-full">
      {messages.length === 0 && <EmptyChatState />}

      <div
        ref={scrollRef}
        className="flex flex-col gap-4 overflow-y-scroll h-[95%]"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end ml-16"
                : "justify-start mr-24"
            }`}
          >
            <div className="flex gap-4">
              {message.role === "assistant" &&
                currentAssistant?.assistant.image && (
                  <Image
                    src={currentAssistant.assistant.image}
                    alt={
                      currentAssistant?.assistant.title || "Assistant Avatar"
                    }
                    width={100}
                    height={100}
                    className="w-[40px] h-[40px] rounded-full"
                  />
                )}
              <div
                className={`p-4 flex rounded-b-3xl gap-3 ${
                  message.role === "user"
                    ? "bg-gray-300 rounded-tl-3xl"
                    : "bg-gray-100 rounded-tr-3xl"
                }`}
              >
                {loading && messages.length - 1 === index && (
                  <Loader2Icon className="animate-spin" />
                )}
                <h2>{message.content}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between px-12 gap-4 absolute left-0 right-0 bottom-6 w-full">
        <Input
          value={input}
          placeholder="Start typing here..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
          disabled={loading}
        />

        <Button disabled={loading} onClick={onSendMessage}>
          <Send />
        </Button>
      </div>
    </div>
  );
};
export default AssistantChat;
