import DefaultImg from "@/assets/default_img.png";

export const servePath = (path?: string) =>
  `https://storage.googleapis.com/${path}` || DefaultImg.src;
