"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { getAuthUserData } from "@/services/api";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const createUserMutation = useMutation(api.users.createUser);
  const { setUser } = useContext(AuthContext);

  const router = useRouter();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (typeof window === "undefined") return;

      localStorage.setItem("user_token", tokenResponse.access_token);

      const userData = await getAuthUserData(tokenResponse.access_token);

      const result = await createUserMutation({
        name: userData.name,
        email: userData.email,
        profileImage: userData.picture,
      });

      setUser(result);
      router.replace("/ai-assistants");
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

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
