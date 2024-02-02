import api from "fetch";

import {
  FetchCreateReviewDto,
  FetchUpdateMyReviewDto,
} from "@/fetch/review/review.dto";
import {
  FetchCreateReviewResponse,
  FetchGetMyReviewResponse,
  FetchGetReviewListByAnimeResponse,
  FetchUpdateMyReviewResponse,
} from "@/fetch/review/review.response";

export const fetchGetMyReview = async (animeId: number) => {
  const { data } = await api.get<FetchGetMyReviewResponse>(
    `/review/anime/my/${animeId}`,
  );
  return data.data;
};

export const fetchGetReviewListByAnime = async (animeId: number) => {
  const { data } = await api.get<FetchGetReviewListByAnimeResponse>(
    `/anime/${animeId}`,
  );

  return data.data;
};

export const fetchCreateReview = async ({
  animeId,
  ...body
}: FetchCreateReviewDto) => {
  const { data } = await api.post<FetchCreateReviewResponse>(
    `/review/anime/${animeId}`,
    body,
  );

  return data.data;
};

export const fetchUpdateMyReview = async ({
  id,
  ...body
}: FetchUpdateMyReviewDto) => {
  const { data } = await api.post<FetchUpdateMyReviewResponse>(
    `/review/${id}`,
    body,
  );

  return data.data;
};
