import React, { ReactNode } from "react";
import { Box, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import NextLink from "next/link";
import { Word } from "@/src/constants/word";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flex: "1 1 auto",
        height: "100vh",
      }}
    >
      <Grid container sx={{ flex: "1 1 auto" }}>
        <Grid
          xs={12}
          lg={6}
          sx={{
            objectFit: "cover",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: "fixed",
              top: 0,
              width: "100%",
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            >
              LOGO
            </Box>
          </Box>
          {children}
        </Grid>

        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: "center",
            background: `url("/assets/auth-layout-background.jpg") no-repeat center`,
            backgroundSize: "100%",
            objectFit: "cover",
            color: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              p: 3,
              background: "rgba(0,0,0,0.7)",
              borderRadius: 4,
              height: 150,
              display: "flex",
              justifyContent: "center",
              gap: 3,
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: "24px",
                lineHeight: "32px",
                mb: 1,
              }}
              variant="h1"
            >
              Welcome to
              <Box component="a" sx={{ color: "#15B79E" }} target="_blank">
                {Word.TITLE}
              </Box>
            </Typography>
            <Typography align="center" variant="subtitle1">
              추천을 하고싶은 작품이 있다면 갤러리에 글을 올려주세요!
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthLayout;
