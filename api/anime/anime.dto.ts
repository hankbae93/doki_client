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

export interface FetchUpdateAnimeDto {
  title: string;
  thumbnail: string;
  description: string;
  animeId: number;
  source: AnimeSource;
  crew: string;
  tag?: string;
  author?: string;
}
