import { NextPage } from "next";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React, { ChangeEventHandler, useState } from "react";
import AccountProfileDetail from "@/components/my/AccountProfileDetail";
import AccountProfile from "@/components/my/AccountProfile";

const ProfilePage: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.currentTarget;
    if (files === null) return;
    const file = files[0];

    setFile(file);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Account</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <AccountProfile file={file} setFile={handleFileUpload} />
                </Grid>

                <Grid xs={12} md={6} lg={8}>
                  <AccountProfileDetail file={file} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ProfilePage;
