import React, { ReactNode } from "react";
import MainProvider from "@/app/(main)/provider";

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <MainProvider>{children}</MainProvider>;
};
export default MainLayout;
