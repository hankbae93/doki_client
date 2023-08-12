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

function MyApp({ Component, pageProps }: AppProps) {
  const CombineProvider = combineProviders([
    [MUIProvider],
    [RecoilProvider],
    [ReactQueryProvider],
    [AuthProvider],
  ]);

  return (
    <CombineProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </CombineProvider>
  );
}

export default MyApp;
