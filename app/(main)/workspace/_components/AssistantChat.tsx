"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import EmptyChatState from "@/app/(main)/workspace/_components/EmptyChatState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Send } from "lucide-react";
import { aiModelList } from "@/constants";
import { AssistantContext } from "@/context/AssistantContext";
import axios from "axios";
import Image from "next/image";

type Message = {
  role: string;
  content: string;
};

const AssistantChat = () => {
  const scrollRef = useRef<any>(null);
  const { currentAssistant } = useContext(AssistantContext);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

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

    const userInput = input;
    setInput("");
    const aiModel = aiModelList.find(
      (item) => item.name === currentAssistant.aiModelId,
    );

    const result = await axios.post("api/eden-ai", {
      provider: aiModel?.edenAi,
      input:
        userInput +
        " : " +
        currentAssistant.instruction +
        " : " +
        currentAssistant.userInstruction,
      aiLastMessage: messages[messages.length - 2]?.content,
    });

    setLoading(false);
    setMessages((prev) => prev.slice(0, -1));
    setMessages((prev) => [...prev, result.data]);
  };

  return (
    <div className="mt-8 p-12 relative h-[95vh]">
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
                ? "justify-end ml-12 "
                : "justify-start mr-12"
            }`}
          >
            <div className="flex gap-4">
              {message.role === "assistant" && (
                <Image
                  src={currentAssistant?.image}
                  alt={currentAssistant?.title}
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
