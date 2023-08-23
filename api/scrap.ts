import api from "@/api/api";
import { APIResponse } from "@/types/common";
import { Scrap } from "@/types/scrap";

export const scrapAnime = async (animeId: number) => {
  const { data } = await api.post<APIResponse<Scrap>>(`/scrap/${animeId}`);

  return data.data;
};

export const getMyScraps = async () => {
  const { data } = await api.get<APIResponse<Scrap[]>>("/scrap");

  return data.data;
};

export const removeScrapAnime = async (animeId: number) => {
  const { data } = await api.post<APIResponse<null>>(
    `/scrap/remove/${animeId}`,
  );

  return data;
};
