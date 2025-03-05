"use client";

import React, { ReactNode, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const Provider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [user, setUser] = useState();

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div>{children}</div>
    </NextThemesProvider>
  );
};

export default Provider;
