import { Avatar, Box, Card, Typography } from "@mui/material";
import { useUserStore } from "@/src/atoms/user";
import useMount from "@/src/hooks/useMount";
import CardContent from "@mui/material/CardContent";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { User, UserRank } from "@/src/types/user";
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
    </Card>
  );
};

export default AccountProfile;
