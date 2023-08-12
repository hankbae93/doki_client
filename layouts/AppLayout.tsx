import React, { ReactNode } from "react";
import Header from "@/layouts/Header";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AppLayout;
