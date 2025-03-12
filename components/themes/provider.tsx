"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthContext } from "@/context/AuthContext";

const Provider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <ConvexProvider client={convex}>
        <AuthContext.Provider value={{ user, setUser }}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div>{children}</div>
          </NextThemesProvider>
        </AuthContext.Provider>
      </ConvexProvider>
    </GoogleOAuthProvider>
  );
};

export default Provider;
