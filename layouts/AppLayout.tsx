import React, { ReactNode } from "react";
import Header from "@/layouts/Header";
import { Box } from "@mui/material";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Box sx={{ pt: 2, px: 3, pb: 10 }}>{children}</Box>
    </>
  );
};

export default AppLayout;
