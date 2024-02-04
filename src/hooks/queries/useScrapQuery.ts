import useAccessTokenUpdated from "@/src/hooks/useAccessTokenUpdated";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/src/constants/query-key";
import { fetchGetMyScrapList } from "@/src/api/scrap/scrap.api";
import { useUserStore } from "@/src/atoms/user";

const useScrapQuery = () => {
  const { user } = useUserStore();
  const { accessTokenUpdated } = useAccessTokenUpdated();

  return useQuery([QueryKey.FETCH_MY_SCRAPS], fetchGetMyScrapList, {
    enabled: !!user?.id && accessTokenUpdated,
  });
};

export default useScrapQuery;
