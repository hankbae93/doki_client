import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Chip, Link } from "@mui/material";
import { AnimeSource } from "@/types/anime";
import React, { useState } from "react";
import { useUserStore } from "@/atoms/user";
import { blue, grey, pink } from "@mui/material/colors";
import {
  fetchRemoveScrappedAnime,
  fetchScrapAnime,
} from "@/api/scrap/scrap.api";
import { servePath } from "@/utils/file";
import { BookmarkAdd, BookmarkRemove } from "@mui/icons-material";

export interface AnimeCardProps {
  title: string;
  tags?: { id: number; name: string }[];
  description: string;
  source: AnimeSource;
  thumbnail?: string;
  href?: string;
  reviewCount?: number;
  isScrapped?: boolean;
  id: number;
  scrapId?: number;
  action?: boolean;
  refetch?: () => Promise<any>;
}

const AnimeCard = ({
  title,
  tags,
  description,
  thumbnail,
  href,
  source,
  reviewCount,
  action = true,
  isScrapped,
  id,
  scrapId,
  refetch,
}: AnimeCardProps) => {
  const { user } = useUserStore();
  const [isScrap, setIsScrap] = useState(isScrapped);
  const [isHover, setIsHover] = useState(false);
  const handleScrap = async () => {
    if (!user) return;
    if (isScrap && scrapId) {
      await fetchRemoveScrappedAnime(scrapId);
    } else {
      await fetchScrapAnime(id);
    }
    await refetch?.();

    setIsScrap((prev) => !prev);
  };

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
        <CardMedia
          component="img"
          height="194"
          image={servePath(thumbnail)}
          alt={title}
        />
      </Link>
      <CardHeader
        title={title}
        sx={{ bgcolor: blue[500], color: "white", padding: "8px 16px" }}
      />
      <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "no-wrap",
            gap: 1,
            minHeight: "32px",
            marginBottom: 1,
            overflowX: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none", // This is for Firefox
            msOverflowStyle: "none", // This is for Internet Explorer
          }}
        >
          {tags?.map((tag) => (
            <Chip key={tag.id} label={tag.name} variant="outlined" />
          ))}
          {tags?.length === 0 && (
            <Typography variant="overline" color="text.secondary">
              태그가 존재하지 않습니다.
            </Typography>
          )}
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          gutterBottom
          sx={{ mr: 1 }}
        >
          리뷰 개수: {reviewCount}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          원작: {source}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            textOverflow: "ellipsis",
            height: "calc(1.45em * 3)", // Adjust the multiplier to match the line-height of body2 variant
          }}
        >
          {description || "소개글이 없습니다."}
        </Typography>
      </CardContent>

      {action && (
        <CardActions
          disableSpacing
          sx={{ justifyContent: "center", padding: "8px" }}
        >
          <IconButton
            aria-label="add to favorites"
            onClick={handleScrap}
            sx={{ margin: "0 8px" }}
          >
            {!!user && isScrap ? (
              <BookmarkRemove sx={{ color: pink[500] }} />
            ) : (
              <BookmarkAdd />
            )}
          </IconButton>
          <IconButton aria-label="share" sx={{ margin: "0 8px" }}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default AnimeCard;
