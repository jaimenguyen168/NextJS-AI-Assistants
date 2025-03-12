"use client";

import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user_data");
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
