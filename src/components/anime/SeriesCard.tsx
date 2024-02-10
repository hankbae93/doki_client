import React, { useState } from "react";
import Card from "@mui/material/Card";
import { blue, grey } from "@mui/material/colors";
import { Link } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { AnimeSource } from "@/src/types/anime";
import MediaCard from "@/src/components/common/MediaCard";

export interface SeriesCardProps {
  title: string;
  tags?: { id: number; name: string }[];
  description: string;
  source: AnimeSource;
  thumbnail?: string;
  href?: string;
  reviewCount?: number;
  isScrapped?: boolean;
  id: number;
  action?: boolean;
}
const SeriesCard = ({
  title,
  tags,
  description,
  thumbnail,
  href,
  source,
  reviewCount,
  action = true,
}: SeriesCardProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 1,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 3,
          transform: "scale(1.1)",
        },
        backgroundColor: grey[100],
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href={href}>
        <MediaCard src={thumbnail} alt={title} />
      </Link>
      <CardHeader
        title={title}
        sx={{ bgcolor: blue[500], color: "white", padding: "8px 16px" }}
      />
    </Card>
  );
};

export default SeriesCard;
