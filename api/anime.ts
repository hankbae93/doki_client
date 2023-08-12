import api from "@/api/api";
import { APIResponse } from "@/types/common";
import { Anime, AnimeSource } from "@/types/anime";

export const getAnime = async (animeId: number) => {
  const { data } = await api.get<APIResponse<Anime>>(`/anime/${animeId}`);

  return data.data;
};

export const getAnimeList = async () => {
  const { data } = await api.get<
    APIResponse<{ animes: Anime[]; total: number }>
  >(`/anime`);

  return data.data;
};

export interface PostCreateAnimeDto {
  title: string;
  thumbnail: string;
  description: string;
  tag: string;
  source: AnimeSource;
  author?: string;
}

export const postCreateAnime = async (body: PostCreateAnimeDto) => {
  return await api.post("/anime", body);
};
