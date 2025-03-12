import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { AssistantContext } from "@/context/AssistantContext";
import { BlurFade } from "@/components/magicui/blur-fade";
import AddNewAssistantDialog from "@/app/(main)/workspace/_components/AddNewAssistantDialog";
import AssistantListSeeAll from "@/app/(main)/workspace/_components/AssistantListSeeAll";
import UserProfile from "@/app/(main)/workspace/_components/UserProfile";
import Spinner from "@/components/Spinner";

const AssistantList = () => {
  const { user, setUser } = useContext(AuthContext);
  const { currentAssistant, setCurrentAssistant } =
    useContext(AssistantContext);

  const convex = useConvex();
  const router = useRouter();
  const [assistantList, setAssistantList] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkScreenSize(); // Set initial state
    window.addEventListener("resize", checkScreenSize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", checkScreenSize); // Cleanup
    };
  }, []);

  const visibleAssistants =
    isMobile || assistantList.length > 6
      ? assistantList.slice(0, 3)
      : assistantList;

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

      const sortedList = result.sort((a, b) => {
        const timeA = a.modifiedAt ?? 0;
        const timeB = b.modifiedAt ?? 0;
        return timeB - timeA;
      });

      setAssistantList(sortedList);
    } catch (err) {
      router.replace("/signin");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAssistant = (assistant: any) => {
    setCurrentAssistant(assistant);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-5 bg-secondary border-r-[1px] h-screen flex-col flex justify-between pb-16 items-center lg:items-start w-full">
      <div className="space-y-4 w-full">
        <h2 className="font-bold text-lg">Your Personal AI Assistants</h2>
        <AddNewAssistantDialog>
          <Button className="w-full">
            <span className="lg:block md:hidden">+ Add New Assistant</span>
            <span className="lg:hidden md:block">Add</span>
          </Button>
        </AddNewAssistantDialog>

        <Input className="bg-white" placeholder="Search" />

        <div className="mt-6 space-y-2">
          {(isMobile || assistantList.length > 6) && (
            <AssistantListSeeAll
              assistantList={assistantList}
              setSelectedAssistant={(assistant) => {
                handleSelectAssistant(assistant);
              }}
            >
              <h2 className="w-full text-sm font-semibold hover:scale-105">{`See All (${assistantList.length})`}</h2>
            </AssistantListSeeAll>
          )}

          {visibleAssistants.map((assistant: any) => (
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
                } ${isMobile && "justify-center"}`}
              >
                <Image
                  src={assistant.assistant.image}
                  alt={assistant.assistant.title}
                  width={60}
                  height={60}
                  className={`object-cover ${isMobile ? "rounded-full w-[80px] h-[80px]" : "rounded-xl w-[60px] h-[60px]"}`}
                />
                {!isMobile && (
                  <div>
                    <h2 className="font-semibold">
                      {assistant.assistant.name}
                    </h2>
                    <h3 className="text-gray-600 text-sm dark:text-gray-300">
                      {assistant.assistant.title}
                    </h3>
                  </div>
                )}
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      <UserProfile user={user} setUser={setUser} isMobile={isMobile} />
    </div>
  );
};
export default AssistantList;
