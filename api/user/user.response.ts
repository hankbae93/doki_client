import { User } from "@/types/user";
import { APIResponse } from "@/types/common";

export interface SignInResponse {
  accessToken: string;
  user: User;
}

export type FetchSignInResponse = APIResponse<SignInResponse>;
