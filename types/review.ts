import { User } from "@/types/user";

export interface Review {
  id: number;
  content: string;
  img: string;
  score: number;
  user?: User;
}
