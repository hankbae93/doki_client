import React from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { fetchGetSeriesList } from "@/api/anime/anime.api";
import { Box, Grid } from "@mui/material";
import { RoutePath } from "@/constants/route";
import SeriesCard from "@/components/anime/SeriesCard";

const SeriesList = () => {
  const { data } = useQuery(
    [QueryKey.FETCH_GET_SERIES_LIST],
    fetchGetSeriesList,
  );

  return (
    <Box>
      <Grid container spacing={4} sx={{ pt: 5 }}>
        {data?.animes.map((anime) => {
          return (
            <Grid item xs={4} key={anime.id}>
              <SeriesCard
                title={anime.title}
                description={anime.description}
                source={anime.source}
                href={RoutePath.SERIES + `/${anime.id}`}
                id={anime.id}
                thumbnail={anime.thumbnail}
                action={false}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SeriesList;
