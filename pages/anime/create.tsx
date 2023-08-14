import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import CreateAnimeForm from "@/components/create/CreateAnimeForm";

const AnimeCreatePage: NextPage = () => {
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

      <CreateAnimeForm />
    </Box>
  );
};

export default AnimeCreatePage;
