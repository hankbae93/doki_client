import React from "react";
import { Button, Toolbar, Typography } from "@mui/material";
import { RoutePath } from "@/constants/route";
import { useRouter } from "next/router";
import { useUserStore } from "@/atoms/user";
import useMount from "@/hooks/useMount";

const Header = () => {
  const { isMount } = useMount();
  const { push } = useRouter();
  const { isAuthenticated, logout } = useUserStore();

  if (!isMount) return <></>;
  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button size="small" onClick={() => push(RoutePath.ANIME_CREATE)}>
          애니메이션 등록하기
        </Button>

        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          ️‍🔥ドキドキ 漫画部!!! ❤️‍🔥
        </Typography>

        {isAuthenticated ? (
          <Button variant="outlined" size="small" onClick={logout}>
            logout
          </Button>
        ) : (
          <>
            <Button
              variant="outlined"
              size="small"
              onClick={() => push(RoutePath.SIGN_IN)}
            >
              Sign In
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() => push(RoutePath.SIGN_UP)}
            >
              Sign up
            </Button>
          </>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      />
    </>
  );
};

export default Header;
