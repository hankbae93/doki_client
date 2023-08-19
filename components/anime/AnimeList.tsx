import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { getAnimeList } from "@/api/anime";
import AnimeCard from "@/components/anime/AnimeCard";
import { Box, Grid } from "@mui/material";
import { RoutePath } from "@/constants/route";
import { scrapAnime } from "@/api/scrap";

const AnimeList = () => {
  const { data } = useQuery([QueryKey.FETCH_ANIME_LIST], getAnimeList);
  const { mutateAsync: scrapAnimeById } = useMutation(scrapAnime);

  return (
    <Box sx={{ m: "auto", maxWidth: 1024 }}>
      <Grid container spacing={4}>
        {data?.animes.map((anime) => {
          return (
            <Grid item xs={4} key={anime.id}>
              <AnimeCard
                title={anime.title}
                description={anime.description}
                thumbnail={anime.thumbnail}
                href={`${RoutePath.ANIME}/${anime.id}`}
                onScrap={() => scrapAnimeById(anime.id)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AnimeList;
