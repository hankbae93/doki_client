import { ReactNode, useEffect, useState } from "react";
import { useUserStore } from "@/atoms/user";
import api from "@/api";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { fetchGetUserInfo } from "@/api/user/user.api";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user, setUser } = useUserStore();
  const [isApiMount, setIsApiMount] = useState(false);

  const { data } = useQuery(
    [QueryKey.FETCH_GET_USER_INFO, isAuthenticated, isApiMount],
    fetchGetUserInfo,
    {
      enabled: isAuthenticated && !isApiMount,
    },
  );

  useEffect(() => {
    setIsApiMount(true);
    api.defaults.headers.common.Authorization = isAuthenticated
      ? `Bearer ${user?.accessToken}`
      : null;
    setIsApiMount(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (data) {
      // @ts-ignore
      setUser((prev) => ({ ...data, accessToken: prev?.accessToken }));
    }
  }, [data]);

  if (isApiMount) return <></>;

  return <>{children}</>;
};

export default AuthProvider;
