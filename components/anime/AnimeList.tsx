import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";
import AnimeCard from "@/components/anime/AnimeCard";
import {
  Autocomplete,
  Box,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { RoutePath } from "@/constants/route";
import {
  fetchGetAnimeList,
  fetchGetAnimeListByUser,
} from "@/fetch/anime/anime.api";
import { AnimeOrder, AnimeSource, Tag } from "@/types/anime";
import { useUserStore } from "@/atoms/user";
import api from "fetch";
import { APIResponse } from "@/types/common";

const AnimeList = () => {
  const {
    user,
    auth: { isAccessTokenUpdated },
  } = useUserStore();
  const [filter, setFilter] = useState({
    source: "",
    order: "",
    title: "",
    condition: false,
    tags: [""],
  });

  const { data, refetch } = useQuery(
    [
      QueryKey.FETCH_ANIME_LIST,
      filter.order,
      filter.source,
      filter.title,
      filter.condition,
      filter.tags[0],
      user?.id,
    ],
    () =>
      user?.id
        ? fetchGetAnimeListByUser({
            order: !filter.order ? undefined : (filter.order as AnimeOrder),
            source: !filter.source ? undefined : (filter.source as AnimeSource),
            title: !filter.title ? undefined : filter.title,
            tag: !filter.tags[0] ? undefined : filter.tags[0],
            condition: filter.condition,
          })
        : fetchGetAnimeList({
            order: !filter.order ? undefined : (filter.order as AnimeOrder),
            source: !filter.source ? undefined : (filter.source as AnimeSource),
            title: !filter.title ? undefined : filter.title,
            tag: !filter.tags[0] ? undefined : filter.tags[0],
            condition: filter.condition,
          }),
  );

  const { data: tags } = useQuery(["FETCH_TAG"], async () => {
    const { data } = await api.get<APIResponse<Tag[]>>("/tag");
    return data.data;
  });

  return (
    <Box>
      <Grid container spacing={2} sx={{ pt: 5 }}>
        <Grid item xs={16}>
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
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={2}>
          <Autocomplete
            sx={{ width: "100%" }}
            options={
              tags?.map((tag) => ({ text: tag.name, name: tag.name })) ?? []
            }
            onChange={(e, newValue) => {
              setFilter((prev) => ({
                ...prev,
                tags: [newValue?.name ?? ""],
              }));
            }}
            autoHighlight
            getOptionLabel={(option) => option.text}
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
                label="tag"
                sx={{ background: "#fff" }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              background: "#fff",
              borderRadius: "8px",
              borderStyle: "solid",
              borderWidth: "1px",
              overflow: "hidden",
              borderColor: "#E5E7EB",
            }}
          >
            <Typography variant="caption">OR</Typography>
            <Switch
              sx={{
                "& .MuiSwitch-thumb": {
                  border: "1px solid #ccc",
                },
              }}
              value={filter.condition}
              onChange={(e, value) => {
                setFilter((prev) => ({ ...prev, condition: value }));
              }}
            />
            <Typography variant="caption">AND</Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ pt: 5 }}>
        {data?.animes.map((anime) => {
          return (
            <Grid item xs={4} key={anime.id}>
              <AnimeCard
                id={anime.id}
                title={anime.title}
                isScrapped={!!anime.isScrapped}
                description={anime.description}
                thumbnail={anime.thumbnail}
                href={`${RoutePath.ANIME}/${anime.id}`}
                scrapId={anime.scrapId}
                refetch={() => refetch()}
                // onScrap={() => fetchScrapAnime(anime.id)}
                source={anime.source}
                tags={anime.tags}
                reviewCount={anime.reviewCount}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AnimeList;
