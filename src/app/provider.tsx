"use client";

import { Fragment, ReactNode, useEffect, useRef } from "react";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const RecoilDebugObserver = () => {
  const snapshot = useRecoilSnapshot() as any;
  useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return <></>;
};

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        },
      },
    });
  }

  return (
    <Fragment>
      <RecoilRoot>
        <QueryClientProvider client={queryClientRef.current}>
          {process.env.NODE_ENV === "development" && <RecoilDebugObserver />}

          <ReactQueryDevtools />

          {children}
        </QueryClientProvider>
      </RecoilRoot>
    </Fragment>
  );
};

export default Provider;
