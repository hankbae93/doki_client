import api from "@/api/api";
import { APIResponse } from "@/types/common";
import { User } from "@/types/user";

export interface SignInDto {
  email: string;
  password: string;
}

export const signIn = (body: SignInDto) => {
  return api.post<APIResponse<{ accessToken: string; user: User }>>(
    "/user/signin",
    body,
  );
};

export interface SignUpDto {
  email: string;
  password: string;
  nickname: string;
}

export const signUp = (body: SignUpDto) => {
  return api.post<APIResponse<null>>("/user/signup", body);
};
