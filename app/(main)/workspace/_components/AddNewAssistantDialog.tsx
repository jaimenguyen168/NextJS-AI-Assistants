import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { aiAssistantList } from "@/constants";
import Image from "next/image";

const AddNewAssistantDialog = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
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

const AddNewAssistantForm = () => {
  return (
    <div className="grid grid-cols-3 mt-4">
      <div className="border-r pr-3">
        <Button variant="secondary" size="sm" className="w-full">
          + Create
        </Button>
        <div className="space-y-2 mt-4">
          {aiAssistantList.map((assistant, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 hover:scale-105 rounded-2xl cursor-pointer flex items-center gap-2"
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
      <div className="col-span-2"></div>
    </div>
  );
};
