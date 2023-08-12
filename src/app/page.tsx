"use client";

import { Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { RoutePath } from "@/constants/route";

export default function Home() {
  const { push } = useRouter();

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
          "aaaa"
        </Typography>

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
      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      />
    </>
  );
}
