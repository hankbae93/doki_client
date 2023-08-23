import api from "@/api";
import {
  FetchCreateAnimeResponse,
  FetchGetAnimeDetailResponse,
  FetchGetAnimeListResponse,
} from "@/api/anime/anime.response";
import { FetchCreateAnimeDto } from "@/api/anime/anime.dto";

export const fetchGetAnimeDetail = async (animeId: number) => {
  const { data } = await api.get<FetchGetAnimeDetailResponse>(
    `/anime/${animeId}`,
  );

  return data.data;
};

export const fetchGetAnimeList = async () => {
  const { data } = await api.get<FetchGetAnimeListResponse>(`/anime`);

  return data.data;
};

export const fetchCreateAnime = async (body: FetchCreateAnimeDto) => {
  const { data } = await api.post<FetchCreateAnimeResponse>("/anime", body);
  return data;
};
