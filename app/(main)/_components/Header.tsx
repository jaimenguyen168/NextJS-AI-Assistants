import React, { useContext } from "react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import UserProfile from "@/app/(main)/workspace/_components/UserProfile";

const Header = ({ hasAssistants }: { hasAssistants: boolean }) => {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  const handleGoToAssistants = () => {
    router.push("/workspace");
  };

  return (
    <div className="py-4 px-6 shadow-md flex items-center justify-between">
      <Image src="/logo.svg" alt="logo" width={40} height={40} />

      <div className="flex items-center gap-3">
        {hasAssistants && (
          <div
            onClick={handleGoToAssistants}
            className="bg-amber-200 px-4 py-2 rounded-xl hover:bg-amber-300 hover:scale-105"
          >
            <h2 className="text-sm font-semibold">My Assistants</h2>
          </div>
        )}
        <UserProfile
          user={user}
          setUser={setUser}
          isMobile={true}
          showBio={false}
        />
      </div>
    </div>
  );
};
export default Header;
