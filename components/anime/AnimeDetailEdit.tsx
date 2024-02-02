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
import { fetchUpdateAnime } from "@/fetch/anime/anime.api";
import { toast } from "react-toastify";
import { RoutePath } from "@/constants/route";
import CreateAnimeTag from "@/components/create/CreateAnimeTag";
import api from "fetch";
import { servePath } from "@/utils/file";
import useAnimeQuery from "@/hooks/useAnimeQuery";
import AnimeFormImage from "@/components/anime/AnimeFormImage";

const AnimeDetailEdit = () => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [file, setFile] = useState<File[]>([]);
  const [source, setSource] = useState(AnimeSource.ORIGINAL);
  const { data, animeId } = useAnimeQuery();
  const { isMount } = useMount();
  const { push } = useRouter();

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.currentTarget;
    if (files === null) return;
    const receivedFile = files[0];

    setFile((prev) => prev.concat(receivedFile));
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSource(event.target.value as AnimeSource);
  };

  const handleFormData = (formData: FormData) => {
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    for (const item of file) {
      formData.append("file", item);
    }
    formData.append("source", source);

    const editedTag = formData.get("tags");
    const tags = editedTag
      ? JSON.parse(editedTag as string).map(
          (item: { value: string }) => item.value,
        )
      : [];
    if (editedTag) {
      formData.delete("tags");
    }
    for (const tag of tags) {
      formData.append("tags", tag);
    }

    for (const [key, value] of formData.entries()) {
      if (!value && key !== "tags") formData.delete(key);
    }

    return formData;
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = handleFormData(new FormData(e.currentTarget));

    try {
      await fetchUpdateAnime(animeId, formData);

      toast.success("애니메이션 변경이 완료되셨습니다.", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      await push(RoutePath.ANIME + `/${animeId}`);
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

  const deleteAnime = async () => {
    await toast.promise(() => api.delete(`/anime/${animeId}`), {
      pending: "Promise is pending",
      success: "Promise resolved 👌",
      error: "Promise rejected 🤯",
    });
    push(RoutePath.ANIME);
  };

  useEffect(() => {
    if (data?.anime.thumbnail) {
      setThumbnail(data?.anime.thumbnail);
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
            {thumbnail && (
              <AnimeFormImage
                src={servePath(thumbnail)}
                onClick={() => setThumbnail(null)}
              />
            )}

            {file &&
              [...file].map((item, index) => {
                return (
                  <AnimeFormImage
                    key={index}
                    src={URL.createObjectURL(item)}
                    onClick={() =>
                      setFile((prev) =>
                        prev.filter((_, fileIndex) => fileIndex !== index),
                      )
                    }
                  />
                );
              })}
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
            defaultValue={data.anime.crew}
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
            defaultValue={data.anime.description}
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

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            등록
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
            onClick={deleteAnime}
          >
            삭제
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnimeDetailEdit;
