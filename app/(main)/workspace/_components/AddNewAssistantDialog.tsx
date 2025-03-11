import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { aiAssistantList, aiModelList } from "@/constants";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Assistant } from "@/types/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AssistantAvatar from "@/app/(main)/workspace/_components/AssistantAvatar";
import { toast } from "sonner";

const AddNewAssistantDialog = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full !max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Assistant</DialogTitle>
          <DialogDescription asChild>
            <AddNewAssistantForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewAssistantDialog;

const defaultAssistant = {
  name: "",
  title: "",
  image: "/bug-fixer.avif",
  userInstruction: "",
};

const AddNewAssistantForm = () => {
  const [selectedAssistant, setSelectedAssistant] =
    useState<any>(defaultAssistant);

  const handleSelectAssistant = (assistant: Assistant) => {
    setSelectedAssistant(assistant);
  };

  const handleOnInputChange = (field: string, value: string) => {
    setSelectedAssistant((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateNewAssistant = () => {
    setSelectedAssistant(defaultAssistant);
  };

  const handleSubmit = () => {
    if (
      !selectedAssistant.name ||
      !selectedAssistant.title ||
      !selectedAssistant.userInstruction
    ) {
      toast("Please fill in all the fields");
      return;
    }
  };

  return (
    <div className="grid grid-cols-3 mt-4">
      <div className="border-r pr-6">
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={handleCreateNewAssistant}
        >
          + Create New Assistant
        </Button>
        <div className="space-y-2 mt-4">
          {aiAssistantList.map((assistant, index) => (
            <div
              key={index}
              className={`p-2 hover:bg-gray-100 hover:scale-105 rounded-2xl cursor-pointer flex items-center gap-2 ${
                selectedAssistant.assistantId === assistant.assistantId &&
                "bg-gray-100"
              }`}
              onClick={() => handleSelectAssistant(assistant)}
            >
              <Image
                src={assistant.image}
                alt={assistant.name}
                width={100}
                height={100}
                className="w-[30px] h-[30px] object-cover rounded-md shrink-0"
              />
              <p className="text-xs text-gray-500">{assistant.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 pl-6 pr-4">
        <div className="flex w-full gap-4 items-center">
          <AssistantAvatar
            setSelectedImage={(image) => handleOnInputChange("image", image)}
          >
            <Image
              src={selectedAssistant.image}
              alt="assistant"
              width={150}
              height={150}
              className="w-[100px] h-[100px] object-cover rounded-xl cursor-pointer shrink-0"
            />
          </AssistantAvatar>

          <div className="flex flex-col gap-4 w-full">
            <Input
              value={selectedAssistant.name}
              placeholder="Assistant Name"
              className="w-full"
              onChange={(e) => handleOnInputChange("name", e.target.value)}
            />
            <Input
              value={selectedAssistant.title}
              placeholder="Assistant Title"
              className="w-full"
              onChange={(e) => handleOnInputChange("title", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <h2 className="font-semibold">Model</h2>

          <Select
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

        <div className="space-y-3 mt-4">
          <h2 className="font-semibold">Instruction</h2>
          <Textarea
            placeholder="Assistant Instruction"
            value={selectedAssistant.userInstruction}
            onChange={(e) =>
              handleOnInputChange("userInstruction", e.target.value)
            }
            className="h-64"
          />
        </div>

        <div className="flex items-center justify-end gap-3 mt-10">
          <Button variant="secondary">Cancel</Button>
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};
