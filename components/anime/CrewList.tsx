import React from "react";
import { Box, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { fetchGetCrewList } from "@/api/anime/anime.api";
import CrewCard from "@/components/anime/CrewCard";

const CrewList = () => {
  const { data } = useQuery([QueryKey.FETCH_GET_CREW_LIST], fetchGetCrewList);

  return (
    <Box>
      <Grid container spacing={4} sx={{ pt: 5 }}>
        {data?.crews.map((crew) => {
          return (
            <Grid item xs={4} key={crew.id}>
              <CrewCard
                id={crew.id}
                name={crew.name}
                thumbnail={crew.thumbnail}
              />
            </Grid>
          );
        })}
        {/*{data?.animes.map((anime) => {*/}
        {/*    return (*/}
        {/*        <Grid item xs={4} key={anime.id}>*/}
        {/*            <AnimeCard*/}
        {/*                title={anime.title}*/}
        {/*                description={anime.description}*/}
        {/*                thumbnail={anime.thumbnail}*/}
        {/*                href={`${RoutePath.ANIME}/${anime.id}`}*/}
        {/*                onScrap={() => fetchScrapAnime(anime.id)}*/}
        {/*                source={anime.source}*/}
        {/*                reviewCount={anime.reviewCount}*/}
        {/*                isScrapped={!!anime.isScrapped}*/}
        {/*                id={anime.id}*/}
        {/*            />*/}
        {/*        </Grid>*/}
        {/*    );*/}
        {/*})}*/}
      </Grid>
    </Box>
  );
};

export default CrewList;
