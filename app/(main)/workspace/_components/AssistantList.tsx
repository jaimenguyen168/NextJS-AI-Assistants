import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { AssistantContext } from "@/context/AssistantContext";
import { BlurFade } from "@/components/magicui/blur-fade";
import AddNewAssistantDialog from "@/app/(main)/workspace/_components/AddNewAssistantDialog";

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
  }, [user && currentAssistant]);

  const getUserAssistants = async (): Promise<void> => {
    if (!user) {
      router.replace("/signin");
      return;
    }

    try {
      const result = await convex.query(
        api.userAIAssistant.getAllUserAIAssistants,
        {
          userId: user._id,
        },
      );

      console.log(result);
      if (result.length === 0) router.replace("/ai-assistants");

      setAssistantList(result);
    } catch (err) {
      router.replace("/signin");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAssistant = (assistant: any) => {
    setCurrentAssistant(assistant);
    console.log(currentAssistant);
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
      <AddNewAssistantDialog>
        <Button className="w-full">
          <span className="lg:block md:hidden">+ Add New Assistant</span>
          <span className="lg:hidden md:block">Add</span>
        </Button>
      </AddNewAssistantDialog>

      <Input className="bg-white" placeholder="Search" />

      <div className="mt-6 space-y-3">
        {assistantList.map((assistant: any) => (
          <BlurFade
            key={assistant.assistantId}
            delay={0.25 + assistant.assistantId * 0.05}
            inView
          >
            <div
              key={assistant.assistantId}
              onClick={() => handleSelectAssistant(assistant)}
              className={`p-2 flex gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 hover:scale-105 rounded-2xl ${
                currentAssistant?.assistantId === assistant.assistantId &&
                "bg-gray-200 dark:bg-slate-700"
              }`}
            >
              <Image
                src={assistant.assistant.image}
                alt={assistant.assistant.title}
                width={60}
                height={60}
                className="rounded-xl w-[60px] h-[60px] object-cover"
              />
              <div>
                <h2 className="font-semibold">{assistant.assistant.name}</h2>
                <h3 className="text-gray-600 text-sm dark:text-gray-300">
                  {assistant.assistant.title}
                </h3>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      <div className="w-[80%] ml-2 p-2 absolute bottom-12 flex flex-col lg:flex-row cursor-pointer gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 hover:scale-105 rounded-2xl">
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
