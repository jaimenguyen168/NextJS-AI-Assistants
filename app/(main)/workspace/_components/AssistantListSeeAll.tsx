import React, { ReactNode, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const AssistantListSeeAll = ({
  children,
  assistantList,
  setSelectedAssistant,
}: {
  children: ReactNode;
  assistantList: any;
  setSelectedAssistant: (assistant: any) => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleSelectAssistant = (assistant: any) => {
    setSelectedAssistant(assistant);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          {assistantList.map((assistant: any, index: number) => (
            <div
              key={index}
              className="hover:scale-105 cursor-pointer p-2 hover:bg-gray-100 rounded-2xl flex items-center gap-2"
              onClick={() => handleSelectAssistant(assistant)}
            >
              <Image
                src={assistant.assistant.image}
                alt={assistant.assistant.name}
                width={100}
                height={100}
                className="w-[54px] h-[54px] rounded-lg object-cover shrink-0"
              />

              <div>
                <h2 className="font-semibold">{assistant.assistant.name}</h2>
                <p className="text-sm text-gray-500">
                  {assistant.assistant.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AssistantListSeeAll;
