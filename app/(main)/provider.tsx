"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import Header from "@/app/(main)/_conponents/Header";
import { getAuthUserData } from "@/services/api";
import { useRouter } from "next/navigation";
import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

const MainProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const convex = useConvex();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserAuth().catch((err) => {
      console.error("Error in checkUserAuth:", err);
    });
  }, []);

  const checkUserAuth = async () => {
    const userToken = localStorage.getItem("user_token");
    if (!userToken) {
      router.replace("/signin");
      return;
    }

    const userData = userToken && (await getAuthUserData(userToken));

    if (!userData) {
      router.replace("/signin");
      return;
    }

    try {
      const user = await convex.query(api.users.getUser, {
        email: userData.email,
      });

      if (!user) {
        router.replace("/signin");
        return;
      }
      console.log("User is ", user);

      setUser(user);
    } catch (err) {
      console.log(err);
      router.replace("/signin");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" className="bg-black dark:bg-white" />
      </div>
    );
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
export default MainProvider;
