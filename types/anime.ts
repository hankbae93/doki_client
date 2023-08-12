export enum AnimeSource {
  ORIGINAL = "original",
  MANGA = "manga",
  NOVEL = "novel",
}

export interface Anime {
  id: number;
  title: string;
  tag: string;
  thumbnail: string;
  animeParentId: string;
  averageScore: number;
  resource: AnimeSource;
}
