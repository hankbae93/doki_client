import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CombineProvider from "@/app/provider/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "❤️‍🔥ドキドキ 漫画部!!! ❤️‍🔥",
  description: "도키도키망가부",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CombineProvider>
          <CssBaseline />
          {children}
          <ToastContainer />
        </CombineProvider>
      </body>
    </html>
  );
}
