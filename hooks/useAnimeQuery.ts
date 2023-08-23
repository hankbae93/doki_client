import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { Review } from "@/types/review";
import { fetchGetAnimeDetail } from "@/api/anime/anime.api";

const useAnimeQuery = () => {
  const { query } = useRouter();
  const animeId = +(query.animeId as string);
  const queryClient = useQueryClient();
  const queryKey = [QueryKey.FETCH_ANIME, animeId];

  const { data, isLoading, refetch } = useQuery(
    queryKey,
    () => fetchGetAnimeDetail(animeId),
    {
      enabled: !!animeId,
    },
  );

  const updateAnimeByReviewCreated = async (
    review: Review,
    averageScore: number,
  ) => {
    if (!data) return;

    await queryClient.setQueryData(queryKey, {
      ...data,
      averageScore,
      reviews: data.reviews.concat(review),
    });
  };

  return {
    data,
    isLoading,
    animeId,
    refetch,
    queryKey,
    updateAnimeByReviewCreated,
  };
};

export default useAnimeQuery;
