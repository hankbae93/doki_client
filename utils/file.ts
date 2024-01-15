import DefaultImg from "@/assets/default_img.png";

export const servePath = (path?: string) =>
  `https://storage.googleapis.com/resize-${path}` || DefaultImg.src;
