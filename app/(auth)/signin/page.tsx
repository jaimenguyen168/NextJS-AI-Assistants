"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (typeof window === "undefined") return;

      localStorage.setItem("user_token", tokenResponse.access_token);

      setLoading(true);

      setLoading(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  if (loading) {
    return <div className="flex items-center justify-center h-screen"></div>;
  }

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col items-center gap-4 border rounded-2xl p-10">
        <Image src="/logo.svg" alt="logo" width={100} height={200} />
        <h2 className="text-2xl">{"Sign In to your account"}</h2>

        <Button onClick={() => googleLogin()}>Sign in with Google</Button>
      </div>
    </div>
  );
};
export default SignIn;
