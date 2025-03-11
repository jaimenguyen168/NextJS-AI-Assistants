"use client";

import React, { useContext } from "react";
import AssistantList from "@/app/(main)/workspace/_components/AssistantList";
import AssistantSettings from "@/app/(main)/workspace/_components/AssistantSettings";
import AssistantChat from "@/app/(main)/workspace/_components/AssistantChat";
import { AssistantContext } from "@/context/AssistantContext";

const Workspace = () => {
  const { currentAssistant } = useContext(AssistantContext);

  return (
    <div className="h-screen fixed w-full">
      <div className="grid grid-cols-5">
        <div className="hidden md:block">
          <AssistantList />
        </div>

        <div className={`${currentAssistant ? "col-span-3" : "col-span-4"}`}>
          <AssistantChat />
        </div>

        <div className={`${currentAssistant ? "col-span-1" : "hidden"}`}>
          <AssistantSettings />
        </div>
      </div>
    </div>
  );
};
export default Workspace;
