import React from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { fetchAnimeList } from "@/api/anime";
import AnimeCard from "@/components/AnimeCard";
import { Box, Grid } from "@mui/material";
import { RoutePath } from "@/constants/route";

const AnimeList = () => {
  const { data } = useQuery([QueryKey.FETCH_ANIME_LIST], fetchAnimeList);

  return (
    <Box sx={{ m: "auto", maxWidth: 1024 }}>
      <Grid container spacing={4}>
        {data?.animes.map((anime) => {
          return (
            <Grid item xs={4} key={anime.id}>
              <AnimeCard
                title={anime.title}
                tag={anime.tag}
                description={anime.description}
                thumbnail={anime.thumbnail}
                href={`${RoutePath.ANIME}/${anime.id}`}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AnimeList;
