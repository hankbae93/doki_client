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
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import { DehydratedState } from "@tanstack/query-core";
import { ReactElement, ReactNode, useMemo } from "react";
import MUIProvider from "@/provider/MUIProvider";
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
    [pageProps.dehydratedState],
  );

  const getLayout =
    Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>);

  return (
    <CacheProvider value={emotionCache}>
      <CombineProvider>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer />
      </CombineProvider>
    </CacheProvider>
  );
}

export default MyApp;
