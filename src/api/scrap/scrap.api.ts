import api from "@/src/api";
import { FetchSuccessResponse } from "@/src/api/common/common.response";
import {
  FetchGetMyScrapListResponse,
  FetchScrapAnimeResponse,
} from "@/src/api/scrap/scrap.response";

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
