import React from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import AnimeCard from "@/components/anime/AnimeCard";
import { Box, Grid } from "@mui/material";
import { RoutePath } from "@/constants/route";
import { fetchGetAnimeList } from "@/api/anime/anime.api";
import { fetchScrapAnime } from "@/api/scrap/scrap.api";

const AnimeList = () => {
  const { data } = useQuery([QueryKey.FETCH_ANIME_LIST], fetchGetAnimeList);

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
                onScrap={() => fetchScrapAnime(anime.id)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AnimeList;
