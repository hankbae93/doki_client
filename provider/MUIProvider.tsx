import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { createTheme } from "@/theme";

const MUIProvider = ({ children }: { children: ReactNode }) => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIProvider;
