import React from "react";
import PageLayout from "@/layouts/PageLayout";
import { Box, Chip, Grid, Typography } from "@mui/material";
import AnimeCard from "@/components/anime/AnimeCard";
import { RoutePath } from "@/constants/route";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { fetchGetSeriesDetail } from "@/api/anime/anime.api";
import { servePath } from "@/utils/file";

const SeriesDetailPage = () => {
  const query = useRouter().query;
  const seriesId = query.seriesId as string;

  const { data } = useQuery(
    [QueryKey.FETCH_GET_SERIES],
    () => fetchGetSeriesDetail(+seriesId),
    {
      enabled: !!seriesId,
    },
  );

  return (
    <PageLayout title={data?.series.title ?? "Unknown"}>
      <Grid container spacing={1} direction="column">
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
          <img
            src={servePath(data?.series.thumbnail)}
            alt={data?.series.title}
          />
        </Grid>
        <Grid item>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {data?.series.description}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, pb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              제작진: {data?.series.crew}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              원작: {data?.series.source}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              평점: {data?.series.averageScore}
            </Typography>
          </Box>
          {data?.series.tags.map((tag) => {
            return <Chip key={tag.id} label={tag.name} />;
          })}
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ pt: 5 }}>
        {data?.animes.map((anime) => {
          return (
            <Grid item xs={4} key={anime.id}>
              <AnimeCard
                title={anime.title}
                description={anime.description}
                thumbnail={anime.thumbnail}
                href={`${RoutePath.ANIME}/${anime.id}`}
                source={anime.source}
                action={false}
                id={anime.id}
              />
            </Grid>
          );
        })}
      </Grid>
    </PageLayout>
  );
};

export default SeriesDetailPage;
