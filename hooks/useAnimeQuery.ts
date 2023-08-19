import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { getAnime } from "@/api/anime";
import { Review } from "@/types/review";

const useAnimeQuery = () => {
  const { query } = useRouter();
  const animeId = +(query.animeId as string);
  const queryClient = useQueryClient();
  const queryKey = [QueryKey.FETCH_ANIME, animeId];

  const {
    data: anime,
    isLoading,
    refetch,
  } = useQuery(queryKey, () => getAnime(animeId), {
    enabled: !!animeId,
  });

  const updateAnimeByReviewCreated = async (
    review: Review,
    averageScore: number,
  ) => {
    if (!anime) return;

    await queryClient.setQueryData(queryKey, {
      ...anime,
      averageScore,
      reviews: anime.reviews.concat(review),
    });
  };

  return {
    anime,
    isLoading,
    animeId,
    refetch,
    queryKey,
    updateAnimeByReviewCreated,
  };
};

export default useAnimeQuery;
