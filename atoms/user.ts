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

export interface AuthAtom {
  isAccessTokenUpdated: boolean;
}

export const authAtom = atom<AuthAtom>({
  key: "recoil-auth",
  default: {
    isAccessTokenUpdated: false,
  },
});

export const useUserStore = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
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
    auth,
    setAuth,
  };
};
