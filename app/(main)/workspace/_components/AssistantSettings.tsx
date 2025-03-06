"use client";

import React, { useContext } from "react";
import { AssistantContext } from "@/context/AssistantContext";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { aiModelList } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Trash } from "lucide-react";

const AssistantSettings = () => {
  const { currentAssistant, setCurrentAssistant } =
    useContext(AssistantContext);

  const handleOnInputChange = (field: string, value: any) => {
    setCurrentAssistant((prev: any) => ({
      ...prev,
      [field]: value,
    }));

    console.log(currentAssistant);
  };

  return (
    currentAssistant && (
      <div className="p-5 bg-secondary border-l-[1px] h-screen space-y-6 relative">
        <h2 className="font-bold text-xl">Settings</h2>

        <div className="flex gap-3 items-center">
          <Image
            src={currentAssistant?.image}
            alt={currentAssistant?.title}
            width={80}
            height={80}
            className="rounded-full w-[80px] h-[80px]"
          />
          <div>
            <h2 className="font-bold">{currentAssistant?.name}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {currentAssistant?.title}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold text-gray-500">Model</h2>

          <Select
            defaultValue={currentAssistant.id}
            onValueChange={(value) => {
              handleOnInputChange("aiModelId", value);
            }}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {aiModelList.map((model, index) => (
                <SelectItem key={model.id} value={model.name} className="my-2">
                  <div className="flex items-center">
                    <img
                      src={model.logo}
                      alt={model.name}
                      width={20}
                      height={20}
                      className="mr-2 rounded-full"
                    />
                    <h3>{model.name}</h3>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h2 className="font-semibold text-gray-500">Instruction</h2>
          <Textarea
            placeholder="Add instruction here"
            className="h-[180px] bg-white"
            value={currentAssistant?.instruction}
            onChange={(e) => {
              handleOnInputChange("instruction", e.target.value);
            }}
          />
        </div>

        <div className="absolute bottom-12 sm:w-[80%] xl:w-[86%] sm:right-6 xl:right-8 flex justify-between">
          <Button className="w-[40%]">
            <Save />
            Save
          </Button>
          <Button className="w-[40%] border border-slate-500" variant="ghost">
            <Trash />
            Delete
          </Button>
        </div>
      </div>
    )
  );
};
export default AssistantSettings;
