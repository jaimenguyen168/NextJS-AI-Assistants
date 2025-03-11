import React, { useContext } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { WalletCardsIcon } from "lucide-react";

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

const UserDetails = () => {
  const { user } = useContext(AuthContext);
  const hasOrderId = user?.orderId;
  const userCredits = user?.credits;
  const userTokens = user?.tokens;
  const creditProgress = (userTokens / userCredits) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <Image
          src={user?.profileImage}
          alt="profile image"
          width={100}
          height={100}
          className="size-[60px] rounded-full"
        />

        <div>
          <h2 className="font-bold">{user?.name}</h2>
          <h3 className="text-gray-500">{user?.email}</h3>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-semibold">Token Usage</h2>
          <h3>
            {userTokens.toLocaleString()} / {userCredits.toLocaleString()}
          </h3>
        </div>
        <Progress value={creditProgress} />

        <h2 className="flex justify-between items-center font-bold">
          Current Plan{" "}
          <span
            className={`px-3 font-normal py-1 rounded-lg text-gray-600 ${hasOrderId ? "bg-amber-200 font-semibold" : "bg-gray-200"}`}
          >
            {hasOrderId ? "Premium Plan" : "Free Plan"}
          </span>
        </h2>

        {hasOrderId ? (
          <div className="flex-col flex mt-2">
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </div>
        ) : (
          <div className="p-4 border rounded-2xl flex flex-col gap-3">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold text-lg">Premium Plan</h2>
                <h2>500,000 Tokens</h2>
              </div>

              <h2 className="font-bold text-lg">9.99$/month</h2>
            </div>

            <hr />

            <Button className="w-full bg-amber-600">
              <WalletCardsIcon />{" "}
              <span className="font-bold">Upgrade for $9.99/month</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
