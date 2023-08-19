import { Review } from "@/types/review";

export enum AnimeSource {
  ORIGINAL = "original",
  MANGA = "manga",
  NOVEL = "novel",
}

export interface Crew {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Anime {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  animeParentId: string;
  averageScore: number;
  source: AnimeSource;
  tags: Tag[];
  crew: Crew;
  reviews: Review[];
}
