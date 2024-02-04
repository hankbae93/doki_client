import { APIResponse } from "@/src/types/common";
import { Scrap } from "@/src/types/scrap";

export type FetchScrapAnimeResponse = APIResponse<Scrap>;

export type FetchGetMyScrapListResponse = APIResponse<Scrap[]>;
