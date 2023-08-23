export interface FetchCreateReviewDto {
  animeId: number;
  content: string;
  score: number;
}

export interface FetchUpdateMyReviewDto {
  content: string;
  score: number;
  id: number;
}
