import { atom, useRecoilState, useResetRecoilState } from "recoil";
import { User } from "@/types/user";

export interface UserAtom extends User {
  accessToken: string;
}

export const userAtom = atom<UserAtom | null>({
  key: "user",
  default: null,
});

export const useUserStore = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const reset = useResetRecoilState(userAtom);

  return {
    ...user,
    setUser,
    reset,
  };
};
