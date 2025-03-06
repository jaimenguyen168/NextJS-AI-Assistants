"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Spinner } from "@/components/ui/spinner";
import { aiAssistantList } from "@/constants";
import Image from "next/image";
import { AssistantContext } from "@/context/AssistantContext";

const AssistantList = () => {
  const { user } = useContext(AuthContext);
  const { currentAssistant, setCurrentAssistant } =
    useContext(AssistantContext);

  const convex = useConvex();
  const router = useRouter();
  const [assistantList, setAssistantList] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserAssistants().then((r) => {});
  }, [user]);

  const getUserAssistants = async (): Promise<void> => {
    try {
      const result = await convex.query(
        api.userAIAssistant.getAllUserAIAssistants,
        {
          userId: user._id,
        },
      );

      console.log(result);
      if (result.length === 0) router.replace("/ai-assistants");

      setAssistantList(
        result.map((assistant: any) =>
          aiAssistantList.find((a) => a.id === assistant.assistantId),
        ),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" className="bg-black dark:bg-white" />
      </div>
    );
  }

  return (
    <div className="p-5 bg-secondary border-r-[1px] h-screen space-y-3 relative">
      <h2 className="font-bold text-lg">Your Personal AI Assistants</h2>
      <Button className="w-full">+ Add New Assistant</Button>

      <Input className="bg-white" placeholder="Search" />

      <div className="mt-6 space-y-3">
        {assistantList.map((assistant: any) => (
          <div
            key={assistant.id}
            onClick={() => setCurrentAssistant(assistant)}
            className={`p-2 flex gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 hover:scale-105 rounded-2xl ${
              currentAssistant?.id === assistant.id &&
              "bg-gray-200 dark:bg-slate-700"
            }`}
          >
            <Image
              src={assistant.image}
              alt={assistant.title}
              width={60}
              height={60}
              className="rounded-xl w-[60px] h-[60px] object-cover"
            />
            <div>
              <h2 className="font-semibold">{assistant.name}</h2>
              <h3 className="text-gray-600 text-sm dark:text-gray-300">
                {assistant.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="w-[80%] ml-2 p-2 absolute bottom-12 flex cursor-pointer gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 hover:scale-105 rounded-2xl">
        <Image
          src={user?.profileImage}
          alt="profile image"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h2 className="font-semibold">{user?.name}</h2>
          <h3 className="text-sm text-gray-400">
            {user?.orderId ? "Premium" : "Free"}
          </h3>
        </div>
      </div>
    </div>
  );
};
export default AssistantList;
