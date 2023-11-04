import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import { fetchGetCrewDetail } from "@/api/anime/anime.api";
import { useRouter } from "next/router";
import PageLayout from "@/layouts/PageLayout";
import { Grid } from "@mui/material";
import AnimeCard from "@/components/anime/AnimeCard";
import { RoutePath } from "@/constants/route";
import { fetchScrapAnime } from "@/api/scrap/scrap.api";
import React from "react";

const CrewDetailPage = () => {
  const query = useRouter().query;
  const crewId = query.crewId as string;
  const { data } = useQuery([QueryKey], () => fetchGetCrewDetail(+crewId), {
    enabled: !!crewId,
  });

  return (
    <PageLayout title={data?.crew.name ?? "Unknown"}>
      <Grid container spacing={4} sx={{ pt: 5 }}>
        {data?.crew.animes.map((anime) => {
          return (
            <Grid item xs={4} key={anime.id}>
              <AnimeCard
                title={anime.title}
                description={anime.description}
                thumbnail={anime.thumbnail}
                href={`${RoutePath.ANIME}/${anime.id}`}
                onScrap={() => fetchScrapAnime(anime.id)}
                source={anime.source}
                action={false}
                // reviewCount={anime.reviewCount}
                // isScrapped={!!anime.isScrapped}
                id={anime.id}
              />
            </Grid>
          );
        })}
      </Grid>
    </PageLayout>
  );
};

export default CrewDetailPage;
