import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useAnimeQuery from "@/hooks/useAnimeQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMyReview,
  postCreateReview,
  postUpdateMyReview,
} from "@/api/review";
import { QueryKey } from "@/constants/query-key";

const AnimeDetailReview = () => {
  const [content, setContent] = useState("");
  const [score, setScore] = useState(0);
  const [value, setValue] = React.useState(0);
  const { animeId, updateAnimeByReviewCreated } = useAnimeQuery();
  const { data: myReview } = useQuery(
    [QueryKey.FETCH_MY_REVIEW, animeId],
    () => getMyReview(animeId),
    {
      enabled: !!animeId,
      retry: 1,
    },
  );
  const { mutateAsync: mutateCreateReview } = useMutation(postCreateReview);
  const { mutateAsync: mutateUpdateReview } = useMutation(postUpdateMyReview);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(+newValue);
  };

  const createReview = async () => {
    const { review, averageScore } = await mutateCreateReview({
      animeId,
      score,
      content,
    });

    await updateAnimeByReviewCreated(review, averageScore);
    setValue(0);
  };

  const updateReview = async () => {
    if (!myReview) return;
    await mutateUpdateReview({
      content,
      score,
      id: myReview.id,
    });
  };

  const handleSubmit = async () => {
    if (myReview) {
      await updateReview();
    } else {
      await createReview();
    }
  };

  useEffect(() => {
    if (myReview?.score && myReview?.content) {
      setScore(myReview?.score);
      setContent(myReview?.content);
    }
  }, [myReview?.score, myReview?.content]);

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="리뷰 목록" />
        <Tab label={myReview ? "리뷰 수정" : "리뷰 작성"} />
      </Tabs>

      <div role="tabpanel" hidden={value !== 0} id={`simple-tabpanel-${0}`}>
        <List>
          {[
            { content: "안녕", id: 0 },
            { content: "안녕2", id: 1 },
          ].map((review, index) => (
            <Fragment key={review.id}>
              <ListItem>
                <ListItemText primary={review.content} />
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </div>

      <div role="tabpanel" hidden={value !== 1} id={`simple-tabpanel-${1}`}>
        <Card sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: "16px 14px",
              border: "1px solid #000",
              mb: 2,
            }}
          >
            <Typography variant="body2">평점</Typography>
            <Rating
              name="평점"
              value={score}
              precision={0.5}
              onChange={(event, newValue) => {
                setScore(newValue as number);
              }}
            />
          </Box>

          <TextField
            label="Leave a comment"
            variant="outlined"
            fullWidth
            multiline
            value={content}
            sx={{ mb: 2 }}
            onChange={(e) => setContent(e.target.value)}
          />
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              endIcon={<Send />}
              onClick={handleSubmit}
            >
              {myReview ? "수정" : "리뷰 등록"}
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default AnimeDetailReview;
