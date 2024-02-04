import { NextPage } from "next";
import { Grid } from "@mui/material";
import React, { ChangeEventHandler, useState } from "react";
import AccountProfileDetail from "@/src/components/my/AccountProfileDetail";
import AccountProfile from "@/src/components/my/AccountProfile";
import PageLayout from "@/src/layouts/PageLayout";

const ProfilePage: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.currentTarget;
    if (files === null) return;
    const file = files[0];

    setFile(file);
  };

  return (
    <PageLayout title="Account">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <AccountProfile file={file} setFile={handleFileUpload} />
        </Grid>

        <Grid item xs={6}>
          <AccountProfileDetail file={file} />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default ProfilePage;
