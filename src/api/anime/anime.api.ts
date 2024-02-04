import api from "@/src/api";
import {
  FetchCreateAnimeResponse,
  FetchGetAnimeDetailResponse,
  FetchGetAnimeListResponse,
  FetchGetCrewDetailResponse,
  FetchGetCrewListResponse,
  GetSeriesDetailResponse,
  GetSeriesListResponse,
} from "@/src/api/anime/anime.response";
import { FetchGetAnimeListDto } from "@/src/api/anime/anime.dto";
import { APIResponse } from "@/src/types/common";
import { Crew } from "@/src/types/anime";

export const fetchGetAnimeDetail = async (animeId: number) => {
  const { data } = await api.get<FetchGetAnimeDetailResponse>(
    `/anime/${animeId}`,
  );

  return data.data;
};

export const fetchGetAnimeList = async (params: FetchGetAnimeListDto) => {
  const { data } = await api.get<FetchGetAnimeListResponse>(`/anime`, {
    params: {
      ...params,
      page: params.page || 1,
      limit: 12,
    },
  });

  return data.data;
};

export const fetchGetAnimeListByUser = async (params: FetchGetAnimeListDto) => {
  const { data } = await api.get<FetchGetAnimeListResponse>(`/anime/auth`, {
    params: {
      ...params,
      page: params.page || 1,
      limit: 12,
    },
  });

  return data.data;
};

export const fetchCreateAnime = async (body: FormData) => {
  const { data } = await api.post<FetchCreateAnimeResponse>("/anime", body);
  return data;
};

export const fetchUpdateAnime = async (animeId: number, body: FormData) => {
  const { data } = await api.post<FetchCreateAnimeResponse>(
    `/anime/${animeId}`,
    body,
  );

  return data;
};

export const fetchGetCrewList = async () => {
  const { data } = await api.get<FetchGetCrewListResponse>(`/crew`);

  return data.data;
};

export const fetchGetSeriesList = async () => {
  const { data } = await api.get<GetSeriesListResponse>("/anime/series");

  return data.data;
};

export const fetchGetCrewDetail = async (crewId: number) => {
  const { data } = await api.get<FetchGetCrewDetailResponse>(`/crew/${crewId}`);

  return data.data;
};

export const fetchGetCrewListByKeyword = async (keyword: string) => {
  const { data } = await api.get<APIResponse<Crew[]>>("/crew/search", {
    params: {
      keyword,
    },
  });

  return data.data;
};

export const fetchGetSeriesDetail = async (seriesId: number) => {
  const { data } = await api.get<GetSeriesDetailResponse>(
    `/anime/series/${seriesId}`,
  );

  return data.data;
};
