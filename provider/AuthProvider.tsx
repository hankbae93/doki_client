

import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/atoms/user";
import api from "@/api/api";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  useEffect(() => {
    api.defaults.headers.common.Authorization = isAuthenticated
      ? `Bearer ${user?.accessToken}`
      : null;
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider;
