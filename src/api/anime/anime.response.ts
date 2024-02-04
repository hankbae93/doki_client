import { APIResponse } from "@/src/types/common";
import { Anime, AnimeSource } from "@/src/types/anime";
import { User } from "@/src/types/user";
import { Review } from "@/src/types/review";
import { Scrap } from "@/src/types/scrap";

interface AnimeWithUser extends Anime {
  user: User;
}

interface GetAnimeDetailResponse {
  anime: AnimeWithUser;
  reviews: Review[];
  scrap: Scrap;
}

export type FetchGetAnimeDetailResponse = APIResponse<GetAnimeDetailResponse>;

interface AnimeListItem extends Anime {
  reviewCount: number;
  isScrapped: number;
  video: string;
  scrapId?: number;
}

interface GetAnimeListResponse {
  animes: AnimeListItem[];
  total: number;
}

export type FetchGetAnimeListResponse = APIResponse<GetAnimeListResponse>;

interface CreateAnimeResponse {
  anime: Anime;
}

export type FetchCreateAnimeResponse = APIResponse<CreateAnimeResponse>;

export type GetSeriesListResponse = APIResponse<{
  animes: Anime[];
}>;

export interface CrewListData {
  id: number;
  name: string;
  thumbnail?: string;
}
interface GetCrewListResponse {
  crews: CrewListData[];
}

export type FetchGetCrewListResponse = APIResponse<GetCrewListResponse>;

interface GetCrewDetailResponse {
  crew: {
    id: number;
    name: string;
    animes: {
      id: number;
      title: string;
      description: string;
      thumbnail: string;
      author: string;
      animeParentId: string;
      averageScore: number;
      source: AnimeSource;
    }[];
  };
}

export type FetchGetCrewDetailResponse = APIResponse<GetCrewDetailResponse>;

export type GetSeriesDetailResponse = APIResponse<{
  animes: Anime[];
  series: Anime;
}>;
