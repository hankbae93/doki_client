import { atom, useRecoilState, useResetRecoilState } from "recoil";
import { User } from "@/types/user";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface UserAtom extends User {
  accessToken: string;
}

export const userAtom = atom<UserAtom | null>({
  key: "recoil-user",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useUserStore = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const reset = useResetRecoilState(userAtom);

  const logout = () => {
    reset();
  };

  const isAuthenticated = !!user;

  return {
    ...user,
    user,
    isAuthenticated,
    setUser,
    logout,
  };
};
