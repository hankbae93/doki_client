import { AnimeSource } from "@/types/anime";

export interface FetchCreateAnimeDto {
  title: string;
  thumbnail: string;
  description: string;
  source: AnimeSource;
  crew: string;
  tag?: string;
  author?: string;
}
