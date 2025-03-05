import React, { useContext } from "react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="py-4 px-6 shadow-md flex items-center justify-between">
      <Image src="/logo.svg" alt="logo" width={40} height={40} />

      <Image
        src={user?.profileImage}
        alt="profile image"
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
  );
};
export default Header;
