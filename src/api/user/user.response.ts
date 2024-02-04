import { User } from "@/src/types/user";
import { APIResponse } from "@/src/types/common";

export interface SignInResponse {
  accessToken: string;
  user: User;
}

export type FetchSignInResponse = APIResponse<SignInResponse>;
export type FetchUpdateProfileResponse = APIResponse<User>;
