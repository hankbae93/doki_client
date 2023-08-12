import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useUserStore } from "@/atoms/user";
import { Button, Toolbar, Typography } from "@mui/material";
import { RoutePath } from "@/constants/route";
import useMount from "@/layouts/useMount";
import AnimeList from "@/components/AnimeList";

const Home: NextPage = () => {
  const { isMount } = useMount();
  const { push } = useRouter();
  const { isAuthenticated, logout } = useUserStore();

  if (!isMount) return <></>;

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button size="small">Subscribe</Button>

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
      11
      <AnimeList />
    </>
  );
};

export default Home;
