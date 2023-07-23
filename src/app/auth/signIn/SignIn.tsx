"use client";

import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import NextLink from "next/link";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth";
import { RoutePath } from "@/constants/route";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/atoms/user";

const SignIn = () => {
  const { setUser } = useUserStore();
  const [signInState, setSignInState] = useState({
    email: "",
    password: "",
  });
  const { isLoading, mutateAsync } = useMutation(signIn);
  const { push } = useRouter();

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;

    setSignInState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      const {
        data: {
          data: { accessToken, user },
        },
      } = await mutateAsync(signInState);

      setUser({ accessToken, ...user });

      toast(`${user.nickname}님! 도키도키 망가부에 오신 걸 환영합니다.`, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setSignInState({ email: "", password: "" });

      push("/");
    } catch (error) {
      console.error(error);

      toast.error(`이메일 또는 비밀번호가 맞지 않습니다.`, {
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
    <Box
      sx={{
        backgroundColor: "background.paper",
        flex: "1 1 auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          px: 3,
          py: "100px",
          width: "100%",
        }}
      >
        <div>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Login</Typography>
            <Typography color="text.secondary" variant="body2">
              Don&apos;t have an account? &nbsp;
              <Link
                component={NextLink}
                href={RoutePath.SIGN_UP}
                underline="hover"
                variant="subtitle2"
              >
                Register
              </Link>
            </Typography>
          </Stack>

          <form noValidate onSubmit={onSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                required
                value={signInState.email}
                onChange={onChangeInput}
                helperText="이메일 형식에 맞춰주세요 ex)abc@gmail.com"
              />
              <TextField
                fullWidth
                required
                label="Password"
                name="password"
                type="password"
                value={signInState.password}
                onChange={onChangeInput}
              />
            </Stack>

            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              Continue
            </Button>
          </form>
        </div>
      </Box>
    </Box>
  );
};

export default SignIn;
