import React from "react";
import { Button, Link, Toolbar, Typography } from "@mui/material";
import { RoutePath } from "@/constants/route";
import { useRouter } from "next/router";
import { useUserStore } from "@/atoms/user";
import useMount from "@/hooks/useMount";

const Header = () => {
  const { isMount } = useMount();
  const { push } = useRouter();
  const { isAuthenticated, logout } = useUserStore();

  const links = [
    {
      title: "내 스크랩",
      url: RoutePath.MY_SCRAP,
    },
    {
      title: "EXPLORE",
      url: RoutePath.ANIME,
    },
    {
      title: "내 정보",
      url: RoutePath.MY_PROFILE,
    },
    {
      title: "SERIES",
      url: RoutePath.SERIES,
    },
  ];

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
          <Link
            href={RoutePath.HOME}
            style={{ textDecoration: "unset", color: "unset" }}
          >
            <a>️‍🔥ドキドキ 漫画部!!! ❤️‍🔥</a>
          </Link>
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
        sx={{
          gap: 1,
          overflowX: "auto",
        }}
      >
        {links.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </>
  );
};

export default Header;
