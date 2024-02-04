import { Anime } from "@/src/types/anime";
import { User } from "@/src/types/user";

export interface Scrap {
  id: number;
  anime: Anime;
  user: User;
}
