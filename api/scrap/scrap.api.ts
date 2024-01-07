import api from "@/api";
import { FetchSuccessResponse } from "@/api/common/common.response";
import {
  FetchGetMyScrapListResponse,
  FetchScrapAnimeResponse,
} from "@/api/scrap/scrap.response";

export const fetchScrapAnime = async (animeId: number) => {
  const { data } = await api.post<FetchScrapAnimeResponse>(`/scrap/${animeId}`);

  return data.data;
};

export const fetchGetMyScrapList = async () => {
  const { data } = await api.get<FetchGetMyScrapListResponse>("/scrap");

  return data.data;
};

export const fetchRemoveScrappedAnime = async (scrapId: number) => {
  const { data } = await api.post<FetchSuccessResponse>(
    `/scrap/remove/${scrapId}`,
  );

  return data;
};
