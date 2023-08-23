import React, { FormEventHandler } from "react";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { RoutePath } from "@/constants/route";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { fetchSignUp } from "@/api/user/user.api";

const SignUp = () => {
  const { push } = useRouter();
  const { isLoading, mutateAsync } = useMutation(fetchSignUp);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const nickname = formData.get("nickname") as string;

    try {
      await mutateAsync({
        email,
        password,
        nickname,
      });
      alert("회원가입이 성공하셨습니다!");
      push(RoutePath.SIGN_IN);
    } catch (error: any) {
      console.error(error);
      if (error.name === "AxiosError") {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    }
  };

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
        Sign up
      </Typography>

      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="nickname"
              required
              fullWidth
              id="nickname"
              label="nickname"
              autoFocus
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
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
          Sign Up
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href={RoutePath.SIGN_IN} variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
