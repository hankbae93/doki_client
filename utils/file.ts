import DefaultImg from "@/assets/default_img.png";

export const servePath = (path?: string) =>
  (path?.includes("files/") ? `http://localhost:8000/${path}` : path) ||
  DefaultImg.src;
