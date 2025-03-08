"use client";

import React, { useContext, useState } from "react";
import EmptyChatState from "@/app/(main)/workspace/_components/EmptyChatState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { aiModelList } from "@/constants";
import { AssistantContext } from "@/context/AssistantContext";
import axios from "axios";

const AssistantChat = () => {
  const { currentAssistant } = useContext(AssistantContext);
  const [input, setInput] = useState("");

  const onSendMessage = async () => {
    const aiModel = aiModelList.find(
      (item) => item.name === currentAssistant.aiModelId,
    );

    const result = await axios.post("api/eden-ai", {
      provider: aiModel?.edenAi,
      input,
    });

    setInput("");
  };

  return (
    <div className="mt-20 p-12 relative h-[90vh]">
      <EmptyChatState />

      <div className="flex justify-between px-12 gap-4 absolute left-0 right-0 bottom-6 w-full">
        <Input
          value={input}
          placeholder="Start typing here..."
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
        />

        <Button>
          <Send />
        </Button>
      </div>
    </div>
  );
};
export default AssistantChat;
