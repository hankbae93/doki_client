import api from "fetch";
import {
  FetchSignInDto,
  FetchSignUpDto,
  FetchUpdateProfileDto,
} from "@/fetch/user/user.dto";
import {
  FetchSignInResponse,
  FetchUpdateProfileResponse,
} from "@/fetch/user/user.response";
import { FetchSuccessResponse } from "@/fetch/common/common.response";

export const fetchSignIn = async (body: FetchSignInDto) => {
  const { data } = await api.post<FetchSignInResponse>("/auth/signin", body);

  return data;
};

export const fetchSignUp = async (body: FetchSignUpDto) => {
  const { data } = await api.post<FetchSuccessResponse>("/auth/signup", body);
  return data;
};

export const fetchUpdateProfile = async (body: FetchUpdateProfileDto) => {
  const { data } = await api.post<FetchUpdateProfileResponse>(
    "/user/profile",
    body,
  );
  return data.data;
};

export const fetchGetUserInfo = async () => {
  const { data } = await api.get<FetchSignInResponse>("/user/info");
  return data.data;
};
