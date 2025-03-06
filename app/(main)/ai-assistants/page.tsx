"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { aiAssistantList } from "@/constants";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/app/(main)/_components/Header";

const AIAssistants = () => {
  const { user } = useContext(AuthContext);
  const insertAIAssistant = useMutation(
    api.userAIAssistant.insertUserAIAssistant,
  );
  const convex = useConvex();
  const router = useRouter();

  const [selectedAssistants, setSelectedAssistants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user &&
      getUserAssistants().catch((err) => {
        console.error("Error in getUserAssistants:", err);
      });
  }, [user]);

  const getUserAssistants = async () => {
    const result = await convex.query(
      api.userAIAssistant.getAllUserAIAssistants,
      {
        userId: user._id,
      },
    );

    if (result.length > 0) {
      router.replace("/workspace");
    }
  };

  const handleSelect = (selectedAssistant: any) => {
    const exists = selectedAssistants.some(
      (assistant) => assistant.assistantId === selectedAssistant.assistantId,
    );

    if (exists) {
      setSelectedAssistants(
        selectedAssistants.filter(
          (assistant) =>
            assistant.assistantId !== selectedAssistant.assistantId,
        ),
      );
    } else {
      setSelectedAssistants([...selectedAssistants, selectedAssistant]);
    }
  };

  const isSelected = (assistant: any) => {
    return selectedAssistants.some(
      (a) => a.assistantId === assistant.assistantId,
    );
  };

  const handleContinue = async () => {
    setLoading(true);

    try {
      const result = await insertAIAssistant({
        userId: user._id,
        assistantList: selectedAssistants,
      });

      if (result.length > 0) {
        router.push("/workspace");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="px-12 mt-16 md:px-24 lg:px-36 xl:px-48">
        <div className="flex justify-between items-center">
          <div className="gap-2">
            <h2 className="text-2xl lg:text-3xl font-bold">
              Welcome to the World of AI Assistants 🤖
            </h2>
            <p className="lg:text-xl">
              Choose your AI companions to assist you in your daily tasks 🚀
            </p>
          </div>

          <Button
            onClick={handleContinue}
            disabled={selectedAssistants.length === 0 || loading}
          >
            {loading && <Loader2Icon className="animate-spin" />} Continue
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-12">
          {aiAssistantList.map((assistant, index) => (
            <BlurFade
              key={assistant.assistantId}
              delay={0.25 + assistant.assistantId * 0.05}
              inView
            >
              <div
                key={assistant.assistantId}
                onClick={() => handleSelect(assistant)}
                className="w-[200px] overflow-hidden hover:border p-3 rounded-2xl hover:scale-105 transition-all ease-in-out cursor-pointer relative"
              >
                <Checkbox
                  className="absolute m-3 "
                  checked={isSelected(assistant)}
                />
                <Image
                  src={assistant.image}
                  alt={assistant.title}
                  width={400}
                  height={400}
                  className="rounded-2xl h-[200px] w-full object-cover"
                />
                <div className="mt-2">
                  <h2 className="text-center font-semibold text-lg">
                    {assistant.name}
                  </h2>
                  <h3 className="text-center text-gray-600 dark:text-gray-300">
                    {assistant.title}
                  </h3>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </>
  );
};
export default AIAssistants;
