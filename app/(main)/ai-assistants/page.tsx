"use client";

import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { aiAssistantList } from "@/constants";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { Loader2Icon } from "lucide-react";

const AIAssistants = () => {
  const { user } = useContext(AuthContext);
  const insertAIAssistant = useMutation(
    api.userAIAssistant.insertUserAIAssistant,
  );
  const [selectedAssistants, setSelectedAssistants] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelect = (selectedId: number) => {
    if (selectedAssistants.includes(selectedId)) {
      setSelectedAssistants((prevState) =>
        prevState.filter((id) => id !== selectedId),
      );
    } else {
      setSelectedAssistants((prevState) => [...prevState, selectedId]);
    }
  };

  const isSelected = (id: number) => {
    return selectedAssistants.includes(id);
  };

  const handleContinue = async () => {
    setLoading(true);

    try {
      const result = await insertAIAssistant({
        userId: user._id,
        assistantIdList: selectedAssistants,
      });

      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          {loading ? <Loader2Icon className="animate-spin" /> : "Continue"}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-12">
        {aiAssistantList.map(({ id, title, image, name }) => (
          <BlurFade key={id} delay={0.25 + id * 0.05} inView>
            <div
              key={id}
              onClick={() => handleSelect(id)}
              className="w-[200px] overflow-hidden hover:border p-3 rounded-2xl hover:scale-105 transition-all ease-in-out cursor-pointer relative"
            >
              <Checkbox className="absolute m-3 " checked={isSelected(id)} />
              <Image
                src={image}
                alt={title}
                width={400}
                height={400}
                className="rounded-2xl h-[200px] w-full object-cover"
              />
              <div className="mt-2">
                <h2 className="text-center font-semibold text-lg">{name}</h2>
                <h3 className="text-center text-gray-600 dark:text-gray-300">
                  {title}
                </h3>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
};
export default AIAssistants;
