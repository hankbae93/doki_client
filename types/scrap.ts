import { Anime } from "@/types/anime";
import { User } from "@/types/user";

export interface Scrap {
  id: number;
  anime: Anime;
  user: User;
}
