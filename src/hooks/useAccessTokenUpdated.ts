import { useEffect, useRef } from "react";
import { AxiosInstance } from "axios";
import api from "@/src/api";

const useAccessTokenUpdated = () => {
  const ref = useRef<AxiosInstance>();

  useEffect(() => {
    ref.current = api;
  }, []);

  return {
    accessTokenUpdated: !!ref.current?.defaults.headers.common["Authorization"],
  };
};

export default useAccessTokenUpdated;
