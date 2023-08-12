import api from "@/api/api";
import { APIResponse } from "@/types/common";
import { Anime } from "@/types/anime";

export const fetchAnime = async (animeId: number) => {
  const { data } = await api.get<APIResponse<Anime>>(`/anime/${animeId}`);

  return data.data;
};

export const fetchAnimeList = async () => {
  const { data } = await api.get<
    APIResponse<{ animes: Anime[]; total: number }>
  >(`/anime`);

  return data.data;
};
