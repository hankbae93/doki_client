import { APIResponse } from "@/types/common";
import { Review } from "@/types/review";

export type FetchUpdateMyReviewResponse = APIResponse<Review>;

export type FetchGetMyReviewResponse = APIResponse<Review | null>;

export type FetchGetReviewListByAnimeResponse = APIResponse<Review[]>;

export interface CreateReviewResponse {
  review: Review;
  averageScore: number;
}

export type FetchCreateReviewResponse = APIResponse<CreateReviewResponse>;
