import React from "react";
import AssistantList from "@/app/(main)/workspace/_components/AssistantList";
import AssistantSettings from "@/app/(main)/workspace/_components/AssistantSettings";
import AssistantChat from "@/app/(main)/workspace/_components/AssistantChat";

const Workspace = () => {
  return (
    <div className="h-screen fixed w-full">
      <div className="grid grid-cols-5">
        <div className="hidden md:block">
          <AssistantList />
        </div>

        <div className="md:col-span-3 lg:col-span-3">
          <AssistantChat />
        </div>

        <div className="hidden md:block col-span-1">
          <AssistantSettings />
        </div>
      </div>
    </div>
  );
};
export default Workspace;
