"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import { getAuthUserData } from "@/services/google-auth";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { AssistantContext } from "@/context/AssistantContext";
import Spinner from "@/components/Spinner";

const MainProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { setUser } = useContext(AuthContext);
  const [currentAssistant, setCurrentAssistant] = useState();

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
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <AssistantContext.Provider
        value={{ currentAssistant, setCurrentAssistant }}
      >
        {children}
      </AssistantContext.Provider>
    </div>
  );
};
export default MainProvider;
