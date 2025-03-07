"use client";

import React, { useContext, useState } from "react";
import EmptyChatState from "@/app/(main)/workspace/_components/EmptyChatState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const AssistantChat = () => {
  const [input, setInput] = useState("");

  const onSendMessage = () => {
    console.log("Send Message");
  };

  return (
    <div className="mt-20 p-12 relative h-[90vh]">
      <EmptyChatState />

      <div className="flex justify-between px-12 gap-4 absolute left-0 right-0 bottom-6 w-full">
        <Input
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
