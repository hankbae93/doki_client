import api from "@/api";
import { FetchSignInDto, FetchSignUpDto } from "@/api/user/user.dto";
import { FetchSignInResponse } from "@/api/user/user.response";
import { FetchSuccessResponse } from "@/api/common/common.response";

export const fetchSignIn = async (body: FetchSignInDto) => {
  const { data } = await api.post<FetchSignInResponse>("/user/signin", body);

  return data;
};

export const fetchSignUp = async (body: FetchSignUpDto) => {
  const { data } = await api.post<FetchSuccessResponse>("/user/signup", body);
  return data;
};
