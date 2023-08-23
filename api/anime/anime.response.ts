import { APIResponse } from "@/types/common";
import { Anime } from "@/types/anime";
import { User } from "@/types/user";
import { Review } from "@/types/review";

interface GetAnimeDetailResponse {
  anime: Anime;
  user: User;
  reviews: Review[];
}

export type FetchGetAnimeDetailResponse = APIResponse<GetAnimeDetailResponse>;

interface GetAnimeListResponse {
  animes: Anime[];
  total: number;
}

export type FetchGetAnimeListResponse = APIResponse<GetAnimeListResponse>;

interface CreateAnimeResponse {
  anime: Anime;
}

export type FetchCreateAnimeResponse = APIResponse<CreateAnimeResponse>;
