import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Chip, Link } from "@mui/material";
import { BookmarkAdd, BookmarkRemove } from "@mui/icons-material";
import { AnimeSource } from "@/types/anime";
import React, { useState } from "react";
import { useUserStore } from "@/atoms/user";
import { pink } from "@mui/material/colors";
import {
  fetchRemoveScrappedAnime,
  fetchScrapAnime,
} from "@/api/scrap/scrap.api";
import { servePath } from "@/utils/file";

export interface AnimeCardProps {
  title: string;
  tags?: { id: number; name: string }[];
  description: string;
  source: AnimeSource;
  thumbnail?: string;
  href?: string;
  onScrap?: () => void;
  reviewCount?: number;
  isScrapped?: boolean;
  video?: string;
  id: number;
  action?: boolean;
}

const AnimeCard = ({
  title,
  tags,
  description,
  thumbnail,
  href,
  source,
  onScrap,
  reviewCount,
  action = true,
  isScrapped,
  video,
  id,
}: AnimeCardProps) => {
  const { user } = useUserStore();
  const [isScrap, setIsScrap] = useState(isScrapped);
  const [isHover, setIsHover] = useState(false);
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
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.25, 1.25)",
          transformOrigin: "50% 50%",
          boxShadow: "1px 1px 3px rgba(0,0,0,0.5)",
        },
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href={href}>
        <a>
          <CardMedia
            component={isHover ? "video" : "img"}
            height="194"
            src={servePath(isHover ? video : thumbnail)}
            alt={title}
            {...(isHover ? { autoPlay: true, muted: true } : {})}
          />
        </a>
      </Link>

      <CardHeader
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={title}
      />

      <CardContent>
        {tags?.map((tag) => <Chip key={tag.id} label={tag.name}></Chip>)}
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
