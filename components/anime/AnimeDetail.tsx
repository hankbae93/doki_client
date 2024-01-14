import {
  Box,
  Chip,
  Grid,
  LinearProgress,
  Rating,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { BookmarkAdd, BookmarkRemove } from "@mui/icons-material";

import React, { useEffect, useState } from "react";
import AnimeDetailReview from "@/components/anime/AnimeDetailReview";
import useAnimeQuery from "@/hooks/useAnimeQuery";
import { useUserStore } from "@/atoms/user";
import EditIcon from "@mui/icons-material/Edit";
import {
  fetchRemoveScrappedAnime,
  fetchScrapAnime,
} from "@/api/scrap/scrap.api";
import { useRouter } from "next/router";
import { servePath } from "@/utils/file";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const AnimeDetail = () => {
  const [isMyAnime, setIsMyAnime] = useState(false);
  const [isScrap, setIsScrap] = useState(false);
  const { user } = useUserStore();
  const { data, isLoading, animeId } = useAnimeQuery();
  const { push } = useRouter();

  const handleScrap = async () => {
    if (isMyAnime) {
      await fetchScrapAnime(animeId);
    } else {
      await fetchRemoveScrappedAnime(animeId);
    }

    setIsScrap((prev) => !prev);
  };

  useEffect(() => {
    if (user?.id && data?.anime.user.id) {
      setIsMyAnime(user?.id === data?.anime.user.id);
    }
  }, [user?.id, data?.anime.user.id]);

  useEffect(() => {
    setIsScrap(!!data?.scrap);
  }, [data?.scrap]);

  if (isLoading || !data) return <LinearProgress />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 10,
        flexDirection: "column",
      }}
    >
      <Grid
        xs={4}
        sx={{
          img: {
            width: "100%",
            height: "600px",
            objectFit: "cover",
          },
        }}
      >
        <Swiper
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {data.anime.files.map((img) => {
            return (
              <SwiperSlide key={img.id}>
                <img src={servePath(img.fileName)} alt={data.anime.title} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Grid>

      <Grid container spacing={10} direction="column">
        <Grid item xs={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
            }}
          >
            <Typography variant="h3">{data.anime.title}</Typography>

            <Box>
              {isMyAnime && (
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => push(`/anime/${animeId}/edit`)}
                >
                  <EditIcon />
                </IconButton>
              )}

              <IconButton aria-label="add to favorites" onClick={handleScrap}>
                {!!user && isScrap ? (
                  <BookmarkRemove sx={{ color: pink[500] }} />
                ) : (
                  <BookmarkAdd />
                )}
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, pb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              제작진: {data.anime.crew}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              원작: {data.anime.source}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, pb: 4 }}>
            <Rating name="read-only" value={data.anime.averageScore} readOnly />
            <Typography variant="body2" color="text.secondary">
              평점: {data.anime.averageScore}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-wrap", height: 200 }}
            >
              {data.anime.description}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            {data.anime.tags.map((tag) => {
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
