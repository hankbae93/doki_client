export interface User {
  id: number;
  email: string;
  nickname: string;
  description: string;
  profile?: string;
  rank: UserRankType;
  createdAt: string;
}

export enum UserRank {
  d = "이세계 난민",
  c = "이세계 모험가 ",
  b = "이세계 NPC ",
  a = "전생자 ",
  s = "TEN DUCK ",
}

export type UserRankType = "d" | "c" | "b" | "a" | "s";
