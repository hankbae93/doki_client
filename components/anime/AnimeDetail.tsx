import { useRouter } from "next/router";
import {
  Box,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { getAnime } from "@/api/anime";
import IconButton from "@mui/material/IconButton";
import { BookmarkAdd } from "@mui/icons-material";
import { scrapAnime } from "@/api/scrap";
import React, { Fragment } from "react";
import AnimeReviewForm from "@/components/anime/AnimeReviewForm";

const AnimeDetail = () => {
  const { query } = useRouter();
  const animeId = +(query.animeId as string);
  const { data: anime, isLoading } = useQuery(
    [QueryKey.FETCH_ANIME, animeId],
    () => getAnime(animeId),
    { enabled: !!animeId },
  );
  const { mutateAsync: scrapAnimeById } = useMutation(scrapAnime);

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
            <Typography variant="h1">{anime.title}</Typography>

            <IconButton
              aria-label="add to favorites"
              onClick={() => scrapAnimeById(animeId)}
            >
              <BookmarkAdd />
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

      <AnimeReviewForm />

      <List>
        {[
          { content: "안녕", id: 0 },
          { content: "안녕2", id: 1 },
        ].map((review, index) => (
          <Fragment key={review.id}>
            <ListItem>
              <ListItemText primary={review.content} />
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </Box>
  );
};

export default AnimeDetail;
