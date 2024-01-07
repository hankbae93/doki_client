import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { useUserStore } from "@/atoms/user";
import useMount from "@/hooks/useMount";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { User, UserRank } from "@/types/user";
import dayjs from "dayjs";

const AccountProfile = ({
  file,
  setFile,
}: {
  file: File | null;
  setFile: ChangeEventHandler<HTMLInputElement>;
}) => {
  const { user } = useUserStore();
  const isMount = useMount();
  const [userState, setUserState] = useState<User>({
    createdAt: "",
    description: "",
    email: "",
    id: 0,
    profile: "",
    nickname: "",
    rank: "d",
  });

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFile(event);
  };

  useEffect(() => {
    // @ts-ignore
    setUserState(user);
  }, [user]);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={file ? URL.createObjectURL(file) : userState?.profile}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            {userState?.nickname}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {UserRank[userState?.rank ?? "d"]}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {dayjs(userState?.createdAt).format("YYYY.MM.DD")}
          </Typography>
        </Box>
      </CardContent>

      {/*<Divider />*/}
      <CardActions>
        <Button fullWidth variant="text">
          <label htmlFor="upload-image">
            썸네일 업로드
            <input
              id="upload-image"
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileUpload}
            />
          </label>
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
