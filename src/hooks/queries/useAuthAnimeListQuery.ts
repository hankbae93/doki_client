import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/src/constants/query-key";
import { fetchGetAnimeListByUser } from "@/src/api/anime/anime.api";
import { AnimeOrder, AnimeSource } from "@/src/types/anime";
import { useUserStore } from "@/src/atoms/user";
import useAccessTokenUpdated from "@/src/hooks/useAccessTokenUpdated";

interface UseAuthAnimeListQueryProps {
  filter: {
    source: string;
    order: string;
    title: string;
    condition: boolean;
    tags: string[];
  };
  page: number;
}

const useAuthAnimeListQuery = ({
  filter,
  page,
}: UseAuthAnimeListQueryProps) => {
  const { user } = useUserStore();
  const { accessTokenUpdated } = useAccessTokenUpdated();

  return useQuery(
    [
      QueryKey.FETCH_AUTH_ANIME_LIST,
      filter.order,
      filter.source,
      filter.title,
      filter.condition,
      filter.tags[0],
      user?.id,
      page,
    ],
    () =>
      fetchGetAnimeListByUser({
        order: !filter.order ? undefined : (filter.order as AnimeOrder),
        source: !filter.source ? undefined : (filter.source as AnimeSource),
        title: !filter.title ? undefined : filter.title,
        tag: !filter.tags[0] ? undefined : filter.tags[0],
        condition: filter.condition,
        page,
      }),
    {
      enabled: !!user?.id && accessTokenUpdated,
    },
  );
};

export default useAuthAnimeListQuery;
