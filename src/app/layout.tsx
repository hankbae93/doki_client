import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/app/provider/theme";
import EmotionProvider from "@/app/provider/EmotionProvider";
import ReactQueryProvider from "@/app/provider/ReactQueryProvider";
import RecoilProvider from "@/app/provider/RecoilProvider";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "❤️‍🔥ドキドキ 漫画部!!! ❤️‍🔥",
  description: "도키도키망가부",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <EmotionProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RecoilProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </RecoilProvider>
          </ThemeProvider>
        </body>
      </html>
    </EmotionProvider>
  );
}
