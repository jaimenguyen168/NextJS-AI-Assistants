"use client";

import React, { ReactNode, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Provider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [user, setUser] = useState();

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <div>{children}</div>
      </NextThemesProvider>
    </GoogleOAuthProvider>
  );
};

export default Provider;
