"use client";

import React, { useContext } from "react";
import AssistantList from "@/app/(main)/workspace/_components/AssistantList";
import AssistantSettings from "@/app/(main)/workspace/_components/AssistantSettings";
import AssistantChat from "@/app/(main)/workspace/_components/AssistantChat";
import { AssistantContext } from "@/context/AssistantContext";

const Workspace = () => {
  const { currentAssistant } = useContext(AssistantContext);

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="grid grid-cols-6 w-full">
        <div className="hidden sm:block">
          <AssistantList />
        </div>

        <div
          className={`lg:col-span-4 md:col-span-5 sm:col-span-6 ${!currentAssistant ? "!col-span-5" : "col-span-6"}`}
        >
          <AssistantChat />
        </div>

        <div className={`hidden ${currentAssistant && "lg:block"}`}>
          <AssistantSettings />
        </div>
      </div>
    </div>
  );
};
export default Workspace;
