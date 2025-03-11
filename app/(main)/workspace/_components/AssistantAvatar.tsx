import React, { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { aiAssistantList } from "@/constants";
import Image from "next/image";

const AssistantAvatar = ({
  children,
  setSelectedImage,
}: {
  children: ReactNode;
  setSelectedImage: (image: string) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-wrap gap-3">
          {aiAssistantList.map((assistant, index) => (
            <div
              key={index}
              className="hover:scale-110 cursor-pointer"
              onClick={() => setSelectedImage(assistant.image)}
            >
              <Image
                src={assistant.image}
                alt={assistant.name}
                width={80}
                height={80}
                className="w-[30px] h-[30px] rounded-lg object-cover shrink-0"
              />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default AssistantAvatar;
