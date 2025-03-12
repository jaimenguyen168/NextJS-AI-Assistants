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
    const userData = sessionStorage.getItem("user_data");
    if (!userData) {
      router.replace("/signin");
      return;
    }

    const data = JSON.parse(userData);

    try {
      const user = await convex.query(api.users.getUser, {
        email: data.email,
      });

      if (!user) {
        router.replace("/signin");
        return;
      }

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
