import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/atoms/user";
import api from "fetch";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { fetchGetUserInfo } from "@/fetch/user/user.api";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    isAuthenticated,
    auth: { isAccessTokenUpdated },
    setAuth,
    user,
    setUser,
  } = useUserStore();

  const { data } = useQuery(
    [QueryKey.FETCH_GET_USER_INFO, isAuthenticated, isAccessTokenUpdated],
    fetchGetUserInfo,
    {
      enabled: isAuthenticated && isAccessTokenUpdated,
    },
  );

  useEffect(() => {
    api.defaults.headers.common.Authorization = isAuthenticated
      ? `Bearer ${user?.accessToken}`
      : null;
    setAuth((prev) => ({ ...prev, isAccessTokenUpdated: isAuthenticated }));
  }, [isAuthenticated]);

  useEffect(() => {
    if (data) {
      // @ts-ignore
      setUser((prev) => ({ ...data, accessToken: prev?.accessToken }));
    }
  }, [data]);

  return <>{children}</>;
};

export default AuthProvider;
