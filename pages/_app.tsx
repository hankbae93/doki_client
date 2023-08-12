import type { AppProps } from "next/app";
import RecoilProvider from "@/provider/RecoilProvider";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import AuthProvider from "@/provider/AuthProvider";
import combineProviders from "@/provider/combineProviders";
import { ToastContainer } from "react-toastify";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MUIProvider from "@/provider/MUIProvider";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import { DehydratedState } from "@tanstack/query-core";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage<{ dehydratedState: DehydratedState }> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{
  dehydratedState: DehydratedState;
}> & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const CombineProvider = combineProviders([
    [MUIProvider],
    [RecoilProvider],
    [ReactQueryProvider, { dehydratedState: pageProps.dehydratedState }],
    [AuthProvider],
  ]);

  return (
    <CombineProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>

      <ToastContainer />
    </CombineProvider>
  );
}

export default MyApp;
