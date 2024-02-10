import { servePath } from "@/src/utils/file";
import CardMedia from "@mui/material/CardMedia";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

interface MediaCardProps {
  type?: "cardMedia";
  src?: string;
  alt?: string;
}

const MediaCard = ({ type = "cardMedia", src, alt }: MediaCardProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageIsLoading, setImageIsLoading] = useState(true);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.onload = () => {
      console.log("로드 성공");
      setImageIsLoading(false);
      setImage(img);
    };
    img.onerror = () => {
      console.log("로드 실패, URL 변경");
      setImageIsLoading(true);
      img.src = servePath(src);
    };

    const [_, resizedUrl] = src.split("doki-storage/");
    img.src = `https://storage.googleapis.com/doki-storage/resized-${resizedUrl}`;
  }, [src]);

  if (type === "cardMedia") {
    return (
      <>
        {imageIsLoading ? (
          <Skeleton />
        ) : (
          <CardMedia
            component="img"
            height="194"
            image={image?.currentSrc}
            alt={alt}
          />
        )}
      </>
    );
  }

  return <Skeleton />;
};

export default MediaCard;
