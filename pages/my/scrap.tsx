import React from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { getMyScrapList } from "@/api/scrap";
import AnimeCard from "@/components/anime/AnimeCard";
import { RoutePath } from "@/constants/route";
import { Box, Grid } from "@mui/material";

const ScrapPage = () => {
  const { data } = useQuery([QueryKey.FETCH_MY_SCRAPS], getMyScrapList);

  return (
    <Box sx={{ m: "auto", maxWidth: 1024 }}>
      <Grid container spacing={4}>
        {data?.map(({ anime }) => {
          return (
            <Grid item xs={4} key={anime.id}>
              <AnimeCard
                title={anime.title}
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

export default ScrapPage;
