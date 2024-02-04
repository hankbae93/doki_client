import React from "react";
import { Box, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/src/constants/query-key";
import { fetchGetCrewList } from "@/src/api/anime/anime.api";
import CrewCard from "@/src/components/anime/CrewCard";

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
      </Grid>
    </Box>
  );
};

export default CrewList;
