import { APIResponse } from "@/types/common";
import { Anime } from "@/types/anime";
import { User } from "@/types/user";
import { Review } from "@/types/review";
import { Scrap } from "@/types/scrap";

interface AnimeWithUser extends Anime {
  user: User;
}

interface GetAnimeDetailResponse {
  anime: AnimeWithUser;
  reviews: Review[];
  scrap: Scrap;
}

export type FetchGetAnimeDetailResponse = APIResponse<GetAnimeDetailResponse>;

interface AnimeWithReviewCount extends Anime {
  reviewCount: number;
}

interface GetAnimeListResponse {
  animes: AnimeWithReviewCount[];
  total: number;
}

export type FetchGetAnimeListResponse = APIResponse<GetAnimeListResponse>;

interface CreateAnimeResponse {
  anime: Anime;
}

export type FetchCreateAnimeResponse = APIResponse<CreateAnimeResponse>;
