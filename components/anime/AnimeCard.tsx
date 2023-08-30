import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DefaultImg from "@/assets/default_img.png";
import { Box, Link } from "@mui/material";
import { BookmarkAdd } from "@mui/icons-material";
import { AnimeSource } from "@/types/anime";
import React from "react";

export interface AnimeCardProps {
  title: string;
  tag?: string;
  description: string;
  source: AnimeSource;
  thumbnail?: string;
  href?: string;
  onScrap?: () => void;
  reviewCount?: number;
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
}: AnimeCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
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
          <Typography variant="caption" color="text.secondary">
            리뷰 개수: {reviewCount}
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary">
          원작: {source}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {description || "소개글이 없습니다."}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ margin: "auto 0 0" }}>
        <IconButton aria-label="add to favorites" onClick={onScrap}>
          <BookmarkAdd />
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AnimeCard;
