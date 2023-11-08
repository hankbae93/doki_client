import { Review } from "@/types/review";

export enum AnimeSource {
  ORIGINAL = "original",
  MANGA = "manga",
  NOVEL = "novel",
}

export enum AnimeOrder {
  RECENT = "recent",
  TREND = "trend",
  OLD = "old",
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
  author: string;
  animeParentId: string;
  averageScore: number;
  source: AnimeSource;
  tags: Tag[];
  crew: Crew;
  reviews: Review[];
  images: { id: number; fileName: string }[];
}
