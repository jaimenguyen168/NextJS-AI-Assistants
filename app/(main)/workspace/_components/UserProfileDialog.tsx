import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserDetails from "@/app/(main)/workspace/_components/UserDetails";

const UserProfileDialog = ({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: () => void;
}) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="w-full !max-w-xl">
        <DialogHeader>
          <DialogTitle hidden />
          <DialogDescription asChild>
            <UserDetails />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default UserProfileDialog;
