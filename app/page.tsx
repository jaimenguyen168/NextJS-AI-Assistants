"use client";

import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/context/AuthContext";
import { USER_DATA } from "@/constants/keys";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const storedUser = sessionStorage.getItem(USER_DATA);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (user) {
    redirect("/ai-assistants");
  }

  redirect("/signin");
}
