import { NextPage } from "next";
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
  Typography,
} from "@mui/material";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { AnimeSource } from "@/types/anime";
import useMount from "@/hooks/useMount";
import { uploadImage } from "@/api/common";

const AnimeCreatePage: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState(AnimeSource.ORIGINAL);
  const { isMount } = useMount();

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
    console.log(formData);
    const body = {};
    const data = Array.from(formData.entries()).reduce((acc, [k, v]) => {
      // @ts-ignore
      acc[k] = v;
      return acc;
    }, {});

    const response = await uploadImage(file);
    console.log(response);

    console.log(data);
  };

  if (!isMount) return <></>;

  return (
    <Box
      sx={{
        marginTop: 8,
        px: 3,
        py: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        애니메이션 등록 폼
      </Typography>

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
            <TextField
              autoComplete="given-name"
              name="author"
              fullWidth
              id="author"
              label="원작자"
              autoFocus
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
            <TextField
              required
              fullWidth
              name="tag"
              label="장르, 태그"
              type="tag"
              id="tag"
              autoComplete="장르, 태그"
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
    </Box>
  );
};

export default AnimeCreatePage;
