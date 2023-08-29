import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import useMount from "@/hooks/useMount";
import { AnimeSource } from "@/types/anime";
import {
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
import { uploadImage } from "@/api/common/common.api";
import { FetchUpdateAnimeDto } from "@/api/anime/anime.dto";
import { fetchGetAnimeDetail, fetchUpdateAnime } from "@/api/anime/anime.api";
import { toast } from "react-toastify";
import { RoutePath } from "@/constants/route";
import CreateAnimeTag from "@/components/create/CreateAnimeTag";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constants/query-key";

const AnimeDetailEdit = () => {
  const { push, query } = useRouter();
  const animeId = query.animeId as string;
  const { isMount } = useMount();
  const [file, setFile] = useState<File | string | null>(null);
  const [source, setSource] = useState(AnimeSource.ORIGINAL);
  const { data } = useQuery(
    [QueryKey.FETCH_ANIME, animeId],
    () => fetchGetAnimeDetail(+animeId),
    {
      enabled: !!animeId,
    },
  );

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.currentTarget;
    if (files === null) return;
    const file = files[0];

    setFile(file);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSource(event.target.value as AnimeSource);
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
      let thumbnail = file;
      if (typeof file !== "string") {
        thumbnail = await uploadImage(file);
      }
      const body = Object.assign(
        { thumbnail, source, animeId: +animeId },
        data,
      ) as FetchUpdateAnimeDto;

      await fetchUpdateAnime(body);

      toast.success("애니메이션 변경이 완료되셨습니다.", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      push(RoutePath.ANIME + `/${animeId}`);
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

  useEffect(() => {
    if (data?.anime.thumbnail) {
      setFile(data?.anime.thumbnail);
    }
  }, [data?.anime.thumbnail]);

  if (!isMount || !data) return <></>;

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 3, px: 3, py: 5 }}
      onSubmit={onSubmit}
    >
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
                src={
                  typeof file === "string" ? file : URL.createObjectURL(file)
                }
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
            defaultValue={data.anime.title}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            autoComplete="제작진"
            required
            name="crew"
            fullWidth
            id="crew"
            label="제작진"
            autoFocus
            defaultValue={data.anime.crew.name}
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
            defaultValue={data.anime.title}
          />
        </Grid>

        <Grid item xs={12}>
          <CreateAnimeTag
            defaultValue={data.anime.tags.map((tag) => tag.name)}
          />
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
              defaultValue={data.anime.source}
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
            defaultValue={data?.anime.author}
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

export default AnimeDetailEdit;
