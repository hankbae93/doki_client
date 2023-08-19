import api from "@/api/api";
import { APIResponse } from "@/types/common";
import { Review } from "@/types/review";

export interface PostCreateReviewDto {
  animeId: number;
  content: string;
  score: number;
}
export const postCreateReview = async ({
  animeId,
  ...body
}: PostCreateReviewDto) => {
  const { data } = await api.post<
    APIResponse<{ review: Review; averageScore: number }>
  >(`/review/anime/${animeId}`, body);

  return data.data;
};

export const getMyReview = async (animeId: number) => {
  const { data } = await api.get<APIResponse<Review | null>>(
    `/review/anime/my/${animeId}`,
  );
  return data.data;
};

export interface PostUpdateMyReviewDto {
  content: string;
  score: number;
  id: number;
}

export const postUpdateMyReview = async ({
  id,
  ...body
}: PostUpdateMyReviewDto) => {
  const { data } = await api.post<APIResponse<Review>>(`/review/${id}`, body);

  return data.data;
};
