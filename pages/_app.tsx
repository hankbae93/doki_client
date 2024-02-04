import type { AppProps } from "next/app";
import RecoilProvider from "@/src/provider/RecoilProvider";
import ReactQueryProvider from "@/src/provider/ReactQueryProvider";
import AuthProvider from "@/src/provider/AuthProvider";
import combineProviders from "@/src/provider/combineProviders";
import { ToastContainer } from "react-toastify";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AppLayout from "@/src/layouts/AppLayout";
import { NextPage } from "next";
import { DehydratedState } from "@tanstack/query-core";
import { ReactElement, ReactNode, useMemo } from "react";
import MUIProvider from "@/src/provider/MUIProvider";
import { CacheProvider, EmotionCache } from "@emotion/react";
import "react-toastify/dist/ReactToastify.css";

import createCache from "@emotion/cache";

export const createEmotionCache = () => {
  return createCache({ key: "css" });
};

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

type NextPageWithLayout = NextPage<{
  dehydratedState: DehydratedState;
}> & {
  getLayout?: (page: ReactElement) => ReactNode;
  emotionCache: EmotionCache;
};

export type AppPropsWithLayout = AppProps<{
  dehydratedState: DehydratedState;
}> & {
  Component: NextPageWithLayout;
  emotionCache: EmotionCache;
};
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  const CombineProvider = useMemo(
    () =>
      combineProviders([
        [RecoilProvider],
        [ReactQueryProvider, { dehydratedState: pageProps.dehydratedState }],
        [AuthProvider],
        [MUIProvider],
      ]),
    [pageProps],
  );

  return (
    <CacheProvider value={emotionCache}>
      <CombineProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <ToastContainer />
      </CombineProvider>
    </CacheProvider>
  );
}

export default MyApp;
