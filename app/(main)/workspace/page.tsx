import React from "react";
import AssistantList from "@/app/(main)/workspace/_components/AssistantList";
import AssistantSettings from "@/app/(main)/workspace/_components/AssistantSettings";

const Workspace = () => {
  return (
    <div className="h-screen fixed w-full">
      <div className="grid grid-cols-5">
        <div className="hidden md:block">
          <AssistantList />
        </div>

        <div className="md:col-span-4 lg:col-span-3">Chat UI</div>

        <div className="hidden lg:block">
          <AssistantSettings />
        </div>
      </div>
    </div>
  );
};
export default Workspace;
