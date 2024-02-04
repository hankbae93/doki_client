import React from "react";
import { Box, Grid } from "@mui/material";
import useScrapQuery from "@/src/hooks/queries/useScrapQuery";
import ScrapCard from "@/src/components/anime/ScrapCard";
import PageLayout from "@/src/layouts/PageLayout";

const ScrapPage = () => {
  const { data } = useScrapQuery();

  return (
    <PageLayout title="내 스크랩 목록">
      <Box sx={{ m: "auto", maxWidth: 1024 }}>
        <Grid container spacing={4}>
          {data?.map((scrap) => {
            return (
              <Grid item xs={4} key={scrap.id}>
                <ScrapCard scrapId={scrap.id} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default ScrapPage;
