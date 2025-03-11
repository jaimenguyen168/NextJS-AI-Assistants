import React, { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCircle2 } from "lucide-react";
import UserProfileDialog from "@/app/(main)/workspace/_components/UserProfileDialog";

const UserProfile = ({ user, isMobile }: any) => {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-[80%] p-2 absolute bottom-12 flex flex-col lg:flex-row cursor-pointer gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 hover:scale-105 rounded-2xl">
            <Image
              src={user?.profileImage}
              alt="profile image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              {!isMobile && <h2 className="font-semibold">{user?.name}</h2>}
              <h3 className="text-sm text-gray-400">
                {user?.orderId ? "Premium" : "Free"}
              </h3>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[150px]">
          <DropdownMenuLabel className="font-bold">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenProfile(true)}>
            <UserCircle2 /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserProfileDialog
        openDialog={openProfile}
        setOpenDialog={() => setOpenProfile(false)}
      />
    </>
  );
};
export default UserProfile;
