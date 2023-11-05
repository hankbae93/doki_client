import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { AnimeSource } from "@/types/anime";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import useMount from "@/hooks/useMount";

import { toast } from "react-toastify";

import CreateAnimeTag from "@/components/create/CreateAnimeTag";
import { useRouter } from "next/router";
import { RoutePath } from "@/constants/route";
import { uploadImage } from "@/api/common/common.api";
import { FetchCreateAnimeDto } from "@/api/anime/anime.dto";
import {
  fetchCreateAnime,
  fetchGetCrewList,
  fetchGetSeriesList,
} from "@/api/anime/anime.api";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";

const CreateAnimeForm = () => {
  const { push } = useRouter();
  const { isMount } = useMount();
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState(AnimeSource.ORIGINAL);
  const { data: crewData } = useQuery(
    [QueryKey.FETCH_GET_CREW_LIST],
    fetchGetCrewList,
  );
  const { data: seriesData } = useQuery(
    [QueryKey.FETCH_GET_SERIES_LIST],
    fetchGetSeriesList,
  );
  const [crew, setCrew] = useState<string>("");
  const [series, setSeries] = useState<string>("");

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.currentTarget;
    if (files === null) return;
    const file = files[0];

    setFile(file);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSource(event.target.value as AnimeSource);
  };

  const handleChangeOnCrew = (keyword: string | null) => {
    if (!keyword) return;

    setCrew(keyword as string);
  };

  const handleChangeOnSeries = (series: string | null) => {
    if (!series) return;

    setSeries(series as string);
  };

  const isLoading = false;

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData(e.currentTarget);
    const data = Array.from(formData.entries()).reduce((acc, [k, v]) => {
      if (k === "tags") {
        // @ts-ignore
        acc[k] = JSON.parse(v as string).map((item: any) => item.value);
      } else {
        // @ts-ignore
        acc[k] = v;
      }

      return acc;
    }, {});

    try {
      const thumbnail = await uploadImage(file);
      const body = Object.assign(
        { thumbnail, source },
        data,
      ) as FetchCreateAnimeDto;

      await fetchCreateAnime(body);

      toast.success("애니메이션 등록이 완료되셨습니다.", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      push(RoutePath.HOME);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="upload-image">
              <Button variant="contained" component="span">
                썸네일 업로드
              </Button>
              <input
                id="upload-image"
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileUpload}
              />
            </label>
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded Image"
                height="300"
              />
            )}
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="title"
            label="애니메이션 제목"
            name="title"
            autoComplete="title"
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            sx={{ width: "100%", background: "#fff" }}
            value={crew}
            onChange={(event, value, reason, details) =>
              handleChangeOnCrew(value)
            }
            freeSolo
            options={crewData?.crews.map((crew) => crew.name) ?? []}
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
                autoComplete="제작진"
                required
                name="crew"
                fullWidth
                id="crew"
                label="제작진"
                autoFocus
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            sx={{ width: "100%", background: "#fff" }}
            value={series}
            onChange={(event, value, reason, details) =>
              handleChangeOnSeries(value)
            }
            freeSolo
            options={seriesData?.animes.map((anime) => anime.title) ?? []}
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
                autoComplete="시리즈"
                name="series"
                fullWidth
                id="series"
                label="series"
                autoFocus
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="description"
            label="소개글"
            type="description"
            id="description"
            autoComplete="소개글"
          />
        </Grid>

        <Grid item xs={12}>
          <CreateAnimeTag />
          {/*<TextField*/}
          {/*  fullWidth*/}
          {/*  name="tag"*/}
          {/*  label="장르, 태그"*/}
          {/*  type="tag"*/}
          {/*  id="tag"*/}
          {/*  autoComplete="장르, 태그"*/}
          {/*/>*/}
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ textTransform: "uppercase" }}
            >
              원작
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="source"
              value={source}
              label="원작"
              onChange={handleChange}
              sx={{ textTransform: "uppercase" }}
            >
              <MenuItem
                value={AnimeSource.MANGA}
                sx={{ textTransform: "uppercase" }}
              >
                {AnimeSource.MANGA}
              </MenuItem>
              <MenuItem
                value={AnimeSource.ORIGINAL}
                sx={{ textTransform: "uppercase" }}
              >
                {AnimeSource.ORIGINAL}
              </MenuItem>
              <MenuItem
                value={AnimeSource.NOVEL}
                sx={{ textTransform: "uppercase" }}
              >
                {AnimeSource.NOVEL}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            autoComplete="given-name"
            name="author"
            fullWidth
            id="author"
            label="원작자"
            autoFocus
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        등록
      </Button>
    </Box>
  );
};

export default CreateAnimeForm;
