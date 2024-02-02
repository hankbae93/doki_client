import { User } from "@/types/user";

export interface FetchSignInDto {
  email: string;
  password: string;
}

export interface FetchSignUpDto {
  email: string;
  password: string;
  nickname: string;
}

export interface FetchUpdateProfileDto extends Partial<User> {}
