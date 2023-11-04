import React, { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

const PageLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ width: "1024px", margin: "auto" }}>
        <Typography variant="h2">{title}</Typography>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default PageLayout;
