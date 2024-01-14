import DefaultImg from "@/assets/default_img.png";
import process from "process";

export const servePath = (path?: string) =>
  (path?.includes("files/")
    ? `${process.env.NEXT_PUBLIC_API_URL}/${path}`
    : path) || DefaultImg.src;
