"use client";

import React, { useContext } from "react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AssistantContext } from "@/context/AssistantContext";
import { ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";

const EmptyChatState = () => {
  const { currentAssistant, setCurrentAssistant } =
    useContext(AssistantContext);

  const questions = currentAssistant?.assistant.sampleQuestions;

  return (
    <div className="flex flex-col items-center">
      <SparklesText
        className="text-3xl text-center"
        text="How can I assist you?"
      />

      {currentAssistant && (
        <div className="mt-6 flex flex-col gap-4">
          {questions?.length > 0 ? (
            questions.map((question: string, index: number) => (
              <BlurFade key={index} delay={0.15 * index}>
                <div className="p-4 flex border rounded-xl hover:bg-gray-100 hover:scale-105 cursor-pointer items-center justify-between">
                  <h2 className="md:text-md lg:text-lg">{question}</h2>
                  <div className="w-[20px]" />
                  <ChevronRight className="shrink-0" />
                </div>
              </BlurFade>
            ))
          ) : (
            <BlurFade>
              <div className="p-4 flex border rounded-xl hover:bg-gray-100 hover:scale-105 cursor-pointer items-center justify-between">
                <h2 className="md:text-md lg:text-lg">
                  Hello there! I'm{" "}
                  <span className="font-bold text-lg">
                    {currentAssistant?.assistant.name}
                  </span>
                  . Let's start a conversation 👋
                </h2>
                <div className="w-[20px]" />
                <ChevronRight className="shrink-0" />
              </div>
            </BlurFade>
          )}
        </div>
      )}
    </div>
  );
};
export default EmptyChatState;
