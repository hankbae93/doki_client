import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import AnimeCard from "@/components/anime/AnimeCard";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { RoutePath } from "@/constants/route";
import {
  fetchGetAnimeList,
  fetchGetAnimeListByUser,
} from "@/api/anime/anime.api";
import { fetchScrapAnime } from "@/api/scrap/scrap.api";
import { AnimeOrder, AnimeSource } from "@/types/anime";
import { useUserStore } from "@/atoms/user";

const AnimeList = () => {
  const { user } = useUserStore();
  const [filter, setFilter] = useState({
    source: "",
    order: "",
    title: "",
  });

  const { data } = useQuery(
    [
      QueryKey.FETCH_ANIME_LIST,
      filter.order,
      filter.source,
      filter.title,
      user?.id,
    ],
    () =>
      user?.id
        ? fetchGetAnimeListByUser({
            order: !filter.order ? undefined : (filter.order as AnimeOrder),
            source: !filter.source ? undefined : (filter.source as AnimeSource),
            title: !filter.title ? undefined : filter.title,
          })
        : fetchGetAnimeList({
            order: !filter.order ? undefined : (filter.order as AnimeOrder),
            source: !filter.source ? undefined : (filter.source as AnimeSource),
            title: !filter.title ? undefined : filter.title,
          }),
  );

  return (
    <Box>
      <Grid container spacing={2} sx={{ pt: 5 }}>
        <Grid item xs={2}>
          <Autocomplete
            onChange={(e, value) => {
              setFilter((prev) => ({ ...prev, source: value as AnimeSource }));
            }}
            sx={{ width: "100%", background: "#fff" }}
            options={[
              AnimeSource.ORIGINAL,
              AnimeSource.NOVEL,
              AnimeSource.MANGA,
            ]}
            autoHighlight
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="출처"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
                sx={{ background: "#fff" }}
              />
            )}
          />
        </Grid>

        <Grid item xs={2}>
          <Autocomplete
            sx={{ width: "100%" }}
            options={[
              { text: "최신순", name: AnimeOrder.RECENT },
              { text: "리뷰순", name: AnimeOrder.TREND },
              { text: "과거순", name: AnimeOrder.OLD },
            ]}
            onChange={(e, newValue) => {
              setFilter((prev) => ({
                ...prev,
                order: newValue ? newValue.name : "",
              }));
            }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.text}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="order"
                sx={{ background: "#fff" }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            id="title"
            label="애니메이션 제목"
            name="title"
            sx={{ background: "#fff" }}
            autoComplete="title"
            value={filter.title}
            onChange={(e) => {
              const value = e.currentTarget?.value ?? "";
              setFilter((prev) => ({ ...prev, title: value }));
            }}
          />
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
                onScrap={() => fetchScrapAnime(anime.id)}
                source={anime.source}
                reviewCount={anime.reviewCount}
                isScrapped={!!anime.isScrapped}
                id={anime.id}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AnimeList;
