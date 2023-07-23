"use client";

import { RecoilRoot, useRecoilSnapshot } from "recoil";
import { ReactNode, useEffect } from "react";

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

const RecoilProvider = ({ children }: { children: ReactNode }) => {
  return (
    <RecoilRoot>
      {process.env.NODE_ENV === "development" && <RecoilDebugObserver />}
      {children}
    </RecoilRoot>
  );
};

export default RecoilProvider;
