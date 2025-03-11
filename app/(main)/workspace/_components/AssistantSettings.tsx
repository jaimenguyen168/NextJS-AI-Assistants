import React, { useContext, useState } from "react";
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
import { Loader2Icon, Save, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import ConfirmationAlert from "@/app/(main)/_components/ConfirmationAlert";
import { BlurFade } from "@/components/magicui/blur-fade";

const AssistantSettings = () => {
  const { currentAssistant, setCurrentAssistant } =
    useContext(AssistantContext);
  const updateAssistant = useMutation(
    api.userAIAssistant.updateUserAIAssistant,
  );
  const deleteUserAIAssistant = useMutation(
    api.userAIAssistant.deleteUserAIAssistantById,
  );
  const [loading, setLoading] = useState(false);

  const handleOnInputChange = (field: string, value: any) => {
    setCurrentAssistant((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveAssistant = async () => {
    setLoading(true);

    try {
      const result = await updateAssistant({
        id: currentAssistant?._id,
        aiModelId: currentAssistant?.aiModelId,
        userInstruction: currentAssistant?.userInstruction,
      });

      if (result) {
        toast("Saved successfully");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    await deleteUserAIAssistant({ id: currentAssistant?._id });

    setCurrentAssistant(null);
    setLoading(false);
  };

  return (
    currentAssistant && (
      <div className="p-5 bg-secondary border-l-[1px] h-screen space-y-6 relative">
        <h2 className="font-bold text-xl">Settings</h2>

        <BlurFade delay={0.25}>
          <div className="flex gap-3 items-center">
            <Image
              src={currentAssistant?.assistant.image}
              alt={currentAssistant?.assistant.title}
              width={80}
              height={80}
              className="rounded-full w-[80px] h-[80px] object-cover shrink-0"
            />
            <div>
              <h2 className="font-bold">{currentAssistant?.assistant.name}</h2>
              <p className="text-gray-700 dark:text-gray-300">
                {currentAssistant?.assistant.title}
              </p>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.25 * 2}>
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-500">Model</h2>

            <Select
              value={
                aiModelList.find(
                  (model) => model.name === currentAssistant.aiModelId,
                )?.name || ""
              }
              onValueChange={(value) => {
                handleOnInputChange("aiModelId", value);
              }}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {aiModelList.map((model, index) => (
                  <SelectItem
                    key={model.id}
                    value={model.name}
                    className="my-2"
                  >
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
        </BlurFade>

        <BlurFade delay={0.25 * 3}>
          <div>
            <h2 className="font-semibold text-gray-500">Instruction</h2>
            <Textarea
              placeholder="Add instruction here"
              className="h-[180px] bg-white"
              value={currentAssistant?.assistant.userInstruction}
              onChange={(e) => {
                handleOnInputChange("userInstruction", e.target.value);
              }}
            />
          </div>
        </BlurFade>

        <div className="absolute justify-end bottom-12 sm:w-[80%] xl:w-[86%] sm:right-6 xl:right-8 flex gap-6">
          <Button
            onClick={handleSaveAssistant}
            className="w-[40%] hover:scale-105 cursor-pointer"
            disabled={loading}
          >
            {loading ? <Loader2Icon /> : <Save />}
            <span className="hidden lg:block">Save</span>
          </Button>
          <ConfirmationAlert onDelete={handleConfirmDelete}>
            <Button
              className="w-[40%] border border-slate-300 cursor-pointer hover:scale-105"
              variant="ghost"
              disabled={loading}
            >
              <Trash />
              <span className="hidden lg:block">Delete</span>
            </Button>
          </ConfirmationAlert>
        </div>
      </div>
    )
  );
};
export default AssistantSettings;
