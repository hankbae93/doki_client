import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import DefaultImg from "@/assets/default_img.png";
import { Box, Link } from "@mui/material";
import { BookmarkAdd, BookmarkRemove } from "@mui/icons-material";
import { AnimeSource } from "@/types/anime";
import React, { useState } from "react";
import { useUserStore } from "@/atoms/user";
import { pink } from "@mui/material/colors";
import {
  fetchRemoveScrappedAnime,
  fetchScrapAnime,
} from "@/api/scrap/scrap.api";

export interface AnimeCardProps {
  title: string;
  tag?: string;
  description: string;
  source: AnimeSource;
  thumbnail?: string;
  href?: string;
  onScrap?: () => void;
  reviewCount?: number;
  isScrapped?: boolean;
  id: number;
  action?: boolean;
}

const AnimeCard = ({
  title,
  tag,
  description,
  thumbnail,
  href,
  source,
  onScrap,
  reviewCount,
  action = true,
  isScrapped,
  id,
}: AnimeCardProps) => {
  const { user } = useUserStore();
  const [isScrap, setIsScrap] = useState(isScrapped);
  const handleScrap = async () => {
    if (!user) return;
    if (isScrap) {
      await fetchRemoveScrappedAnime(id);
    } else {
      await fetchScrapAnime(id);
    }

    setIsScrap((prev) => !prev);
  };

  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardHeader
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={title}
        subheader={tag}
      />
      <Link href={href}>
        <a>
          <CardMedia
            component="img"
            height="194"
            image={thumbnail || DefaultImg.src}
            alt={title}
          />
        </a>
      </Link>

      <CardContent>
        <Box>
          {!!reviewCount && (
            <Typography variant="caption" color="text.secondary">
              리뷰 개수: {reviewCount}
            </Typography>
          )}
        </Box>

        <Typography variant="caption" color="text.secondary">
          원작: {source}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {description || "소개글이 없습니다."}
        </Typography>
      </CardContent>

      {action && (
        <CardActions disableSpacing sx={{ margin: "auto 0 0" }}>
          <IconButton aria-label="add to favorites" onClick={handleScrap}>
            {!!user && isScrap ? (
              <BookmarkRemove sx={{ color: pink[500] }} />
            ) : (
              <BookmarkAdd />
            )}
          </IconButton>

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default AnimeCard;
