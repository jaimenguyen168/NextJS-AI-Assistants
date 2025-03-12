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
import { useRouter } from "next/navigation";
import { USER_DATA } from "@/constants/keys";

const UserProfile = ({ user, setUser, isMobile, showBio = true }: any) => {
  const [openProfile, setOpenProfile] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    sessionStorage.removeItem(USER_DATA);
    setUser(null);
    router.replace("/");
  };

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="p-2 flex flex-col lg:flex-row cursor-pointer gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 hover:scale-105 rounded-2xl">
            {user?.profileImage && (
              <Image
                src={user.profileImage}
                alt="profile image"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            {showBio && (
              <div>
                {!isMobile && <h2 className="font-semibold">{user?.name}</h2>}
                <h3 className="text-sm text-gray-400">
                  {user?.orderId ? "Premium" : "Free"}
                </h3>
              </div>
            )}
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
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserProfileDialog
        openDialog={openProfile}
        setOpenDialog={() => setOpenProfile(false)}
      />
    </div>
  );
};
export default UserProfile;
