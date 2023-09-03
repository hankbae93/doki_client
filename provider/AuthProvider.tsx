import { ReactNode, useEffect, useState } from "react";
import { useUserStore } from "@/atoms/user";
import api from "@/api";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  const [isApiMount, setIsApiMount] = useState(false);

  useEffect(() => {
    setIsApiMount(true);
    api.defaults.headers.common.Authorization = isAuthenticated
      ? `Bearer ${user?.accessToken}`
      : null;
    setIsApiMount(false);
  }, [isAuthenticated]);

  if (isApiMount) return <></>;

  return <>{children}</>;
};

export default AuthProvider;
