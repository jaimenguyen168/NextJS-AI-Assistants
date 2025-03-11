"use client";

import React, { useContext } from "react";
import AssistantList from "@/app/(main)/workspace/_components/AssistantList";
import AssistantSettings from "@/app/(main)/workspace/_components/AssistantSettings";
import AssistantChat from "@/app/(main)/workspace/_components/AssistantChat";
import { AssistantContext } from "@/context/AssistantContext";

const Workspace = () => {
  const { currentAssistant } = useContext(AssistantContext);

  return (
    <div className="h-screen w-full">
      <div className="grid grid-cols-5">
        <div className="hidden md:block">
          <AssistantList />
        </div>

        <div
          className={`lg:col-span-3 md:col-span-4 sm:col-span-5 ${!currentAssistant ? "!col-span-4" : "col-span-5"}`}
        >
          <AssistantChat />
        </div>

        <div className="hidden md:block">
          <AssistantSettings />
        </div>
      </div>
    </div>
  );
};
export default Workspace;
