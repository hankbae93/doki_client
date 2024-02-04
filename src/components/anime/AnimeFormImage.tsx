import React from "react";
import IconButton from "@mui/material/IconButton";
import { Cancel } from "@mui/icons-material";
import { Box } from "@mui/material";

interface AnimeFormImageProps {
  src: string;
  onClick?: () => void;
}

const AnimeFormImage = ({ src, onClick }: AnimeFormImageProps) => {
  return (
    <Box position="relative">
      <img src={src} alt="Uploaded Image" height="300" />
      <IconButton
        size="small"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          // background: "rgba(255, 255, 255, 0.7)", // 반투명 흰색 배경
          margin: "4px", // 버튼과 이미지 경계 사이의 여백
        }}
        onClick={onClick}
      >
        <Cancel fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default AnimeFormImage;
