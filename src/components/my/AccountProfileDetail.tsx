import { FormEventHandler, useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useUserStore } from "@/src/atoms/user";
import { uploadImage } from "@/src/api/common/common.api";
import { toast } from "react-toastify";
import { fetchUpdateProfile } from "@/src/api/user/user.api";

const AccountProfileDetail = ({ file }: { file: File | null }) => {
  const { user, setUser } = useUserStore();

  const [values, setValues] = useState({
    nickname: "",
    description: "",
    email: "",
  });

  const handleChange = useCallback((event: any) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      let thumbnail = undefined;
      if (!file || !user?.profile) {
        thumbnail = await uploadImage(file as File);
      }

      const body = {
        ...user,
        ...values,
        profile: thumbnail,
      };

      const newUser = await fetchUpdateProfile(body);
      // @ts-ignore
      setUser((prev) => ({ ...prev, ...newUser }));

      toast.success("애니메이션 등록이 완료되셨습니다.", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    // @ts-ignore
    setValues(user);
  }, [user]);

  return (
    <form autoComplete="off" noValidate onSubmit={onSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              sx={{
                gap: "8px",
                div: {
                  width: "100%",
                },
              }}
            >
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="nickname"
                  name="nickname"
                  onChange={handleChange}
                  required
                  value={values?.nickname}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="description"
                  name="description"
                  onChange={handleChange}
                  required
                  value={values?.description}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Email Address"
                  name="email"
                  value={values?.email}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />

        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default AccountProfileDetail;
