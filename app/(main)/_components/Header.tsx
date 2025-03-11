import React, { useContext } from "react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Header = ({ hasAssistants }: { hasAssistants: boolean }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleGoToAssistants = () => {
    router.push("/workspace");
  };

  return (
    <div className="py-4 px-6 shadow-md flex items-center justify-between">
      <Image src="/logo.svg" alt="logo" width={40} height={40} />

      <div className="flex items-center gap-6">
        {hasAssistants && (
          <div
            onClick={handleGoToAssistants}
            className="bg-amber-200 px-4 py-2 rounded-xl hover:bg-amber-300 hover:scale-105"
          >
            <h2 className="text-sm font-semibold">My Assistants</h2>
          </div>
        )}
        <Image
          src={user?.profileImage}
          alt="profile image"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </div>
  );
};
export default Header;
