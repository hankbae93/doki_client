import React, { ReactNode } from "react";
import Header from "@/src/layouts/Header";
import { Box } from "@mui/material";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Box
        sx={{ pt: 2, px: 3, pb: 10, background: "#F5F5F5", minHeight: "100vh" }}
      >
        {children}
      </Box>

      <footer>업데이트날짜 {process.env.NEXT_PUBLIC_VERSION}</footer>
    </>
  );
};

export default AppLayout;
