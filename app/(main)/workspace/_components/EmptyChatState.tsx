"use client";

import React, { useContext } from "react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AssistantContext } from "@/context/AssistantContext";
import { ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";

const EmptyChatState = () => {
  const { currentAssistant, setCurrentAssistant } =
    useContext(AssistantContext);

  return (
    <div className="flex flex-col items-center">
      <SparklesText
        className="text-3xl text-center"
        text="How can I assist you?"
      />

      <div className="mt-6 flex flex-col gap-4">
        {currentAssistant?.sampleQuestions.map(
          (question: string, index: number) => (
            <BlurFade key={index} delay={0.15 * index}>
              <div className="p-4 flex border rounded-xl hover:bg-gray-100 hover:scale-105 cursor-pointer items-center justify-between">
                <h2 className="md:text-md lg:text-lg">{question}</h2>
                <div className="w-[20px]" />
                <ChevronRight className="shrink-0" />
              </div>
            </BlurFade>
          ),
        )}
      </div>
    </div>
  );
};
export default EmptyChatState;
