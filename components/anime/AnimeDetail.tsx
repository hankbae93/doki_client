import {
  Box,
  Chip,
  Grid,
  LinearProgress,
  Rating,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";

import { useMutation } from "@tanstack/react-query";
import IconButton from "@mui/material/IconButton";
import { BookmarkAdd, BookmarkRemove } from "@mui/icons-material";
import { removeScrapAnime, scrapAnime } from "@/api/scrap";
import React, { useEffect, useState } from "react";
import AnimeDetailReview from "@/components/anime/AnimeDetailReview";
import useAnimeQuery from "@/hooks/useAnimeQuery";
import { useUserStore } from "@/atoms/user";

const AnimeDetail = () => {
  const { user } = useUserStore();
  const { anime, isLoading, animeId } = useAnimeQuery();
  const { mutateAsync: scrapAnimeById } = useMutation(scrapAnime);
  const [isMyAnime, setIsMyAnime] = useState(user?.id === anime?.user.id);

  useEffect(() => {
    if (user?.id && anime?.user?.id) {
      setIsMyAnime(user?.id === anime?.user.id);
    }
  }, [user?.id, anime?.user?.id]);

  const handleScrap = async () => {
    if (isMyAnime) {
      await scrapAnimeById(animeId);
    } else {
      await removeScrapAnime(animeId);
    }

    setIsMyAnime(!isMyAnime);
  };

  if (isLoading || !anime) return <LinearProgress />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 10,
        flexDirection: "column",
      }}
    >
      <Grid container spacing={10} direction="row">
        <Grid
          item
          xs={4}
          sx={{
            img: {
              width: "100%",
              height: "400px",
              objectFit: "contain",
            },
          }}
        >
          <img src={anime.thumbnail} alt={anime.title} />
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              pb: 2,
            }}
          >
            <Typography variant="h3">{anime.title}</Typography>

            <IconButton aria-label="add to favorites" onClick={handleScrap}>
              {isMyAnime ? (
                <BookmarkRemove sx={{ color: pink[500] }} />
              ) : (
                <BookmarkAdd />
              )}
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", gap: 2, pb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              제작진: {anime.crew.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              원작: {anime.source}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, pb: 4 }}>
            <Rating name="read-only" value={anime.averageScore} readOnly />
            <Typography variant="body2" color="text.secondary">
              평점: {anime.averageScore}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-wrap", height: 200 }}
            >
              {anime.description}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            {anime.tags.map((tag) => {
              return <Chip key={tag.id} label={tag.name} />;
            })}
          </Box>
        </Grid>
      </Grid>

      <AnimeDetailReview />
    </Box>
  );
};

export default AnimeDetail;