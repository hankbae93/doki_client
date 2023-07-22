"use client";

import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { fetchAnime } from "@/api/anime";
import { useParams } from "next/navigation";

const AnimeDetailPage = () => {
  const { animeId } = useParams();
  const { data, isLoading } = useQuery(
    [QueryKey.FETCH_ANIME, animeId],
    () => fetchAnime(+animeId),
    {
      enabled: !!animeId,
      retry: 2,
    },
  );

  if (!data) return <p>Loading...</p>;

  return <div>{data.id}</div>;
};

export default AnimeDetailPage;
