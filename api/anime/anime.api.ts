import api from "@/api";
import {
  FetchCreateAnimeResponse,
  FetchGetAnimeDetailResponse,
  FetchGetAnimeListResponse,
} from "@/api/anime/anime.response";
import {
  FetchCreateAnimeDto,
  FetchGetAnimeListDto,
  FetchUpdateAnimeDto,
} from "@/api/anime/anime.dto";

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
      limit: 10,
    },
  });

  return data.data;
};

export const fetchCreateAnime = async (body: FetchCreateAnimeDto) => {
  const { data } = await api.post<FetchCreateAnimeResponse>("/anime", body);
  return data;
};

export const fetchUpdateAnime = async ({
  animeId,
  ...body
}: FetchUpdateAnimeDto) => {
  const { data } = await api.post<FetchCreateAnimeResponse>(
    `/anime/${animeId}`,
    body,
  );

  return data;
};
